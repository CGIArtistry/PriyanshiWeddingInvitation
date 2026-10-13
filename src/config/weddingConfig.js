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

  // Ceremony & Celebration Arch Cards
  events: [
    {
      id: "haldi-mehendi-sangeet",
      type: "haldi",
      title: "Haldi, Mehendi & Sangeet",
      subtitle: "A vibrant celebration of turmeric, fragrant henna & musical night",
      motif: "✺ · ✦ · ✺",
      day: "11",
      month: "Dec",
      year: "2026",
      weekday: "Friday",
      time: "Evening 4:00 PM Onwards",
      venuePlaceholder: "Srishti Club",
      addressPlaceholder: "AB Road, Dewas / Indore Bypass",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "Joyful turmeric blessings, fragrant henna ceremonies, traditional folk songs, and an electrifying musical evening of dance and feasts with family and friends.",
      startIso: "2026-12-11T16:00:00+05:30",
      endIso: "2026-12-11T23:30:00+05:30",
    },
    {
      id: "baraat-shubh-vivah",
      type: "matrimony",
      title: "Baraat & Shubh Vivah",
      subtitle: "Grand celebratory procession & seven sacred vows around the holy fire",
      motif: "ॐ · 卐 · ॐ",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      time: "Evening 6:00 PM (Baraat) · Auspicious Vivah Muhurat",
      venuePlaceholder: "Srishti Club",
      addressPlaceholder: "AB Road, Dewas / Indore Bypass",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      description: "The groom's celebratory baraat procession accompanied by joyous dhol beats, followed by Jayamala, sacred Vedic vivah sanskar, and Saptapadi solemnizing an eternal bond in the presence of loved ones.",
      startIso: "2026-12-12T18:00:00+05:30",
      endIso: "2026-12-13T01:00:00+05:30",
    },
  ],

  // Gallery Section & Lightbox
  gallery: {
    eyebrow: "Cherished Chapters",
    title: "Our Journey In Frames",
    subtitle: "Every smile, every glance, and the moments we will treasure forever",
    itemsTrack1: [
      { src: sliding02, title: "Endless Horizons", caption: "Walking into forever side by side under open skies" },
      { src: sliding01, title: "The Dashing Groom", caption: "Poised with style, grace, and quiet confidence" },
      { src: sliding03, title: "The Radiant Bride", caption: "Capturing beauty, wonder, and heartfelt moments" },
      { src: sliding04, title: "Chapters of Love", caption: "Every verse of life is sweeter shared together" },
      { src: galleryHaldi, title: "Vibrant Haldi", caption: "Laughter, marigolds, and pure celebration" },
      { src: gallerySangeet, title: "Twinkling Sangeet", caption: "Dancing under a canopy of golden starlight" },
      { src: storyOne, title: "Golden Courtyard", caption: "Two hearts filled with warmth and gratitude" },
    ],
    itemsTrack2: [
      { src: sliding05, title: "Joy & Laughter", caption: "Playful laughter and infectious happiness" },
      { src: sliding06, title: "A Sacred Promise", caption: "Strength, devotion, and a bond for eternity" },
      { src: sliding07, title: "Winter Radiance", caption: "Warmth in the chill, glowing with grace" },
      { src: storyTwo, title: "Sweet Smiles", caption: "Joyful laughter and lifelong promises" },
      { src: galleryVivah, title: "Sacred Phere", caption: "Seven sacred vows sealed with holy fire" },
      { src: galleryMandap, title: "Royal Mandap", caption: "Surrounded by jasmine blossoms and love" },
      { src: galleryReception, title: "Twilight Glow", caption: "A majestic new beginning beneath palace domes" },
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
