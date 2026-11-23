const fs = require('fs');
const path = require('path');

console.log('[POST-BUILD] Running post-build verification and asset sync...');

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('[POST-BUILD] Created dist/404.html for GitHub Pages fallback.');
} else {
  console.warn('[POST-BUILD] Warning: dist/index.html not found.');
}

const ogImage = path.join(distDir, 'images/hero_couple.jpg');
if (fs.existsSync(ogImage)) {
  console.log(`[POST-BUILD] WhatsApp / Social preview image verified: dist/images/hero_couple.jpg (${(fs.statSync(ogImage).size / 1024).toFixed(1)} KB).`);
} else {
  console.warn('[POST-BUILD] Warning: dist/images/hero_couple.jpg not found.');
}

console.log('[POST-BUILD] Completed successfully.');
