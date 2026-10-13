/**
 * =====================================================================
 * Abhishek & Priyanshi — Wedding Invitation Configuration
 * =====================================================================
 * All couple details, wedding dates, event itineraries, photographs,
 * and text are centralized here. Edit this file to customize any aspect
 * of the wedding invitation. Placeholders are clearly marked.
 */

// Import image assets directly so Vite bundles them with correct relative paths for GitHub Pages & Vercel
import bubbleCouple from "../assets/images/bubble_couple.png";
import heroCouple from "../assets/images/hero_couple.jpg";
import storyOne from "../assets/images/story_one.jpg";
import storyTwo from "../assets/images/story_two.jpg";
import galleryHaldi from "../assets/images/gallery_haldi.jpg";
import gallerySangeet from "../assets/images/gallery_sangeet.jpg";
import galleryVivah from "../assets/images/gallery_vivah.jpg";
import galleryMandap from "../assets/images/gallery_mandap.jpg";
import galleryReception from "../assets/images/gallery_reception.jpg";
import sliding01 from "../assets/images/sliding_01.jpg";
import sliding02 from "../assets/images/sliding_02.jpg";
import sliding03 from "../assets/images/sliding_03.jpg";
import sliding04 from "../assets/images/sliding_04.jpg";
import sliding05 from "../assets/images/sliding_05.jpg";
import sliding06 from "../assets/images/sliding_06.jpg";
import sliding07 from "../assets/images/sliding_07.jpg";

export const weddingConfig = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Abhishek",
      fullName: "Abhishek Pal",
      parentsPlaceholder: "[Son of Mr. & Mrs. Pal]", // Editable parent placeholder
    },
    bride: {
      firstName: "Priyanshi",
      fullName: "Priyanshi Sharma",
      parentsPlaceholder: "[Daughter of Mr. & Mrs. Sharma]", // Editable parent placeholder
    },
    monogram: "AP",
    hashtag: "#AbhiWedsPriyanshi",
    secondaryHashtag: "#AbhiKiPriya",
  },

  // Main Wedding Date & Schedule
  weddingDate: {
    iso: "2026-12-12T18:00:00+05:30", // Used for live countdown & Google Calendar
    displayDay: "12",
    displayMonth: "December",
    displayYear: "2026",
    displayWeekday: "Saturday",
    timePlaceholder: "Baraat 6:00 PM · Shubh Vivah Muhurat",
    venuePlaceholder: "Srishti Club",
    fullLocationPlaceholder: "Srishti Club, AB Road",
    mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
    googleMapsSearchQuery: "Srishti Club",
  },

  // Celestial Intro Screen Configuration
  intro: {
    badgeText: "WEDDING INVITATION",
    monogramSeal: "AP",
    enterButtonText: "Open Our Invitation",
    enterSubtext: "Click to enter our celebration",
    hintText: "✦ move to scatter starlight · click to enter ✦",
    centralPhoto: bubbleCouple,
    // Orbital floating framed photographs (10 frames at varying parallax depths)
    orbitalFrames: [
      { id: 1, src: sliding02, depth: 0.55, tilt: "-4deg", delay: "0s", posVar: "--at-a" },
      { id: 2, src: sliding03, depth: 0.8, tilt: "3.4deg", delay: "-2.1s", posVar: "--at-b" },
      { id: 3, src: sliding01, depth: 1.1, tilt: "-3deg", delay: "-3.6s", posVar: "--at-c" },
      { id: 4, src: galleryHaldi, depth: 1.45, tilt: "4deg", delay: "-5.2s", posVar: "--at-d" },
      { id: 5, src: sliding05, depth: 1.8, tilt: "-2.4deg", delay: "-6.8s", posVar: "--at-e" },
      { id: 6, src: sliding06, depth: 2.2, tilt: "3.2deg", delay: "-1.4s", posVar: "--at-f" },
      { id: 7, src: galleryMandap, depth: 2.7, tilt: "-4.4deg", delay: "-8.3s", posVar: "--at-g" },
      { id: 8, src: sliding07, depth: 3.2, tilt: "2.2deg", delay: "-4.6s", posVar: "--at-h" },
      { id: 9, src: sliding04, depth: 3.8, tilt: "-3.6deg", delay: "-7.7s", posVar: "--at-i" },
      { id: 10, src: storyTwo, depth: 4.4, tilt: "3.8deg", delay: "-3s", posVar: "--at-j" },
    ],
  },

  // Hero Section
  hero: {
    subtitle: "Together with our families, we invite you to celebrate our wedding",
    shlokaSanskrit: "माङ्गल्यं तन्तुनानेन लोकभवनाय च । गृह्णामि सुभगे कण्ठे बधान चिरजीवितम् ॥",
    shlokaTranslation: "Bound by sacred vows and love divine, two souls begin their timeless journey as one.",
    shlokaSource: "Vedic Vivah Mangal Shloka",
  },

  // Save the Date / Envelope Reveal Section
  saveTheDate: {
    eyebrow: "The Royal Unveiling",
    title: "Save Our Date",
    hintBeforeReveal: "Touch the royal seal to open the golden invitation and begin the countdown",
    envelopeText: "Tap to Unveil Royal Invitation",
    envelopeHint: "A Sacred Celebration Awaits",
    ceremonyTitle: "Baraat & Shubh Vivah",
    buttonItinerary: "View Complete Itinerary",
  },

  // Our Story ("A Promise Kept")
  story: {
    eyebrow: "Our Journey",
    title: "A Promise Kept",
    quote: "“Two souls with but a single thought, two hearts that beat as one.”",
    milestones: [
      "Years of companionship, laughter, and growing together",
      "Standing by each other's side through every high and low",
      "A sacred bond blessed by our families, elders, and destiny",
    ],
    closingMessage: "We are overjoyed to begin this new chapter together.",
    photo1: {
      src: storyOne,
      alt: "Abhishek & Priyanshi - Our First Chapter",
      caption: "A Promise Made",
    },
    photo2: {
      src: storyTwo,
      alt: "Abhishek & Priyanshi - Wedding Day",
      caption: "A Promise Kept",
    },
  },

  // Formal Invitation Card
  formalCard: {
    sacredInvocation: "॥ श्री गणेशाय नमः ॥",
    title: "Wedding Invitation",
    hostIntroText: "Together with our families and the blessings of our elders,",
    familyNamesPlaceholder: "[Mr. & Mrs. Pal] & [Mr. & Mrs. Sharma]",
    cordialMessage: "cordially invite you to celebrate the joyous wedding of their beloved children",
    blessingQuote: "“May your journey be filled with wisdom, devotion, and boundless love.”",
    blessingCitation: "Seven Sacred Vows · Saptapadi",
    venuePlaceholder: "Srishti Club, AB Road",
    timingsPlaceholder: "11 Dec: Haldi, Mehendi & Sangeet · 12 Dec: Baraat & Shubh Vivah",
    contactPlaceholder: "Rahul Pal (7566125977) · Rohit Pal (8109123787) · Jitendra Sharma (8305158826)",
    contacts: [
      { name: "Rahul Pal", phone: "7566125977", tel: "+917566125977" },
      { name: "Rohit Pal", phone: "8109123787", tel: "+918109123787" },
      { name: "Jitendra Sharma", phone: "8305158826", tel: "+918305158826" },
    ],
    mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
  },

  // Contact & RSVP Direct Helplines
  contacts: [
    { name: "Rahul Pal", phone: "7566125977", tel: "+917566125977" },
    { name: "Rohit Pal", phone: "8109123787", tel: "+918109123787" },
    { name: "Jitendra Sharma", phone: "8305158826", tel: "+918305158826" },
  ],

  // Ceremony & Celebration Arch Cards (Full 5-Day Vedic & Traditional Itinerary)
  events: [
    {
      id: "khal-mitti",
      type: "khalmitti",
      titleHindi: "खल मिट्टी",
      title: "खल मिट्टी",
      subtitle: "Auspicious Soil Ceremony & Rituals",
      motif: "🪔 · 🌾 · 🪔",
      day: "08",
      month: "Dec",
      year: "2026",
      weekday: "Tuesday",
      weekdayHindi: "मंगलवार",
      time: "शाम 04:00 से 06:00 बजे तक",
      venuePlaceholder: "निज निवास",
      addressPlaceholder: "नाहार दरवाज़ा, पैंथर पैलेस, देवास",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nahar+Darwaza+Dewas",
      description: "मांगलिक वैवाहिक अनुष्ठान का पावन शुभारंभ - कुलदेवता के स्मरण व पवित्र मिट्टी लाने की पारंपरिक रस्म।",
      startIso: "2026-12-08T16:00:00+05:30",
      endIso: "2026-12-08T18:00:00+05:30",
    },
    {
      id: "mata-poojan-haldi",
      type: "haldi",
      titleHindi: "माता पूजन एवं हल्दी",
      title: "माता पूजन एवं हल्दी",
      subtitle: "Divine Blessings & Sacred Turmeric Ceremony",
      motif: "✺ · 🟡 · ✺",
      day: "09",
      month: "Dec",
      year: "2026",
      weekday: "Wednesday",
      weekdayHindi: "बुधवार",
      time: "प्रातः 10:00 से दोपहर 12:00 तक",
      venuePlaceholder: "निज निवास",
      addressPlaceholder: "नाहार दरवाज़ा, पैंथर पैलेस, देवास",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nahar+Darwaza+Dewas",
      description: "कुलदेवी व माता पूजन के शुभ अनुष्ठान के साथ वर को सुगंधित उबटन व पीली हल्दी का सौभाग्यशाली लेप।",
      startIso: "2026-12-09T10:00:00+05:30",
      endIso: "2026-12-09T12:00:00+05:30",
    },
    {
      id: "mandap",
      type: "mandap",
      titleHindi: "मंडप",
      title: "मंडप",
      subtitle: "Sacred Mandap Muhurat & Pillar Erection",
      motif: "🏛️ · 🌿 · 🏛️",
      day: "10",
      month: "Dec",
      year: "2026",
      weekday: "Thursday",
      weekdayHindi: "गुरुवार",
      time: "प्रातः 10:00 से दोपहर 01:00 तक",
      venuePlaceholder: "निज निवास",
      addressPlaceholder: "नाहार दरवाज़ा, पैंथर पैलेस, देवास",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nahar+Darwaza+Dewas",
      description: "वैदिक मंत्रोच्चार के साथ पावन विवाह मंडप का रोपण, कलश स्थापना व समस्त देवी-देवताओं का मंगल आह्वान।",
      startIso: "2026-12-10T10:00:00+05:30",
      endIso: "2026-12-10T13:00:00+05:30",
    },
    {
      id: "maayan-poojan",
      type: "poojan",
      titleHindi: "मायन पूजन",
      title: "मायन पूजन",
      subtitle: "Sacred Maayan Ritual & Family Blessings",
      motif: "🪔 · 🌸 · 🪔",
      day: "11",
      month: "Dec",
      year: "2026",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "प्रातः 08:00 से 10:00 तक",
      venuePlaceholder: "निज निवास",
      addressPlaceholder: "नाहार दरवाज़ा, पैंथर पैलेस, देवास",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nahar+Darwaza+Dewas",
      description: "परिवार व बुजुर्गों की उपस्थिति में होने वाला पावन मायन पूजन व मंगलमय आशीर्वाद।",
      startIso: "2026-12-11T08:00:00+05:30",
      endIso: "2026-12-11T10:00:00+05:30",
    },
    {
      id: "mamera",
      type: "mamera",
      titleHindi: "मामेरा",
      title: "मामेरा (भात)",
      subtitle: "Grand Welcoming of Maternal Uncles & Mayra",
      motif: "🎁 · 👑 · 🎁",
      day: "11",
      month: "Dec",
      year: "2026",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "दोपहर 01:00 से 03:00 तक",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "ननिहाल पक्ष का भव्य सत्कार, पारंपरिक मामेरा (भात) व स्नेहिल उपहारों के साथ मंगल आशीष।",
      startIso: "2026-12-11T13:00:00+05:30",
      endIso: "2026-12-11T15:00:00+05:30",
    },
    {
      id: "mahila-sangeet",
      type: "sangeet",
      titleHindi: "महिला संगीत",
      title: "महिला संगीत",
      subtitle: "Grand Musical Night, Folk Melodies & Dance",
      motif: "🪕 · 🎶 · 🪕",
      day: "11",
      month: "Dec",
      year: "2026",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "शाम 07:00 से रात्रि 11:00 तक",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "ढोलक की थाप, पारंपरिक लोकगीत, मनमोहक नृत्य प्रस्तुतियां व संगीत से सजी उल्लासपूर्ण शाम।",
      startIso: "2026-12-11T19:00:00+05:30",
      endIso: "2026-12-11T23:00:00+05:30",
    },
    {
      id: "sagai",
      type: "sagai",
      titleHindi: "सगाई",
      title: "सगाई समारोह",
      subtitle: "Royal Ring Ceremony & Family Union",
      motif: "💍 · ✨ · 💍",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "प्रातः 11:00 से दोपहर 02:00 तक",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "वर-वधू द्वारा अंगूठी विनिमय व दोनों परिवारों का परस्पर स्नेह-मिलन, शुभ शगुन व भोज।",
      startIso: "2026-12-12T11:00:00+05:30",
      endIso: "2026-12-12T14:00:00+05:30",
    },
    {
      id: "var-nikasi",
      type: "baraat",
      titleHindi: "वर निकासी",
      title: "वर निकासी",
      subtitle: "Grand Royal Baraat Procession",
      motif: "🐎 · 🎺 · 🥁",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "शाम 04:00 बजे",
      venuePlaceholder: "नाहार दरवाज़ा पैंथर पैलेस ➔ सृष्टि रिसॉर्ट्स",
      addressPlaceholder: "निज निवास से सृष्टि रिसॉर्ट्स एंड क्लब देवास जावेगी",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "शाम 04:00 बजे निज निवास- नाहार दरवाज़ा पैंथर पैलेस से सृष्टि रिसॉर्ट्स एंड क्लब देवास जावेगी।",
      startIso: "2026-12-12T16:00:00+05:30",
      endIso: "2026-12-12T19:00:00+05:30",
    },
    {
      id: "shubh-vivah",
      type: "matrimony",
      titleHindi: "शुभलग्न एवं पाणिग्रहण",
      title: "शुभलग्न एवं पाणिग्रहण",
      subtitle: "Sacred Vedic Vivah, Saptapadi & Seven Vows",
      motif: "ॐ · 卐 · 🔥",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "मध्य रात्रि (Auspicious Midnight Muhurat)",
      venuePlaceholder: "सृष्टि रिसॉर्ट्स एंड क्लब देवास",
      addressPlaceholder: "एबी रोड, देवास",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "पवित्र अग्नि को साक्षी मानकर वरमाला, वैदिक पाणिग्रहण संस्कार, सप्तपदी व सात फेरे सम्पन्न होंगे।",
      startIso: "2026-12-12T23:30:00+05:30",
      endIso: "2026-12-13T03:30:00+05:30",
    },
  ],

  // Gallery Section & Lightbox
  gallery: {
    eyebrow: "Cherished Chapters",
    title: "Our Journey In Frames",
    subtitle: "Every smile, every glance, and the moments we will treasure forever",
    itemsTrack1: [
      { src: sliding01, title: "Sliding Image 01", caption: "Sliding Image 01 — Abhishek & Priyanshi" },
      { src: sliding02, title: "Sliding Image 02", caption: "Sliding Image 02 — Abhishek & Priyanshi" },
      { src: sliding03, title: "Sliding Image 03", caption: "Sliding Image 03 — Abhishek & Priyanshi" },
      { src: sliding04, title: "Sliding Image 04", caption: "Sliding Image 04 — Abhishek & Priyanshi" },
      { src: sliding05, title: "Sliding Image 05", caption: "Sliding Image 05 — Abhishek & Priyanshi" },
      { src: sliding06, title: "Sliding Image 06", caption: "Sliding Image 06 — Abhishek & Priyanshi" },
      { src: sliding07, title: "Sliding Image 07", caption: "Sliding Image 07 — Abhishek & Priyanshi" },
    ],
    itemsTrack2: [
      { src: sliding04, title: "Sliding Image 04", caption: "Sliding Image 04 — Abhishek & Priyanshi" },
      { src: sliding05, title: "Sliding Image 05", caption: "Sliding Image 05 — Abhishek & Priyanshi" },
      { src: sliding06, title: "Sliding Image 06", caption: "Sliding Image 06 — Abhishek & Priyanshi" },
      { src: sliding07, title: "Sliding Image 07", caption: "Sliding Image 07 — Abhishek & Priyanshi" },
      { src: sliding01, title: "Sliding Image 01", caption: "Sliding Image 01 — Abhishek & Priyanshi" },
      { src: sliding02, title: "Sliding Image 02", caption: "Sliding Image 02 — Abhishek & Priyanshi" },
      { src: sliding03, title: "Sliding Image 03", caption: "Sliding Image 03 — Abhishek & Priyanshi" },
    ],
  },

  // Closing Section
  closing: {
    eyebrow: "WITH LOVE AND GRATITUDE",
    message: "Two hearts, one beautiful journey, and a lifetime waiting to begin.",
    quote: "“May your lives be entwined with joy, peace, and eternal devotion.”",
    footerCompliments: "With Best Compliments From Near & Dear Ones",
    backToTopText: "Back to Top",
  },

  // Audio / Music Settings
  audio: {
    src: "./music/wedding-song.mp3",
    defaultVolume: 0.5,
    title: "Romantic Wedding Melody",
  },
};
