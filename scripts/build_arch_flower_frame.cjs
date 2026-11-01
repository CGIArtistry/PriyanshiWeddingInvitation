const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

async function buildArchFlowerFrame() {
  const W = 720;
  const H = 1280;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Load the 9 extracted flower elements
  const scratchDir = 'C:/Users/PantherBeast/.gemini/antigravity/brain/f9292cd6-e16d-402a-8ab6-006466b8a5e0/scratch/';
  const dahlia = await loadImage(scratchDir + 'flower_dahlia_top_right.png');
  const daisyTop = await loadImage(scratchDir + 'flower_daisy_top.png');
  const largeRose = await loadImage(scratchDir + 'flower_large_bottom_left.png');
  const roseBottom = await loadImage(scratchDir + 'flower_rose_bottom_left.png');
  const daisyRight = await loadImage(scratchDir + 'flower_daisy_right.png');
  const smallFloret = await loadImage(scratchDir + 'flower_small_bottom.png');
  const daisyBottom = await loadImage(scratchDir + 'flower_daisy_bottom_right.png');
  const leafSprig = await loadImage(scratchDir + 'leaf_sprig_right.png');
  const buds = await loadImage(scratchDir + 'buds_left.png');

  const flowersList = [
    dahlia, daisyTop, largeRose, roseBottom, daisyRight, smallFloret, daisyBottom, leafSprig, buds
  ];

  // Draw delicate dual golden arch line
  ctx.save();
  ctx.shadowColor = 'rgba(214, 163, 71, 0.45)';
  ctx.shadowBlur = 10;
  ctx.strokeStyle = 'rgba(214, 163, 71, 0.75)';
  ctx.lineWidth = 2.5;

  function traceArch(inset) {
    const l = 28 + inset;
    const r = W - 28 - inset;
    const t = 28 + inset;
    const b = H - 28 - inset;
    const archRadius = (r - l) / 2;
    const archCenterY = t + archRadius;
    const bottomRadius = 32 - (inset * 0.4);

    ctx.beginPath();
    ctx.moveTo(l + bottomRadius, b);
    ctx.lineTo(r - bottomRadius, b);
    ctx.arcTo(r, b, r, b - bottomRadius, bottomRadius);
    ctx.lineTo(r, archCenterY);
    ctx.arc((l + r) / 2, archCenterY, archRadius, 0, Math.PI, true);
    ctx.lineTo(l, b - bottomRadius);
    ctx.arcTo(l, b, l + bottomRadius, b, bottomRadius);
    ctx.closePath();
  }

  // Outer gold line
  traceArch(0);
  ctx.stroke();

  // Inner dashed gold line
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(214, 163, 71, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([7, 7]);
  traceArch(10);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Helper to draw a flower centered at (cx, cy)
  function drawStamp(img, cx, cy, scale = 1, angle = 0, opacity = 1) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  // Garland parameters
  const archCenterX = 360;
  const archCenterY = 360;
  const archRadius = 332;

  // 1. TOP ARCH CURVE (Continuous flowing garland from angle PI to 2*PI)
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const angle = Math.PI + (Math.PI * i) / steps;
    const x = archCenterX + archRadius * Math.cos(angle);
    const y = archCenterY + archRadius * Math.sin(angle);
    
    const fIdx = (i * 3 + 2) % flowersList.length;
    const img = flowersList[fIdx];
    
    const distFromCenter = Math.abs(i - 12);
    let scale = 0.52;
    if (distFromCenter === 0) scale = 0.65; // Apex crown
    else if (distFromCenter <= 2) scale = 0.58;
    else if (distFromCenter >= 10) scale = 0.56; // Shoulders

    const rot = angle + Math.PI / 2 + ((i % 3) - 1) * 0.3;
    drawStamp(img, x, y, scale, rot, 0.96);

    if (i % 2 === 1) {
      const leafScale = 0.42;
      const leafOffset = (i % 4 === 1 ? -12 : 12);
      const lx = archCenterX + (archRadius + leafOffset) * Math.cos(angle);
      const ly = archCenterY + (archRadius + leafOffset) * Math.sin(angle);
      drawStamp(leafSprig, lx, ly, leafScale, angle, 0.85);
    }
  }

  // 2. LEFT VERTICAL GARLAND (from y=390 to y=1180, x=28)
  const leftX = 28;
  const vSteps = 14;
  const yStart = 390;
  const yEnd = 1180;
  for (let i = 0; i <= vSteps; i++) {
    const y = yStart + (yEnd - yStart) * (i / vSteps);
    const fIdx = (i * 5 + 1) % flowersList.length;
    const img = flowersList[fIdx];
    const scale = 0.46;
    const rot = (i % 2 === 0 ? 0.3 : -0.3) + Math.PI;
    drawStamp(img, leftX, y, scale, rot, 0.94);

    if (i % 3 === 0) {
      drawStamp(buds, leftX - 4, y + 25, 0.45, -Math.PI / 2, 0.82);
    }
  }

  // 3. RIGHT VERTICAL GARLAND (from y=390 to y=1180, x=W-28=692)
  const rightX = W - 28;
  for (let i = 0; i <= vSteps; i++) {
    const y = yStart + (yEnd - yStart) * (i / vSteps);
    const fIdx = (i * 4 + 3) % flowersList.length;
    const img = flowersList[fIdx];
    const scale = 0.46;
    const rot = (i % 2 === 0 ? -0.3 : 0.3);
    drawStamp(img, rightX, y, scale, rot, 0.94);

    if (i % 3 === 1) {
      drawStamp(buds, rightX + 4, y + 25, 0.45, Math.PI / 2, 0.82);
    }
  }

  // 4. BOTTOM CORNERS & BASE
  drawStamp(largeRose, 46, 1238, 0.68, -0.2, 1.0);
  drawStamp(smallFloret, 96, 1248, 0.52, 0.1, 0.95);
  drawStamp(buds, 140, 1250, 0.46, Math.PI / 2, 0.85);

  drawStamp(roseBottom, W - 46, 1238, 0.68, 0.2, 1.0);
  drawStamp(smallFloret, W - 96, 1248, 0.52, -0.1, 0.95);
  drawStamp(leafSprig, W - 140, 1250, 0.46, -Math.PI / 2, 0.85);

  drawStamp(smallFloret, 360, 1250, 0.45, 0, 0.9);
  drawStamp(buds, 320, 1252, 0.38, -Math.PI / 2, 0.8);
  drawStamp(buds, 400, 1252, 0.38, Math.PI / 2, 0.8);

  const outFile = path.join(__dirname, '../src/assets/images/ceremony_arch_flower_frame.png');
  fs.writeFileSync(outFile, canvas.toBuffer('image/png'));
  console.log('Successfully generated refined ceremony_arch_flower_frame.png (' + (fs.statSync(outFile).size / 1024).toFixed(1) + ' KB)');
}

buildArchFlowerFrame();
