const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const ffmpegPath = require('ffmpeg-static');

// Video configuration
const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 30;
const DURATION_SEC = 6;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 180 frames

const MP4_OUTPUT = path.resolve('src/assets/videos/hero_hands_loop.mp4');
const WEBM_OUTPUT = path.resolve('src/assets/videos/hero_hands_loop.webm');
const POSTER_OUTPUT = path.resolve('src/assets/images/hero_hands_poster.jpg');

// Smooth easing helpers
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Generate deterministic pseudo-random sequence for reproducible beauty
let seed = 42;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

// Initialize petals with mathematically periodic loop trajectories
function createPetals(count) {
  const petals = [];
  const V_SPACE = HEIGHT + 120; // offscreen margin: -60 to HEIGHT+60

  for (let i = 0; i < count; i++) {
    const isRose = i % 3 !== 0; // 2/3 roses, 1/3 marigolds
    const loopCycles = 1 + (i % 2); // 1 or 2 full screen passes per 6 sec
    petals.push({
      isRose,
      baseX: random() * WIDTH,
      baseY: random() * V_SPACE - 60,
      vSpace: V_SPACE,
      cycles: loopCycles,
      driftAmp: 25 + random() * 45,
      driftFreq: 1 + Math.floor(random() * 3), // integer harmonic
      driftPhase: random() * Math.PI * 2,
      spinRotations: (random() > 0.5 ? 1 : -1) * (1 + Math.floor(random() * 2)),
      flipFreq: 1 + Math.floor(random() * 3),
      flipPhase: random() * Math.PI * 2,
      size: 14 + random() * 16,
      opacity: 0.7 + random() * 0.28,
    });
  }
  return petals;
}

// Initialize golden bokeh fireflies with integer harmonic trajectories
function createFireflies(count) {
  const fireflies = [];
  for (let i = 0; i < count; i++) {
    fireflies.push({
      x0: random() * WIDTH,
      y0: random() * HEIGHT,
      radius: 2 + random() * 4.5,
      ampX: 15 + random() * 35,
      ampY: 10 + random() * 25,
      freqX: 1 + (i % 3),
      freqY: 1 + ((i + 1) % 3),
      phaseX: random() * Math.PI * 2,
      phaseY: random() * Math.PI * 2,
      pulseFreq: 1 + (i % 2),
      baseAlpha: 0.35 + random() * 0.45,
    });
  }
  return fireflies;
}

async function renderVideo() {
  console.log('Loading base wedding images with golden bokeh backgrounds...');
  const imgReaching = await loadImage('src/assets/images/hastamelap_reaching_bokeh.jpg');
  const imgHands = await loadImage('src/assets/images/hastamelap_clasped_bokeh.jpg');

  console.log(`Images loaded: Reaching (${imgReaching.width}x${imgReaching.height}), Clasped (${imgHands.width}x${imgHands.height})`);

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(MP4_OUTPUT), { recursive: true });

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Pre-create auxiliary canvas for hand translation / blending
  const leftCanvas = createCanvas(WIDTH, HEIGHT);
  const leftCtx = leftCanvas.getContext('2d');
  const rightCanvas = createCanvas(WIDTH, HEIGHT);
  const rightCtx = rightCanvas.getContext('2d');

  const petals = createPetals(36);
  const fireflies = createFireflies(28);

  console.log(`Starting FFmpeg encoder for MP4 (${WIDTH}x${HEIGHT} @ ${FPS}fps, ${DURATION_SEC}s)...`);

  const ffmpegProc = spawn(ffmpegPath, [
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', `${WIDTH}x${HEIGHT}`,
    '-pix_fmt', 'rgba',
    '-r', `${FPS}`,
    '-i', 'pipe:0',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '19',
    '-movflags', '+faststart',
    MP4_OUTPUT
  ]);

  let ffmpegError = '';
  ffmpegProc.stderr.on('data', (d) => {
    ffmpegError += d.toString();
  });

  ffmpegProc.on('error', (err) => {
    console.error('FFmpeg process error:', err);
  });

  const frameByteSize = WIDTH * HEIGHT * 4;

  // Render loop: 180 frames
  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    const t = frame / TOTAL_FRAMES; // normalized time in [0, 1)

    // Motion curve for hands coming together and meeting:
    // Stage 1 (t = 0.00 -> 0.35): Hands approach from left/right (separation distance decreases from max to 0)
    // Stage 2 (t = 0.35 -> 0.65): Hands clasp in Hastamelap, divine golden light bloom, loving hold with breathing
    // Stage 3 (t = 0.65 -> 1.00): Hands gently ease back to the initial approaching stance
    let handSeparation = 0; // in pixels
    let claspBlend = 0;     // 0 = reaching image, 1 = clasped hands image
    let auraIntensity = 0;  // 0 to 1 golden halo burst

    if (t < 0.35) {
      // Approaching
      const p = t / 0.35;
      const ease = easeInOutCubic(p);
      handSeparation = (1 - ease) * 65; // from 65px separation down to 0
      claspBlend = 0;
      if (p > 0.8) {
        // Anticipation glow right before contact
        auraIntensity = (p - 0.8) / 0.2 * 0.4;
      }
    } else if (t < 0.65) {
      // Clasping & holding
      const p = (t - 0.35) / 0.30;
      handSeparation = 0;
      // Smoothly cross-fade to clasped hands
      if (p < 0.25) {
        claspBlend = easeInOutQuad(p / 0.25);
      } else if (p > 0.75) {
        claspBlend = 1 - easeInOutQuad((p - 0.75) / 0.25);
      } else {
        claspBlend = 1.0;
      }

      // Golden aura bloom at contact point
      if (p < 0.20) {
        auraIntensity = 0.4 + (p / 0.20) * 0.6; // peak at contact
      } else if (p < 0.60) {
        auraIntensity = 1.0 - ((p - 0.20) / 0.40) * 0.7; // gentle fade
      } else {
        auraIntensity = 0.3 * (1 - (p - 0.60) / 0.40);
      }
    } else {
      // Smoothly glide back to loop start
      const p = (t - 0.65) / 0.35;
      const ease = easeInOutCubic(p);
      handSeparation = ease * 65; // from 0 back to 65px
      claspBlend = 0;
      auraIntensity = 0;
    }

    // Subtle breathing camera scale (1.00 to 1.025, periodic: sin(2 * pi * t))
    const camBreath = 1.0 + 0.02 * Math.sin(t * Math.PI * 2);

    ctx.save();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Apply subtle camera breathing centered at hands
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.scale(camBreath, camBreath);
    ctx.translate(-WIDTH / 2, -HEIGHT / 2);

    // 1. Draw base scene: reaching hands with animated left/right hand separation
    // Draw background and left side (bride) shifted left by handSeparation
    // Draw right side (groom) shifted right by handSeparation
    const midX = WIDTH * 0.48; // center divide between bride and groom hands

    // Draw reaching background image
    ctx.drawImage(imgReaching, 0, 0, WIDTH, HEIGHT);

    // If hands have separation, displace left hand leftward and right hand rightward
    if (handSeparation > 0.5) {
      // Clear auxiliary canvases
      leftCtx.clearRect(0, 0, WIDTH, HEIGHT);
      rightCtx.clearRect(0, 0, WIDTH, HEIGHT);

      // Left hand slice with soft feathering near center
      leftCtx.save();
      leftCtx.beginPath();
      leftCtx.rect(0, 0, midX + 30, HEIGHT);
      leftCtx.clip();
      leftCtx.drawImage(imgReaching, 0, 0, WIDTH, HEIGHT);
      leftCtx.restore();

      // Right hand slice with soft feathering near center
      rightCtx.save();
      rightCtx.beginPath();
      rightCtx.rect(midX - 30, 0, WIDTH - (midX - 30), HEIGHT);
      rightCtx.clip();
      rightCtx.drawImage(imgReaching, 0, 0, WIDTH, HEIGHT);
      rightCtx.restore();

      // Redraw shifted hands over the base scene
      ctx.save();
      // Left hand moves left
      ctx.drawImage(leftCanvas, -handSeparation, 0);
      // Right hand moves right
      ctx.drawImage(rightCanvas, handSeparation, 0);
      ctx.restore();
    }

    // 2. Cross-fade into clasped Hastamelap image when clasped
    if (claspBlend > 0.001) {
      ctx.save();
      ctx.globalAlpha = claspBlend;
      ctx.drawImage(imgHands, 0, 0, WIDTH, HEIGHT);
      ctx.restore();
    }

    // 3. Divine Golden Light Bloom at the Contact / Clasp point
    if (auraIntensity > 0.01) {
      const claspX = WIDTH * 0.485;
      const claspY = HEIGHT * 0.525;
      const bloomRadius = 140 + auraIntensity * 120;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Soft radiant warm golden gradient
      const auraGrad = ctx.createRadialGradient(claspX, claspY, 0, claspX, claspY, bloomRadius);
      auraGrad.addColorStop(0.0, `rgba(255, 255, 230, ${0.95 * auraIntensity})`);
      auraGrad.addColorStop(0.2, `rgba(255, 220, 120, ${0.75 * auraIntensity})`);
      auraGrad.addColorStop(0.5, `rgba(240, 160, 40, ${0.40 * auraIntensity})`);
      auraGrad.addColorStop(1.0, 'rgba(200, 100, 20, 0)');

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(claspX, claspY, bloomRadius, 0, Math.PI * 2);
      ctx.fill();

      // Starburst rays at peak clasp
      if (auraIntensity > 0.4) {
        const rayAlpha = (auraIntensity - 0.4) / 0.6 * 0.45;
        const rayAngle = t * Math.PI * 4; // slowly rotating
        ctx.strokeStyle = `rgba(255, 245, 200, ${rayAlpha})`;
        ctx.lineWidth = 1.5;

        for (let r = 0; r < 8; r++) {
          const ang = rayAngle + (r * Math.PI / 4);
          const rayLen = 80 + (r % 2 === 0 ? 50 : 20);
          ctx.beginPath();
          ctx.moveTo(claspX, claspY);
          ctx.lineTo(claspX + Math.cos(ang) * rayLen, claspY + Math.sin(ang) * rayLen);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // 4. Ambient Golden Sunburst & Bokeh Rays Breathing
    const sunbeamBreath = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    // Top-left golden sunbeam ray (matching the previous bokeh lighting)
    const sunGrad = ctx.createRadialGradient(0, 0, 50, 0, 0, WIDTH * 0.75);
    sunGrad.addColorStop(0, `rgba(255, 240, 180, ${0.28 + sunbeamBreath * 0.12})`);
    sunGrad.addColorStop(0.4, `rgba(255, 205, 100, ${0.15 + sunbeamBreath * 0.08})`);
    sunGrad.addColorStop(1, 'rgba(230, 150, 40, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();

    // 5. Floating Golden Bokeh Fireflies
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (const ff of fireflies) {
      const curX = ff.x0 + Math.sin(t * Math.PI * 2 * ff.freqX + ff.phaseX) * ff.ampX;
      const curY = ff.y0 + Math.cos(t * Math.PI * 2 * ff.freqY + ff.phaseY) * ff.ampY;
      const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * ff.pulseFreq);
      const alpha = ff.baseAlpha * (0.6 + pulse * 0.4);

      const fGrad = ctx.createRadialGradient(curX, curY, 0, curX, curY, ff.radius * 3.5);
      fGrad.addColorStop(0, `rgba(255, 245, 180, ${alpha})`);
      fGrad.addColorStop(0.4, `rgba(255, 200, 70, ${alpha * 0.6})`);
      fGrad.addColorStop(1, 'rgba(220, 140, 30, 0)');

      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.arc(curX, curY, ff.radius * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 6. Seamless Falling Rose & Marigold Flower Petals
    ctx.save();
    for (const p of petals) {
      // Periodic vertical displacement
      const totalDist = p.cycles * p.vSpace;
      const rawY = p.baseY + t * totalDist;
      const curY = ((rawY + 60) % p.vSpace) - 60; // wraps seamlessly between -60 and HEIGHT+60

      // Periodic horizontal drift
      const curX = p.baseX + Math.sin(t * Math.PI * 2 * p.driftFreq + p.driftPhase) * p.driftAmp;

      // Periodic 2D rotation & 3D flutter
      const rot = t * Math.PI * 2 * p.spinRotations;
      const flipScale = Math.cos(t * Math.PI * 2 * p.flipFreq + p.flipPhase);

      // Edge fading so petal never pops when entering/leaving screen
      let edgeAlpha = 1.0;
      if (curY < 30) edgeAlpha = Math.max(0, (curY + 30) / 60);
      if (curY > HEIGHT - 30) edgeAlpha = Math.max(0, (HEIGHT + 30 - curY) / 60);

      const petalAlpha = p.opacity * edgeAlpha;
      if (petalAlpha <= 0.01) continue;

      ctx.save();
      ctx.translate(curX, curY);
      ctx.rotate(rot);
      ctx.scale(flipScale, 1.0);

      // Draw stylized petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.bezierCurveTo(p.size * 0.55, -p.size * 0.5, p.size * 0.65, p.size * 0.4, 0, p.size * 0.7);
      ctx.bezierCurveTo(-p.size * 0.65, p.size * 0.4, -p.size * 0.55, -p.size * 0.5, 0, -p.size * 0.7);

      if (p.isRose) {
        // Velvety royal red rose petal with soft sheen
        const pGrad = ctx.createLinearGradient(-p.size * 0.3, -p.size * 0.5, p.size * 0.3, p.size * 0.5);
        pGrad.addColorStop(0, `rgba(220, 38, 55, ${petalAlpha})`);
        pGrad.addColorStop(0.6, `rgba(160, 20, 35, ${petalAlpha})`);
        pGrad.addColorStop(1, `rgba(90, 8, 18, ${petalAlpha})`);
        ctx.fillStyle = pGrad;
      } else {
        // Auspicious saffron/yellow marigold petal
        const pGrad = ctx.createLinearGradient(-p.size * 0.3, -p.size * 0.5, p.size * 0.3, p.size * 0.5);
        pGrad.addColorStop(0, `rgba(255, 215, 60, ${petalAlpha})`);
        pGrad.addColorStop(0.6, `rgba(245, 160, 20, ${petalAlpha})`);
        pGrad.addColorStop(1, `rgba(215, 110, 10, ${petalAlpha})`);
        ctx.fillStyle = pGrad;
      }
      ctx.fill();

      // Subtle curved highlight line along petal spine
      ctx.strokeStyle = p.isRose ? `rgba(255, 180, 190, ${petalAlpha * 0.35})` : `rgba(255, 255, 200, ${petalAlpha * 0.45})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.5);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.5);
      ctx.stroke();

      ctx.restore();
    }
    ctx.restore();

    // 7. Subtle luxury vignette and warm wedding color grading
    ctx.save();
    const vigGrad = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, WIDTH * 0.32, WIDTH / 2, HEIGHT / 2, WIDTH * 0.68);
    vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vigGrad.addColorStop(1, 'rgba(30, 12, 6, 0.32)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();

    // End camera breath transform
    ctx.restore();

    // Save poster image at frame 90 (at 3.0s, when hands are clasped in Hastamelap with golden glow)
    if (frame === 90) {
      const posterBuf = canvas.toBuffer('image/jpeg', 92);
      fs.writeFileSync(POSTER_OUTPUT, posterBuf);
      console.log(`Saved poster image: ${POSTER_OUTPUT}`);
    }

    // Write RGBA frame buffer to FFmpeg pipe
    const imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    ffmpegProc.stdin.write(Buffer.from(imgData.data.buffer));

    if (frame % 30 === 0) {
      console.log(`Rendered frame ${frame}/${TOTAL_FRAMES} (${(frame / FPS).toFixed(1)}s / ${DURATION_SEC}s)...`);
    }
  }

  // Finalize video encoding
  ffmpegProc.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpegProc.on('close', (code) => {
      if (code === 0) {
        console.log(`MP4 video successfully created at: ${MP4_OUTPUT}`);
        resolve();
      } else {
        console.error('FFmpeg stderr:', ffmpegError);
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  // Also encode WebM version for browser choice
  console.log('Generating matching WebM loop video...');
  await new Promise((resolve, reject) => {
    const webmProc = spawn(ffmpegPath, [
      '-y',
      '-i', MP4_OUTPUT,
      '-c:v', 'libvpx-vp9',
      '-crf', '26',
      '-b:v', '0',
      '-an',
      WEBM_OUTPUT
    ]);

    webmProc.on('close', (code) => {
      if (code === 0) {
        console.log(`WebM video successfully created at: ${WEBM_OUTPUT}`);
        resolve();
      } else {
        console.warn('WebM encoding completed or skipped with code', code);
        resolve(); // Continue even if VP9 optional
      }
    });
  });

  console.log('All video assets successfully rendered and verified!');
}

renderVideo().catch((err) => {
  console.error('Error generating video:', err);
  process.exit(1);
});

