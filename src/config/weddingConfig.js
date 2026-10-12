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
    iso: "2026-12-12T10:30:00+05:30", // Used for live countdown & Google Calendar
    displayDay: "12",
    displayMonth: "December",
    displayYear: "2026",
    displayWeekday: "Saturday",
    timePlaceholder: "[10:30 AM Auspicious Muhurat]",
    venuePlaceholder: "[Grand Royal Palace / Venue Name, City]",
    fullLocationPlaceholder: "[Grand Convention Centre, City, India]",
    googleMapsSearchQuery: "Grand Palace Hotel", // Fallback query until exact address is entered
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
      { id: 1, src: heroCouple, depth: 0.55, tilt: "-4deg", delay: "0s", posVar: "--at-a" },
      { id: 2, src: storyOne, depth: 0.8, tilt: "3.4deg", delay: "-2.1s", posVar: "--at-b" },
      { id: 3, src: storyTwo, depth: 1.1, tilt: "-3deg", delay: "-3.6s", posVar: "--at-c" },
      { id: 4, src: galleryHaldi, depth: 1.45, tilt: "4deg", delay: "-5.2s", posVar: "--at-d" },
      { id: 5, src: gallerySangeet, depth: 1.8, tilt: "-2.4deg", delay: "-6.8s", posVar: "--at-e" },
      { id: 6, src: galleryVivah, depth: 2.2, tilt: "3.2deg", delay: "-1.4s", posVar: "--at-f" },
      { id: 7, src: galleryMandap, depth: 2.7, tilt: "-4.4deg", delay: "-8.3s", posVar: "--at-g" },
      { id: 8, src: galleryReception, depth: 3.2, tilt: "2.2deg", delay: "-4.6s", posVar: "--at-h" },
      { id: 9, src: storyOne, depth: 3.8, tilt: "-3.6deg", delay: "-7.7s", posVar: "--at-i" },
      { id: 10, src: heroCouple, depth: 4.4, tilt: "3.8deg", delay: "-3s", posVar: "--at-j" },
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
    ceremonyTitle: "Holy Wedding Vivah",
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
    venuePlaceholder: "[Venue Name & Full Address To Be Announced]",
    timingsPlaceholder: "[10:30 AM onwards · Lunch & Reception to follow]",
    contactPlaceholder: "[RSVP & Queries: +91 98765 43210 / family@example.com]",
  },

  // Ceremony & Celebration Arch Cards
  events: [
    {
      id: "haldi-mehendi",
      type: "haldi",
      title: "Haldi & Mehendi",
      subtitle: "A vibrant celebration of turmeric, henna & songs",
      motif: "✺ · ✺ · ✺",
      day: "11",
      month: "Dec",
      year: "2026",
      weekday: "Friday",
      time: "Evening 4:00 PM Onwards",
      venuePlaceholder: "[Grand Banquet Gardens / Venue To Be Confirmed]",
      addressPlaceholder: "[Location details to be updated soon]",
      description: "Joyful turmeric blessings, fragrant henna designs, traditional folk songs, and high-spirited festivities with family and friends.",
      startIso: "2026-12-11T16:00:00+05:30",
      endIso: "2026-12-11T20:00:00+05:30",
    },
    {
      id: "baraat-sangeet",
      type: "betrothal",
      title: "Baraat & Sangeet",
      subtitle: "A grand musical evening of dance and joy",
      motif: "✦ · ✦ · ✦",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      time: "Evening 6:00 PM Onwards",
      venuePlaceholder: "[Grand Royal Palace / Venue To Be Confirmed]",
      addressPlaceholder: "[Venue address to be updated soon]",
      description: "The groom's celebratory baraat procession accompanied by dhol beats, followed by a glittering evening of music, dance performances, and feast.",
      startIso: "2026-12-12T18:00:00+05:30",
      endIso: "2026-12-12T23:30:00+05:30",
    },
    {
      id: "wedding-ceremony",
      type: "matrimony",
      title: "Holy Wedding Vivah",
      subtitle: "Seven sacred vows around the holy fire",
      motif: "ॐ · 卐 · ॐ",
      day: "12",
      month: "Dec",
      year: "2026",
      weekday: "Saturday",
      time: "Muhurat 10:30 AM Onwards",
      venuePlaceholder: "[Main Royal Convention Hall / Venue To Be Confirmed]",
      addressPlaceholder: "[Venue address to be updated soon]",
      description: "The sacred Vedic vivah sanskar, Jayamala, Mangalphera, and Saptapadi solemnizing an eternal bond in the presence of loved ones.",
      startIso: "2026-12-12T10:30:00+05:30",
      endIso: "2026-12-12T15:00:00+05:30",
    },
  ],

  // Gallery Section & Lightbox
  gallery: {
    eyebrow: "Cherished Chapters",
    title: "Our Journey In Frames",
    subtitle: "Every smile, every glance, and the moments we will treasure forever",
    itemsTrack1: [
      { src: heroCouple, title: "Misty Mornings", caption: "Walking into forever side by side in grace" },
      { src: storyOne, title: "Golden Courtyard", caption: "Two hearts filled with warmth and gratitude" },
      { src: galleryHaldi, title: "Vibrant Haldi", caption: "Laughter, marigolds, and pure celebration" },
      { src: storyTwo, title: "Sweet Smiles", caption: "Joyful laughter and lifelong promises" },
      { src: gallerySangeet, title: "Twinkling Night", caption: "Dancing under a canopy of golden starlight" },
    ],
    itemsTrack2: [
      { src: galleryVivah, title: "Sacred Phere", caption: "Seven sacred vows sealed with holy fire" },
      { src: galleryMandap, title: "Royal Mandap", caption: "Surrounded by jasmine blossoms and love" },
      { src: galleryReception, title: "Twilight Glow", caption: "A majestic new beginning beneath palace domes" },
      { src: bubbleCouple, title: "Eternal Love", caption: "The quiet magic of feeling completely at home" },
      { src: storyOne, title: "#AbhiWedsPriyanshi", caption: "A love story written in the stars" },
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
