const fs = require('fs');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

async function createEnhancedHeroBg() {
  console.log('Loading base assets for enhanced hero background...');
  const palaceImg = await loadImage('src/assets/images/bg_formal_invitation.jpg');
  const sunburstImg = await loadImage('src/assets/images/hero_couple.jpg');

  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 1. Draw the Royal Palace Courtyard as the regal architectural base
  ctx.drawImage(palaceImg, 0, 0, width, height);

  // 2. Blend the Golden Sunburst & Bokeh Orbs from hero_couple
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.58;
  ctx.drawImage(sunburstImg, 0, 0, width, height);
  ctx.restore();

  // 3. Add soft golden sunbeams streaming from top-left across the courtyard
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const beamGrad = ctx.createRadialGradient(0, 0, 80, 0, 0, width * 0.85);
  beamGrad.addColorStop(0, 'rgba(255, 245, 195, 0.45)');
  beamGrad.addColorStop(0.3, 'rgba(255, 215, 120, 0.25)');
  beamGrad.addColorStop(0.7, 'rgba(235, 160, 45, 0.10)');
  beamGrad.addColorStop(1, 'rgba(200, 120, 20, 0)');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // 4. Draw floating golden bokeh orbs
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const orbs = [
    { x: 280, y: 320, r: 45, a: 0.35 },
    { x: 380, y: 190, r: 65, a: 0.42 },
    { x: 520, y: 260, r: 35, a: 0.30 },
    { x: 1450, y: 280, r: 55, a: 0.38 },
    { x: 1620, y: 390, r: 75, a: 0.40 },
    { x: 1320, y: 480, r: 40, a: 0.28 },
    { x: 820, y: 180, r: 50, a: 0.32 },
    { x: 1100, y: 210, r: 42, a: 0.30 },
    { x: 1720, y: 220, r: 60, a: 0.36 },
    { x: 180, y: 550, r: 50, a: 0.26 },
  ];

  for (const orb of orbs) {
    const oGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
    oGrad.addColorStop(0, `rgba(255, 250, 210, ${orb.a})`);
    oGrad.addColorStop(0.5, `rgba(255, 210, 90, ${orb.a * 0.6})`);
    oGrad.addColorStop(1, 'rgba(220, 140, 30, 0)');
    ctx.fillStyle = oGrad;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 5. Central Warm Champagne Sanctuary Glow (ensures title Abhishek & Priyanshi pops with crystal clarity)
  ctx.save();
  const centerGlow = ctx.createRadialGradient(width / 2, height * 0.45, 0, width / 2, height * 0.45, width * 0.52);
  centerGlow.addColorStop(0, 'rgba(255, 252, 244, 0.48)');
  centerGlow.addColorStop(0.45, 'rgba(252, 244, 228, 0.32)');
  centerGlow.addColorStop(0.8, 'rgba(248, 235, 212, 0.15)');
  centerGlow.addColorStop(1, 'rgba(240, 220, 190, 0)');
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // 6. Subtle luxury vignette framing
  ctx.save();
  const vigGrad = ctx.createRadialGradient(width / 2, height / 2, width * 0.38, width / 2, height / 2, width * 0.72);
  vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vigGrad.addColorStop(1, 'rgba(40, 18, 8, 0.28)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  const outPath = 'src/assets/images/hero_enhanced_bg.jpg';
  const buf = canvas.toBuffer('image/jpeg', 94);
  fs.writeFileSync(outPath, buf);
  console.log(`Successfully generated enhanced hero background: ${outPath} (${buf.length} bytes)`);
}

createEnhancedHeroBg().catch(console.error);

