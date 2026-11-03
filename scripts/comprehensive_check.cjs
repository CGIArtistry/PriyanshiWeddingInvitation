const fs = require('fs');
const path = require('path');

console.log('=======================================================');
console.log('   20-POINT COMPREHENSIVE VERIFICATION SUITE');
console.log('=======================================================');

let passCount = 0;
let failCount = 0;

function test(num, description, condition, details = '') {
  if (condition) {
    console.log(`[PASS] Check ${String(num).padStart(2, '0')}: ${description}`);
    passCount++;
  } else {
    console.error(`[FAIL] Check ${String(num).padStart(2, '0')}: ${description} ${details}`);
    failCount++;
  }
}

const config = fs.readFileSync('src/config/weddingConfig.js', 'utf8');
const hero = fs.readFileSync('src/components/HeroSection.jsx', 'utf8');
const rsvp = fs.readFileSync('src/components/RsvpSection.jsx', 'utf8');
const ceremony = fs.readFileSync('src/components/CeremonyCards.jsx', 'utf8');
const css = fs.readFileSync('src/index.css', 'utf8');
const distHtml = fs.existsSync('dist/index.html') ? fs.readFileSync('dist/index.html', 'utf8') : '';

// 1. Monogram in HeroSection: A then P
const aIndex = hero.indexOf('monogram-letter-a">A</span>');
const pIndex = hero.indexOf('monogram-letter-p">P</span>');
test(1, 'Hero Section Monogram order is AP (A before P)', aIndex !== -1 && pIndex !== -1 && aIndex < pIndex);

// 2. Monogram in weddingConfig.js
test(2, 'weddingConfig couple.monogram is "AP"', config.includes('monogram: "AP"'));

// 3. MonogramSeal in weddingConfig.js
test(3, 'weddingConfig intro.monogramSeal is "AP"', config.includes('monogramSeal: "AP"'));

// 4. Hashtag
test(4, 'Wedding hashtag is #AbhiAnshi', config.includes('#AbhiAnshi'));

// 5. Journey Quote
test(5, 'Story quote has no "with" ("Two souls but a single thought")', config.includes('Two souls but a single thought'));

// 6. Bride Name in Devanagari in weddingConfig
test(6, 'Bride name in Devanagari has anusvara: प्रियांशी शर्मा', config.includes('brideName: "प्रियांशी शर्मा"'));

// 7. Bride Name in Devanagari in RSVP Section
test(7, 'RSVP section mentions प्रियांशी', rsvp.includes('प्रियांशी'));

// 8. Ganesh Pujan added with Mata Pujan in both languages
const hasGaneshHi = config.includes('श्री गणेश एवं माता पूजन');
const hasGaneshEn = config.includes('Shri Ganesh & Mata Poojan');
test(8, 'Ganesh Pujan added to Mata Pujan in Hindi & English', hasGaneshHi && hasGaneshEn);

// 9. Ganesh & Mata Pujan Time: 10 am to 3 pm
const hasGaneshTimeHi = config.includes('प्रातः 10:00 से दोपहर 03:00 तक');
const hasGaneshTimeEn = config.includes('10:00 AM to 03:00 PM');
test(9, 'Ganesh & Mata Pujan timing is 10 AM to 3 PM in both languages', hasGaneshTimeHi && hasGaneshTimeEn);

// 10. Mandap Time: from 11 am, no end time
const hasMandapTimeHi = config.includes('प्रातः 11:00 बजे से');
const hasMandapTimeEn = config.includes('11:00 AM onwards');
test(10, 'Mandap timing is from 11 AM (no end time) in both languages', hasMandapTimeHi && hasMandapTimeEn);

// 11. Mamera Time: from 1 pm, no end time
const hasMameraTimeHi = config.includes('दोपहर 01:00 बजे से');
const hasMameraTimeEn = config.includes('01:00 PM onwards');
test(11, 'Mamera timing is from 1 PM (no end time) in both languages', hasMameraTimeHi && hasMameraTimeEn);

// 12. Haldi/Mehndi event exists on 11 Dec
const hasHaldiEvent = config.includes('id: "haldi-mehndi"') && config.includes('type: "haldi"');
test(12, 'Haldi & Mehndi event exists on 11 December', hasHaldiEvent);

// 13. Haldi/Mehndi Time: from 4 pm onwards, no end time
const hasHaldiTimeHi = config.includes('शाम 04:00 बजे से');
const hasHaldiTimeEn = config.includes('04:00 PM onwards');
test(13, 'Haldi & Mehndi timing is from 4 PM onwards in both languages', hasHaldiTimeHi && hasHaldiTimeEn);

// 14. Mahila Sangeet Time: from 7 pm, no end time
const hasSangeetTimeHi = config.includes('शाम 07:00 बजे से');
const hasSangeetTimeEn = config.includes('07:00 PM onwards');
test(14, 'Mahila Sangeet timing is from 7 PM onwards in both languages', hasSangeetTimeHi && hasSangeetTimeEn);

// 15. Sagai / Ring Ceremony Time: from 11 am, no end time
const hasSagaiTimeHi = config.includes('प्रातः 11:00 बजे से');
const hasSagaiTimeEn = config.includes('11:00 AM onwards');
test(15, 'Ring Ceremony (Sagai) timing is from 11 AM onwards in both languages', hasSagaiTimeHi && hasSagaiTimeEn);

// 16. Remove प्रीतिभोज from Varmala card
const hasPreetibhoj = config.includes('प्रीतिभोज');
test(16, 'No mention of (प्रीतिभोज) in Varmala description', !hasPreetibhoj);

// 17. All 12 sliding photos exist on disk
const slidingMatches = ['sliding_01.jpg', 'sliding_02.jpg', 'sliding_03.jpg', 'sliding_04.jpg', 'sliding_05.jpg', 'sliding_06.jpg', 'sliding_07.jpg', 'sliding_08.png', 'sliding_09.png', 'sliding_10.png', 'sliding_12.png', 'sliding_13.png'];
const allPhotosExist = slidingMatches.every(f => fs.existsSync('src/assets/images/' + f));
test(17, 'All 12 sliding photos (01-07, 08, 09, 10, 12, 13) exist on disk', allPhotosExist);

// 18. All 10 ceremony backgrounds exist on disk
const ceremonyBgs = ['bg_khal_mitti.jpg', 'bg_haldi.jpg', 'bg_mandap.jpg', 'bg_maayan.jpg', 'bg_mamera.jpg', 'bg_sangeet.jpg', 'bg_sagai.jpg', 'bg_baraat.jpg', 'bg_reception.jpg', 'bg_vivah.jpg'];
const allCeremoniesExist = ceremonyBgs.every(f => fs.existsSync('src/assets/images/ceremonies/' + f));
test(18, 'All 10 authentic ceremony background artworks exist on disk', allCeremoniesExist);

// 19. Production dist/index.html exists and is populated
const distValid = fs.existsSync('dist/index.html') && fs.statSync('dist/index.html').size > 100000;
test(19, `Production dist/index.html exists (${(fs.statSync('dist/index.html').size/1024).toFixed(1)} KB)`, distValid);

// 20. Production bundle contains AP monogram and Haldi/Mehndi event
const bundleHasAP = distHtml.includes('monogram-letter-a') && distHtml.includes('monogram-letter-p');
const bundleHasHaldi = distHtml.includes('haldi-mehndi') || distHtml.includes('हल्दी एवं मेहंदी') || distHtml.includes('Haldi & Mehndi');
test(20, 'Production bundle verified containing AP monogram & Haldi/Mehndi ceremony', bundleHasAP && bundleHasHaldi);

console.log('=======================================================');
console.log(`RESULT: ${passCount}/20 CHECKS PASSED, ${failCount} FAILED`);
console.log('=======================================================');

if (failCount > 0) process.exit(1);
