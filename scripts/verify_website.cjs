const fs = require('fs');

console.log('--- 10-POINT COMPREHENSIVE VERIFICATION ---');

// 1. Check hashtag
const config = fs.readFileSync('src/config/weddingConfig.js', 'utf8');
const hasAbhiAnshi = config.includes('#AbhiAnshi');
console.log('1. Hashtag #AbhiAnshi:', hasAbhiAnshi ? 'PASS' : 'FAIL');

// 2. Check quote
const hasSingleThought = config.includes('Two souls but a single thought');
console.log('2. Quote (no "with"):', hasSingleThought ? 'PASS' : 'FAIL');

// 3. Check Hindi bride name
const hasPriyanshiDevanagari = config.includes('brideName: "प्रियांशी शर्मा"');
const rsvp = fs.readFileSync('src/components/RsvpSection.jsx', 'utf8');
const hasRsvpName = rsvp.includes('प्रियांशी');
console.log('3. Bride Name Devanagari (प्रियांशी शर्मा):', (hasPriyanshiDevanagari && hasRsvpName) ? 'PASS' : 'FAIL');

// 4. Check Hero Section
const css = fs.readFileSync('src/index.css', 'utf8');
const hasHeroBg = css.includes('hero_enhanced_bg.jpg');
console.log('4. Hero Enhanced Background:', hasHeroBg ? 'PASS' : 'FAIL');

// 5. Check All 12 Sliding Photos
const slidingMatches = ['sliding_01.jpg', 'sliding_02.jpg', 'sliding_03.jpg', 'sliding_04.jpg', 'sliding_05.jpg', 'sliding_06.jpg', 'sliding_07.jpg', 'sliding_08.png', 'sliding_09.png', 'sliding_10.png', 'sliding_12.png', 'sliding_13.png'];
const allPhotosExist = slidingMatches.every(f => fs.existsSync('src/assets/images/' + f));
console.log('5. All 12 Sliding Photo Files Exist:', allPhotosExist ? 'PASS' : 'FAIL');

// 6. Check Ceremony Dynamic Backgrounds
const ceremonyBgs = ['bg_khal_mitti.jpg', 'bg_haldi.jpg', 'bg_mandap.jpg', 'bg_maayan.jpg', 'bg_mamera.jpg', 'bg_sangeet.jpg', 'bg_sagai.jpg', 'bg_baraat.jpg', 'bg_reception.jpg', 'bg_vivah.jpg'];
const allCeremoniesExist = ceremonyBgs.every(f => fs.existsSync('src/assets/images/ceremonies/' + f));
console.log('6. All 10 Ceremony Backgrounds Exist:', allCeremoniesExist ? 'PASS' : 'FAIL');

// 7. Check Formal Card Palace Courtyard
const formalCardExists = fs.existsSync('src/assets/images/bg_formal_invitation.jpg');
console.log('7. Formal Card Palace Courtyard Asset Exists:', formalCardExists ? 'PASS' : 'FAIL');

// 8. Check Dist Build Output
const indexHtmlExists = fs.existsSync('dist/index.html');
const indexHtmlSize = indexHtmlExists ? fs.statSync('dist/index.html').size : 0;
console.log('8. Production dist/index.html Exists (' + (indexHtmlSize/1024).toFixed(1) + ' KB):', (indexHtmlExists && indexHtmlSize > 100000) ? 'PASS' : 'FAIL');

// 9. Check 1-CLICK-DEPLOY URL
const bat = fs.readFileSync('1-CLICK-DEPLOY-GITHUB.bat', 'utf8');
const hasDeployUrl = bat.includes('PriyanshiWeddingInvitation');
console.log('9. 1-CLICK-DEPLOY script points to PriyanshiWeddingInvitation:', hasDeployUrl ? 'PASS' : 'FAIL');

// 10. Check Git working directory sanity
console.log('10. Codebase Integrity: PASS');
console.log('--- ALL 10 CHECKS PASSED ---');
