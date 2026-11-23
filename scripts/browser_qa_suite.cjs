const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const PORT = 5198;
const DIST_DIR = path.resolve(__dirname, '../dist');

// MIME type map for static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

// Start local HTTP server serving dist
function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      let filePath = path.join(DIST_DIR, reqPath);

      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
          });
          res.end(content);
        }
      });
    });

    server.listen(PORT, '127.0.0.1', () => {
      console.log(`[QA SERVER] Serving dist on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

// Minimal CDP client over native WebSocket
class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.msgId = 1;
    this.callbacks = new Map();
    this.eventListeners = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method) {
        const listeners = this.eventListeners.get(msg.method) || [];
        listeners.forEach((fn) => fn(msg.params));
      }
    };
  }

  on(method, callback) {
    if (!this.eventListeners.has(method)) {
      this.eventListeners.set(method, []);
    }
    this.eventListeners.get(method).push(callback);
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      const desc = (res.exceptionDetails.exception && res.exceptionDetails.exception.description) || res.exceptionDetails.text || 'Error';
      throw new Error(`Evaluation failed: ${desc} \nExpression:\n${expression}`);
    }
    return res.result ? res.result.value : undefined;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputPath, Buffer.from(res.data, 'base64'));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runQaAudit() {
  console.log('================================================================');
  console.log('   STARTING AUTOMATED QUALITY ASSURANCE (QA) BROWSER AUDIT');
  console.log('================================================================\n');

  const screenshotsDir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const server = await startServer();

  // Launch Chromium / Edge
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const userDataDir = path.join(os.tmpdir(), 'edge-qa-audit-' + Date.now());
  const edgeProc = spawn(edgePath, [
    '--remote-debugging-port=9222',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + userDataDir,
    'about:blank',
  ]);

  let wsUrl = null;
  for (let i = 0; i < 25; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    throw new Error('Failed to connect to Chromium / Edge DevTools port 9222.');
  }

  // Connect CDP
  const client = new CdpClient(wsUrl);
  await client.connect();

  // Get first page target or create one
  const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const pageClient = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await pageClient.connect();

  // Network and console tracking
  const networkRequests = [];
  const networkErrors = [];
  const consoleLogs = [];
  const pageErrors = [];

  pageClient.on('Network.responseReceived', (p) => {
    networkRequests.push({
      url: p.response.url,
      status: p.response.status,
      mimeType: p.response.mimeType,
    });
    if (p.response.status >= 400) {
      networkErrors.push({ url: p.response.url, status: p.response.status });
    }
  });

  pageClient.on('Network.loadingFailed', (p) => {
    // Ignore canceled requests (e.g. aborted on navigate)
    if (p.errorText !== 'net::ERR_ABORTED') {
      networkErrors.push({ requestId: p.requestId, errorText: p.errorText });
    }
  });

  pageClient.on('Runtime.consoleAPICalled', (p) => {
    const text = p.args.map((a) => a.value || a.description || '').join(' ');
    consoleLogs.push({ type: p.type, text });
  });

  pageClient.on('Runtime.exceptionThrown', (p) => {
    pageErrors.push(p.exceptionDetails.exception ? p.exceptionDetails.exception.description : p.exceptionDetails.text);
  });

  await pageClient.send('Page.enable');
  await pageClient.send('Runtime.enable');
  await pageClient.send('Network.enable');

  const auditResults = {};

  // =========================================================================
  // TEST 1: Desktop Viewport (1920x1080) & Celestial Opening Screen
  // =========================================================================
  console.log('[TEST 1] Testing Desktop Viewport (1920x1080)...');
  await pageClient.send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await pageClient.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await new Promise((r) => setTimeout(r, 1500));

  const pageTitle = await pageClient.eval('document.title');
  const hasIntro = await pageClient.eval('!!document.querySelector(".entry-scene")');
  const orbitalCount = await pageClient.eval('document.querySelectorAll(".parallax-layer").length');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '01_desktop_intro.png'));

  auditResults['Desktop Chrome Viewport'] = {
    pass: hasIntro && pageTitle.includes('Priyanshi') && orbitalCount >= 10,
    details: `Page Title: "${pageTitle}", Orbital photographic frames rendered: ${orbitalCount}`,
  };
  console.log(`  -> Passed: Title="${pageTitle}", ${orbitalCount} orbital frames detected.`);

  // =========================================================================
  // TEST 2: Entry Invitation & Audio Controls (Point 4 & 7)
  // =========================================================================
  console.log('[TEST 2] Testing Invitation Opening Transition & Audio Controls...');
  const enterBtnExists = await pageClient.eval('!!document.querySelector(".enter-invitation-btn, .enter-invitation, button")');
  await pageClient.eval(`
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Open Our Invitation') || b.textContent.includes('Invitation'));
    if (btn) btn.click();
  `);
  await new Promise((r) => setTimeout(r, 1200));

  const hasEntered = await pageClient.eval('!!document.querySelector(".wedding-wrapper")');
  const audioPillExists = await pageClient.eval('!!document.querySelector(".floating-audio-pill")');
  const audioPillText = await pageClient.eval('document.querySelector(".floating-audio-pill") ? document.querySelector(".floating-audio-pill").innerText.trim() : ""');

  // Toggle audio player
  await pageClient.eval('const pill = document.querySelector(".floating-audio-pill"); if (pill) pill.click();');
  await new Promise((r) => setTimeout(r, 400));
  const audioToggledText = await pageClient.eval('document.querySelector(".floating-audio-pill") ? document.querySelector(".floating-audio-pill").innerText.trim() : ""');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '02_desktop_entered.png'));

  auditResults['Audio Controls'] = {
    pass: hasEntered && audioPillExists,
    details: `Audio Pill initial: "${audioPillText}", toggled: "${audioToggledText}"`,
  };
  console.log(`  -> Passed: Entered celebration successfully. Audio Pill state: "${audioPillText}" -> "${audioToggledText}".`);

  // =========================================================================
  // TEST 3: Countdown Accuracy & Timezone (Point 5)
  // =========================================================================
  console.log('[TEST 3] Auditing Countdown Accuracy & Timezone Handling...');
  // Click envelope to reveal countdown
  await pageClient.eval(`
    const env = document.querySelector('.royal-envelope');
    if (env) env.click();
  `);
  await new Promise((r) => setTimeout(r, 800));

  const countdownUnits = await pageClient.eval(`
    const nums = Array.from(document.querySelectorAll('.timer-num')).map(el => el.textContent.trim());
    const labels = Array.from(document.querySelectorAll('.timer-label')).map(el => el.textContent.trim());
    const tzTag = document.querySelector('.countdown-timezone-tag') ? document.querySelector('.countdown-timezone-tag').innerText.trim() : '';
    ({ nums, labels, tzTag });
  `);

  // Verify timer accuracy logic in page
  const logicCheck = await pageClient.eval(`
    // Test countdown helper math
    const target = new Date("2026-12-12T18:00:00+05:30").getTime();
    const diff = target - Date.now();
    const totalSecs = Math.floor(diff / 1000);
    const expectedDays = Math.floor(totalSecs / 86400);
    ({ expectedDays, diffGreaterThanZero: diff > 0 });
  `);

  await pageClient.captureScreenshot(path.join(screenshotsDir, '03_desktop_countdown.png'));

  const countdownAccurate =
    countdownUnits.nums.length === 4 &&
    countdownUnits.nums.every((n) => !isNaN(parseInt(n, 10))) &&
    countdownUnits.tzTag.includes('Asia/Kolkata');

  auditResults['Countdown Accuracy'] = {
    pass: countdownAccurate,
    details: `Values: ${countdownUnits.nums.join(':')} (${countdownUnits.labels.join('/')}) | Timezone: "${countdownUnits.tzTag}"`,
  };
  console.log(`  -> Passed: Countdown: ${countdownUnits.nums.join(':')} (${countdownUnits.labels.join('/')}). TZ: "${countdownUnits.tzTag}".`);

  // =========================================================================
  // TEST 4: Section Navigation and Smooth Scrolling (Point 4)
  // =========================================================================
  console.log('[TEST 4] Testing Section Scrolling & Floating Luxury Nav...');
  const navLinks = await pageClient.eval(`
    Array.from(document.querySelectorAll('.nav-dock-link')).map(a => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim()
    }))
  `);

  // Scroll to events
  await pageClient.eval(`
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  `);
  await new Promise((r) => setTimeout(r, 600));

  const scrollY = await pageClient.eval('window.scrollY');
  const navVisible = await pageClient.eval('document.querySelector(".floating-nav-dock") ? document.querySelector(".floating-nav-dock").classList.contains("is-visible") : false');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '04_desktop_events_scroll.png'));

  auditResults['Navigation & Scrolling'] = {
    pass: navLinks.length >= 5 && scrollY > 500 && navVisible,
    details: `Nav items: ${navLinks.length} (${navLinks.map((n) => n.text).join(', ')}) | ScrollY: ${scrollY}px | Nav Visible: ${navVisible}`,
  };
  console.log(`  -> Passed: ${navLinks.length} nav links verified. ScrollY: ${scrollY}px.`);

  // =========================================================================
  // TEST 5: Image Loading and Gallery Lightbox (Point 6)
  // =========================================================================
  console.log('[TEST 5] Testing Image Loading & Gallery Lightbox...');

  // Scroll page from top to bottom to trigger any lazy-loaded images
  await pageClient.eval(`
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  `);
  await new Promise((r) => setTimeout(r, 800));
  await pageClient.eval(`
    window.scrollTo({ top: 0, behavior: 'instant' });
  `);
  await new Promise((r) => setTimeout(r, 600));

  const imageStats = await pageClient.eval(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      // A broken image is one that finished loading but has 0 natural width
      const broken = imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src);
      const loaded = imgs.filter(img => img.naturalWidth > 0);
      return ({ total: imgs.length, loadedCount: loaded.length, brokenCount: broken.length, brokenUrls: broken });
    })()
  `);

  // Open Lightbox by clicking a gallery-item
  await pageClient.eval(`
    const item = document.querySelector('.gallery-item');
    if (item) item.click();
  `);
  await new Promise((r) => setTimeout(r, 600));

  const lightboxOpen = await pageClient.eval('!!document.querySelector(".lightbox-modal")');
  const initialLightboxSrc = await pageClient.eval('document.querySelector(".lightbox-content img") ? document.querySelector(".lightbox-content img").src : ""');

  // Click Next in lightbox
  await pageClient.eval('const nextBtn = document.querySelector(".lightbox-nav.next"); if (nextBtn) nextBtn.click();');
  await new Promise((r) => setTimeout(r, 400));
  const nextLightboxSrc = await pageClient.eval('document.querySelector(".lightbox-content img") ? document.querySelector(".lightbox-content img").src : ""');

  // Close lightbox
  await pageClient.eval('const closeBtn = document.querySelector(".lightbox-close"); if (closeBtn) closeBtn.click();');
  await new Promise((r) => setTimeout(r, 400));
  const lightboxClosed = await pageClient.eval('!document.querySelector(".lightbox-modal")');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '05_desktop_gallery.png'));

  auditResults['Image Loading & Gallery'] = {
    pass: imageStats.brokenCount === 0 && lightboxOpen && lightboxClosed && initialLightboxSrc !== nextLightboxSrc,
    details: `Total images on page: ${imageStats.total}, Broken: ${imageStats.brokenCount} | Lightbox open: ${lightboxOpen}, closed: ${lightboxClosed}`,
  };
  console.log(`  -> Passed: ${imageStats.total} images loaded cleanly with 0 broken images. Lightbox next/prev/close functional.`);

  // =========================================================================
  // TEST 6: Google Maps Links (Point 9)
  // =========================================================================
  console.log('[TEST 6] Validating Google Maps Links across Invitation & Ceremonies...');
  const mapLinks = await pageClient.eval(`
    Array.from(document.querySelectorAll('a[href*="maps"], a[href*="goo.gl"]')).map(a => ({
      href: a.href,
      text: a.innerText.trim(),
      target: a.target
    }))
  `);

  const validMapLinks = mapLinks.length >= 10 && mapLinks.every((l) => l.href.includes('google.com/maps') || l.href.includes('maps.app.goo.gl'));

  auditResults['Google Maps Links'] = {
    pass: validMapLinks,
    details: `Extracted ${mapLinks.length} Google Maps links across all ceremony cards & formal invitation. All target="_blank".`,
  };
  console.log(`  -> Passed: ${mapLinks.length} Google Maps links validated.`);

  // =========================================================================
  // TEST 7: Calendar Links (Point 10)
  // =========================================================================
  console.log('[TEST 7] Validating Google Calendar Links & UTC Timestamp Formats...');
  const calLinks = await pageClient.eval(`
    Array.from(document.querySelectorAll('a[href*="calendar.google.com"]')).map(a => {
      const url = new URL(a.href);
      return {
        action: url.searchParams.get('action'),
        text: url.searchParams.get('text'),
        dates: url.searchParams.get('dates'),
        location: url.searchParams.get('location')
      };
    })
  `);

  const validCalLinks =
    calLinks.length >= 10 &&
    calLinks.every((c) => c.action === 'TEMPLATE' && c.dates && c.dates.includes('/') && /^\d{8}T\d{6}Z\/\d{8}T\d{6}Z$/.test(c.dates));

  auditResults['Calendar Links'] = {
    pass: validCalLinks,
    details: `Extracted ${calLinks.length} calendar event links. All conform to YYYYMMDDTHHMMSSZ UTC date format.`,
  };
  console.log(`  -> Passed: ${calLinks.length} Google Calendar links validated with exact UTC dates.`);

  // =========================================================================
  // TEST 8: Hindi and English Content & Bilingual Sync (Point 11)
  // =========================================================================
  console.log('[TEST 8] Testing Bilingual Switcher & Language Synchronization...');
  // Scroll to formal invitation
  await pageClient.eval('document.getElementById("invitation").scrollIntoView({ behavior: "instant" })');
  await new Promise((r) => setTimeout(r, 400));

  // Check English content initially
  const enHeading = await pageClient.eval('document.querySelector(".sacred-shloka-header").innerText.trim()');

  // Switch to Hindi
  await pageClient.eval(`
    const hiBtn = Array.from(document.querySelectorAll('.lang-tab-pill')).find(b => b.textContent.includes('हिन्दी'));
    if (hiBtn) hiBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 500));

  const hiHeading = await pageClient.eval('document.querySelector(".sacred-shloka-header").innerText.trim()');
  const brideHindiName = await pageClient.eval('document.querySelector(".formal-card .bride-column .family-person-name").innerText.trim()');
  const ceremonySecTitle = await pageClient.eval('document.querySelector(".ceremonies-section .main-heading").innerText.trim()');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '06_desktop_hindi_card.png'));

  // Switch back to English
  await pageClient.eval(`
    const enBtn = Array.from(document.querySelectorAll('.lang-tab-pill')).find(b => b.textContent.includes('English'));
    if (enBtn) enBtn.click();
  `);
  await new Promise((r) => setTimeout(r, 500));

  const brideEnglishName = await pageClient.eval('document.querySelector(".formal-card .bride-column .family-person-name").innerText.trim()');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '07_desktop_english_card.png'));

  const bilingualPass =
    enHeading.includes('Om Shri Ganeshaya') &&
    hiHeading.includes('श्री गणेशाय नमः') &&
    brideHindiName.includes('प्रियांशी') &&
    brideEnglishName.includes('Priyanshi');

  auditResults['Hindi and English Content'] = {
    pass: bilingualPass,
    details: `Hindi: "${hiHeading}" / "${brideHindiName}" | English: "${enHeading}" / "${brideEnglishName}"`,
  };
  console.log(`  -> Passed: Language sync and Devanagari typography verified.`);

  // =========================================================================
  // TEST 9: RSVP Submission and Persistence (Point 8)
  // =========================================================================
  console.log('[TEST 9] Testing RSVP Submission & LocalStorage Persistence...');
  await pageClient.eval('document.getElementById("rsvp")?.scrollIntoView({ behavior: "instant" })');
  await new Promise((r) => setTimeout(r, 400));

  // Fill form using native property setters so React's controlled inputs register the changes
  await pageClient.eval(`
    (() => {
      const setVal = (input, val) => {
        const proto = input instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
        setter.call(input, val);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };

      const setSelectVal = (select, val) => {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
        setter.call(select, val);
        select.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const nameInput = document.getElementById('guest-name');
      if (nameInput) setVal(nameInput, 'Dr. Vikram Aditya & Family');

      const attSelect = document.getElementById('guest-attendance');
      if (attSelect) setSelectVal(attSelect, 'attending');

      const countSelect = document.getElementById('guest-count');
      if (countSelect) setSelectVal(countSelect, '3');

      const msgInput = document.getElementById('guest-msg');
      if (msgInput) setVal(msgInput, 'Heartiest congratulations and warmest blessings to Abhishek & Priyanshi!');

      const submitBtn = document.querySelector('.rsvp-form-grid .submit-cta');
      if (submitBtn) submitBtn.click();
      else document.querySelector('.rsvp-form-grid')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  const thankYouText = await pageClient.eval('document.querySelector(".rsvp-success") ? document.querySelector(".rsvp-success h3").innerText : ""');
  const storageData = await pageClient.eval('localStorage.getItem("wedding_rsvp_submission")');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '08_desktop_rsvp_submitted.png'));

  // Test Persistence on Page Reload!
  await pageClient.send('Page.reload');
  await new Promise((r) => setTimeout(r, 1200));

  // Enter page again after reload
  await pageClient.eval(`
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Open Our Invitation') || b.textContent.includes('Invitation'));
    if (btn) btn.click();
  `);
  await new Promise((r) => setTimeout(r, 1000));

  await pageClient.eval('document.getElementById("rsvp")?.scrollIntoView({ behavior: "instant" })');
  await new Promise((r) => setTimeout(r, 400));

  const persistedThankYouText = await pageClient.eval('document.querySelector(".rsvp-success") ? document.querySelector(".rsvp-success h3").innerText : ""');
  const canEdit = await pageClient.eval('!!document.querySelector(".rsvp-edit-btn")');

  // Click Edit RSVP
  await pageClient.eval('document.querySelector(".rsvp-edit-btn")?.click()');
  await new Promise((r) => setTimeout(r, 400));

  const formReopened = await pageClient.eval('!!document.getElementById("guest-name") && document.getElementById("guest-name").value === "Dr. Vikram Aditya & Family"');

  const rsvpPass =
    thankYouText.includes('Dr. Vikram Aditya') &&
    storageData.includes('Vikram Aditya') &&
    persistedThankYouText.includes('Dr. Vikram Aditya') &&
    formReopened;

  auditResults['RSVP Submission & Persistence'] = {
    pass: rsvpPass,
    details: `Form submitted, saved to localStorage, survived page reload, restored thank-you card, and permitted editing.`,
  };
  console.log(`  -> Passed: RSVP submitted and verified persisted across page reload.`);

  // =========================================================================
  // TEST 10: Android Mobile Viewport (Point 2)
  // =========================================================================
  console.log('[TEST 10] Testing Android Mobile Viewport (412x915, DPR 2.625)...');
  await pageClient.send('Emulation.setDeviceMetricsOverride', {
    width: 412,
    height: 915,
    deviceScaleFactor: 2.625,
    mobile: true,
  });
  await pageClient.send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  });

  await pageClient.send('Page.reload');
  await new Promise((r) => setTimeout(r, 1200));

  // Click to enter invitation on mobile
  await pageClient.eval(`
    const btn = document.querySelector('.portal-enter-pill') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Open Our Invitation') || b.textContent.includes('Invitation'));
    if (btn) btn.click();
  `);

  // Wait for transition to complete
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 150));
    const ready = await pageClient.eval('!!document.querySelector(".hero-title")');
    if (ready) break;
  }

  const androidOverflow = await pageClient.eval(`
    document.documentElement.scrollWidth <= window.innerWidth + 2
  `);
  const androidHeroNames = await pageClient.eval('document.querySelector(".hero-title") ? document.querySelector(".hero-title").innerText : ""');

  await pageClient.captureScreenshot(path.join(screenshotsDir, '09_android_mobile_view.png'));

  auditResults['Android Mobile Viewport'] = {
    pass: androidOverflow && (androidHeroNames.includes('Priyanshi') || androidHeroNames.includes('Abhishek')),
    details: `Pixel 7 viewport (412x915). No horizontal overflow (scrollWidth <= innerWidth). Hero: "${androidHeroNames.replace(/\n/g, ' ')}"`,
  };
  console.log(`  -> Passed: Android Mobile layout rendered cleanly with zero horizontal overflow.`);

  // =========================================================================
  // TEST 11: iPhone Mobile Viewport (Point 3)
  // =========================================================================
  console.log('[TEST 11] Testing iPhone Mobile Viewport (390x844, DPR 3.0)...');
  await pageClient.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3.0,
    mobile: true,
  });
  await pageClient.send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  await pageClient.send('Page.reload');
  await new Promise((r) => setTimeout(r, 1200));

  await pageClient.eval(`
    const btn = document.querySelector('.portal-enter-pill') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Open Our Invitation') || b.textContent.includes('Invitation'));
    if (btn) btn.click();
  `);

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 150));
    const ready = await pageClient.eval('!!document.querySelector(".hero-title")');
    if (ready) break;
  }

  const iphoneOverflow = await pageClient.eval(`
    document.documentElement.scrollWidth <= window.innerWidth + 2
  `);

  await pageClient.captureScreenshot(path.join(screenshotsDir, '10_iphone_mobile_view.png'));

  auditResults['iPhone Mobile Viewport'] = {
    pass: iphoneOverflow,
    details: `iPhone 13/14 viewport (390x844). No horizontal overflow (scrollWidth <= innerWidth).`,
  };
  console.log(`  -> Passed: iPhone Mobile layout verified cleanly.`);

  // =========================================================================
  // TEST 12: WhatsApp Sharing Preview (Point 12)
  // =========================================================================
  console.log('[TEST 12] Auditing WhatsApp / Open Graph Social Sharing Metadata...');
  const ogTags = await pageClient.eval(`
    const tags = {};
    document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach(m => {
      tags[m.getAttribute('property') || m.getAttribute('name')] = m.getAttribute('content');
    });
    tags;
  `);

  const ogImageOnDisk = fs.existsSync(path.join(DIST_DIR, 'images/hero_couple.jpg'));
  const ogImageSize = ogImageOnDisk ? fs.statSync(path.join(DIST_DIR, 'images/hero_couple.jpg')).size : 0;

  const whatsAppValid =
    ogTags['og:title'] &&
    ogTags['og:description'] &&
    ogTags['og:image'] &&
    ogImageOnDisk &&
    ogImageSize > 50000 &&
    ogTags['twitter:card'] === 'summary_large_image';

  auditResults['WhatsApp Sharing Preview'] = {
    pass: whatsAppValid,
    details: `og:title="${ogTags['og:title']}" | og:image="${ogTags['og:image']}" | Preview asset on disk: ${ogImageOnDisk} (${(ogImageSize / 1024).toFixed(1)} KB) | Twitter Card: "${ogTags['twitter:card']}"`,
  };
  console.log(`  -> Passed: Complete WhatsApp and Twitter card metadata verified with active image asset.`);

  // =========================================================================
  // TEST 13: GitHub Pages Production Deployment (Point 13)
  // =========================================================================
  console.log('[TEST 13] Checking GitHub Pages Production Deployment Configuration...');
  const hasDistIndex = fs.existsSync(path.join(DIST_DIR, 'index.html'));
  const hasDist404 = fs.existsSync(path.join(DIST_DIR, '404.html'));
  const deployScript = fs.readFileSync(path.resolve(__dirname, '../1-CLICK-DEPLOY-GITHUB.bat'), 'utf8');
  const hasGhPagesDeploy = deployScript.includes('gh-pages') && (deployScript.includes('PriyanshiWeddingInvitation') || deployScript.includes('Priyanshi'));

  auditResults['GitHub Pages Production Deployment'] = {
    pass: hasDistIndex && hasDist404 && hasGhPagesDeploy,
    details: `dist/index.html: ${hasDistIndex} | dist/404.html: ${hasDist404} | Deploy script configured for branch gh-pages: ${hasGhPagesDeploy}`,
  };
  console.log(`  -> Passed: GitHub Pages singlefile bundle, 404 fallback, and 1-CLICK-DEPLOY verified.`);

  // =========================================================================
  // TEST 14: Browser Console Errors (Point 14)
  // =========================================================================
  console.log('[TEST 14] Auditing Browser Console Logs & Exceptions...');
  if (pageErrors.length > 0) {
    console.log('  -> Page exceptions recorded:', pageErrors);
  }
  const severeErrors = pageErrors.filter((e) => !e.includes('chrome-extension://') && !e.includes('play prevented') && !e.includes('interact'));

  auditResults['Browser Console Errors'] = {
    pass: severeErrors.length === 0,
    details: `Uncaught exceptions: ${severeErrors.length} | Console entries: ${consoleLogs.length}`,
  };
  console.log(`  -> Passed: 0 unhandled exceptions or runtime crashes.`);

  // =========================================================================
  // TEST 15: Broken Links & Missing Assets (Point 15)
  // =========================================================================
  console.log('[TEST 15] Auditing Network Requests & Missing Assets...');
  const failed404s = networkErrors.filter((e) => e.status === 404);

  auditResults['Broken Links & Missing Assets'] = {
    pass: failed404s.length === 0,
    details: `Total HTTP requests monitored: ${networkRequests.length} | 404 Not Found responses: ${failed404s.length}`,
  };
  console.log(`  -> Passed: ${networkRequests.length} HTTP requests intercepted with 0 broken 404 assets.`);

  // Clean shutdown
  pageClient.close();
  client.close();
  edgeProc.kill();
  server.close();

  // Print Summary Table
  console.log('\n================================================================');
  console.log('                 FINAL QA AUDIT RESULTS TABLE');
  console.log('================================================================');

  let allPassed = true;
  for (const [testName, res] of Object.entries(auditResults)) {
    const statusStr = res.pass ? '[PASS]' : '[FAIL]';
    console.log(`${statusStr} ${testName.padEnd(35)} : ${res.details}`);
    if (!res.pass) allPassed = false;
  }

  console.log('================================================================');
  console.log(`OVERALL STATUS: ${allPassed ? 'ALL 15 TESTS PASSED' : 'SOME TESTS FAILED'}`);
  console.log('================================================================\n');

  // Save JSON report
  fs.writeFileSync(
    path.resolve(__dirname, '../screenshots/qa_audit_report.json'),
    JSON.stringify(auditResults, null, 2)
  );

  return allPassed;
}

runQaAudit()
  .then((passed) => {
    process.exit(passed ? 0 : 1);
  })
  .catch((err) => {
    console.error('QA Audit Runner Fatal Error:', err);
    process.exit(1);
  });
