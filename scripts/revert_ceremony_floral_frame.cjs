const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const targetAfter = `/* Authentic Royal Arch Floral Garland Frame (Adorned with Delicate Pink & Peach Flowers, Daisies & Golden Vines) */
.arch-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("./assets/images/ceremony_arch_flower_frame.png");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 3;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.12));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
}

.arch-card:hover::after,
.arch-card.is-hovered-ceremony::after {
  filter: drop-shadow(0 6px 18px rgba(214, 163, 71, 0.65)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.22));
  transform: scale(1.012);
}`;

const origAfter = `.arch-card::after {
  content: "";
  position: absolute;
  inset: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.45);
  border-radius: 185px 185px 22px 22px;
  pointer-events: none;
  z-index: 0;
}`;

const targetMobileAfter = `  .arch-card::after {
    inset: 0;
  }`;

const origMobileAfter = `  .arch-card::after {
    border-radius: 110px 110px 16px 16px;
    inset: 7px;
  }`;

function replaceExact(source, from, to) {
  const normSource = source.replace(/\r\n/g, '\n');
  const normFrom = from.replace(/\r\n/g, '\n');
  const normTo = to.replace(/\r\n/g, '\n');
  if (!normSource.includes(normFrom)) {
    console.error('Target string not found in index.css!');
    process.exit(1);
  }
  const replaced = normSource.replace(normFrom, normTo);
  return replaced.replace(/\n/g, '\r\n');
}

css = replaceExact(css, targetAfter, origAfter);
css = replaceExact(css, targetMobileAfter, origMobileAfter);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully reverted Ceremony & Celebrations floral frame in src/index.css!');

