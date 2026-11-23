/**
 * =====================================================================
 * Priyanshi & Abhishek — Wedding Invitation Configuration
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
import sliding08 from "../assets/images/sliding_08.png";
import sliding09 from "../assets/images/sliding_09.png";
import sliding10 from "../assets/images/sliding_10.png";
import sliding12 from "../assets/images/sliding_12.png";
import sliding13 from "../assets/images/sliding_13.png";
import weddingLogo from "../assets/images/wedding_logo.png";
import saveTheDateBg from "../assets/images/save_the_date_bg.jpg";

// Pre-wedding photoshoot images
import img0220 from "../assets/images/IMG_0220_A.jpg";
import img0232 from "../assets/images/IMG_0232_A.jpg";
import img0238 from "../assets/images/IMG_0238_A.jpg";
import img0263 from "../assets/images/IMG_0263_A.jpg";
import img0290 from "../assets/images/IMG_0290_A.jpg";
import img0309 from "../assets/images/IMG_0309_A.jpg";
import img0320 from "../assets/images/IMG_0320_A.jpg";
import img0353 from "../assets/images/IMG_0353_A.jpg";
import img0375 from "../assets/images/IMG_0375_A.jpg";
import img0402 from "../assets/images/IMG_0402_A.jpg";
import img0414 from "../assets/images/IMG_0414_A.jpg";
import img0451 from "../assets/images/IMG_0451_A.jpg";
import img0463 from "../assets/images/IMG_0463_A.jpg";
import img0474 from "../assets/images/IMG_0474_A.jpg";
import img0493 from "../assets/images/IMG_0493_A.jpg";
import img0508 from "../assets/images/IMG_0508_A.jpg";
import img0534 from "../assets/images/IMG_0534_A.jpg";
import img0585 from "../assets/images/IMG_0585_A1.jpg";
import img0601 from "../assets/images/IMG_0601_A.jpg";
import img0612 from "../assets/images/IMG_0612_A.jpg";
import img0648 from "../assets/images/IMG_0648_A.jpg";
import img0663 from "../assets/images/IMG_0663_A.jpg";
import img0669 from "../assets/images/IMG_0669_A1.jpg";
import img0703 from "../assets/images/IMG_0703_A.jpg";
import img0777 from "../assets/images/IMG_0777_A.jpg";
import imgE0381 from "../assets/images/IMG_E0381_A.jpg";
import imgE0570 from "../assets/images/IMG_E0570_A.jpg";
import imgE0586 from "../assets/images/IMG_E0586_A.jpg";
import imgE0827 from "../assets/images/IMG_E0827_A.jpg";
import imgE0927 from "../assets/images/IMG_E0927_A.jpg";
import imgP0001 from "../assets/images/IMG_P0001_A.jpg";
import imgP0002 from "../assets/images/IMG_P0002_A.jpg";
import imgP0003 from "../assets/images/IMG_P0003_A.jpg";

export const weddingConfig = {
  // Couple & Family Lineage
  couple: {
    groom: {
      firstName: "Abhishek",
      fullName: "Abhishek Pal",
      grandparentsLabel: "सुपौत्र",
      grandparents: "स्व. श्री बाबूलालजी पाल (पैंथर पहलवान) - श्रीमती पार्वती पाल",
      parentsLabel: "सुपुत्र",
      parents: "श्री मुकेश पाल - श्रीमती सुनीता पाल",
      parentsPlaceholder: "श्री मुकेश पाल - श्रीमती सुनीता पाल",
    },
    bride: {
      firstName: "Priyanshi",
      fullName: "Priyanshi Sharma",
      grandparentsLabel: "सुपौत्री",
      grandparents: "स्व. श्री दामोदर प्रसाद जी शर्मा - स्व. श्रीमती कमलादेवी शर्मा",
      parentsLabel: "सुपुत्री",
      parents: "श्री जितेंद्र शर्मा - श्रीमती सीमा शर्मा",
      parentsPlaceholder: "श्री जितेंद्र शर्मा - श्रीमती सीमा शर्मा",
    },
    monogram: "AP",
    hashtag: "#AbhiAnshi",
    secondaryHashtag: "#AbhiAnshi",
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
      { id: 1, src: img0220, depth: 0.55, tilt: "-4deg", delay: "0s", posVar: "--at-a" },
      { id: 2, src: img0232, depth: 0.8, tilt: "3.4deg", delay: "-2.1s", posVar: "--at-b" },
      { id: 3, src: img0238, depth: 1.1, tilt: "-3deg", delay: "-3.6s", posVar: "--at-c" },
      { id: 4, src: img0263, depth: 1.45, tilt: "4deg", delay: "-5.2s", posVar: "--at-d" },
      { id: 5, src: img0290, depth: 1.8, tilt: "-2.4deg", delay: "-6.8s", posVar: "--at-e" },
      { id: 6, src: img0309, depth: 2.2, tilt: "3.2deg", delay: "-1.4s", posVar: "--at-f" },
      { id: 7, src: img0320, depth: 2.7, tilt: "-4.4deg", delay: "-8.3s", posVar: "--at-g" },
      { id: 8, src: img0353, depth: 3.2, tilt: "2.2deg", delay: "-4.6s", posVar: "--at-h" },
      { id: 9, src: img0375, depth: 3.8, tilt: "-3.6deg", delay: "-7.7s", posVar: "--at-i" },
      { id: 10, src: imgP0001, depth: 4.4, tilt: "3.8deg", delay: "-3s", posVar: "--at-j" },
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
    envelopeText: "Tap to unveil the invitation",
    envelopeHint: "A Sacred Celebration Awaits",
    ceremonyTitle: "Baraat & Shubh Vivah",
    buttonItinerary: "View Complete Itinerary",
    logo: weddingLogo,
    bgImage: saveTheDateBg,
  },

  // Our Story ("A Promise Kept")
  story: {
    eyebrow: "Our Journey",
    title: "A Promise Kept",
    quote: "“Two souls but a single thought, two hearts that beat as one.”",
    milestones: [
      "Years of companionship, laughter, and growing together",
      "Standing by each other's side through every high and low",
      "A sacred bond blessed by our families, elders, and destiny",
    ],
    closingMessage: "We are overjoyed to begin this new chapter together.",
    photo1: {
      src: imgP0002,
      alt: "Priyanshi & Abhishek - Our First Chapter",
      caption: "A Promise Made",
    },
    photo2: {
      src: img0493,
      alt: "Priyanshi & Abhishek - Wedding Day",
      caption: "A Promise Kept",
    },
  },

  // Formal Invitation Card (Bilingual: Hindi & English)
  formalCard: {
    mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
    contacts: [
      { name: "Jitendra Sharma", phone: "8305158826", tel: "+918305158826" },
      { name: "Rahul Pal", phone: "7566125977", tel: "+917566125977" },
      { name: "Rohit Pal", phone: "8109123787", tel: "+918109123787" },
    ],
    // 1. Traditional Hindi Version
    hi: {
      sacredInvocation: "॥ श्री गणेशाय नमः ॥",
      title: "विवाह निमंत्रण",
      hostIntroText: "परम पूज्य कुलदेवता एवं पूर्वजों के असीम आशीर्वाद से,",
      familyNames: "शर्मा एवं पाल परिवार",
      cordialMessage: "सादर एवं सस्नेह आपको अपनी प्रिय बिटिया एवं सुपुत्र के पावन वैवाहिक उत्सव में आमंत्रित करते हैं",
      groomSideTag: "वर पक्ष · Groom's Side",
      groomName: "अभिषेक पाल",
      groomGrandparentsLabel: "सुपौत्र",
      groomGrandparents: "स्व. श्री बाबूलालजी पाल (पैंथर पहलवान) - श्रीमती पार्वती पाल",
      groomParentsLabel: "सुपुत्र",
      groomParents: "श्री मुकेश पाल - श्रीमती सुनीता पाल",
      brideSideTag: "वधू पक्ष · Bride's Side",
      brideName: "प्रियांशी शर्मा",
      brideGrandparentsLabel: "सुपौत्री",
      brideGrandparents: "स्व. श्री दामोदर प्रसाद जी शर्मा - स्व. श्रीमती कमलादेवी शर्मा",
      brideParentsLabel: "सुपुत्री",
      brideParents: "श्री जितेंद्र शर्मा - श्रीमती सीमा शर्मा",
      wedsLigature: "संग",
      wedsSub: "",
      dateLabel: "शुभ विवाह तिथि",
      dateVal: "शनिवार, 12 दिसम्बर 2026",
      timingsLabel: "मांगलिक कार्यक्रम",
      timingsVal: "10 से 12 दिसम्बर 2026 · समस्त मांगलिक उत्सव",
      venueLabel: "विवाह स्थल",
      venueVal: "सृष्टि रिसॉर्ट एंड क्लब, एबी रोड, देवास",
      contactLabel: "सम्पर्क एवं दर्शनाभिलाषी",
      blessingQuote: "“माङ्गल्यं तन्तुनानेन लोकभवनाय च । गृह्णामि सुभगे कण्ठे बधान चिरजीवितम् ॥”",
      blessingCitation: "वैदिक विवाह मंगल श्लोक · सप्तपदी",
    },
    // 2. Elegant English Version
    en: {
      sacredInvocation: "॥ Om Shri Ganeshaya Namah ॥",
      title: "Wedding Invitation",
      hostIntroText: "Together with the divine blessings of our ancestors, elders, and families,",
      familyNames: "The Sharma & Pal Families",
      cordialMessage: "cordially invite you to celebrate the joyous wedding ceremony of their beloved daughter & son",
      groomSideTag: "Groom's Family",
      groomName: "Abhishek Pal",
      groomGrandparentsLabel: "Grandson of",
      groomGrandparents: "Late Shri Babulalji Pal (Panther Pahalwan) & Smt. Parvati Pal",
      groomParentsLabel: "Son of",
      groomParents: "Shri Mukesh Pal & Smt. Sunita Pal",
      brideSideTag: "Bride's Family",
      brideName: "Priyanshi Sharma",
      brideGrandparentsLabel: "Granddaughter of",
      brideGrandparents: "Late Shri Damodar Prasad Ji Sharma & Late Smt. Kamladevi Sharma",
      brideParentsLabel: "Daughter of",
      brideParents: "Shri Jitendra Sharma & Smt. Seema Sharma",
      wedsLigature: "Weds",
      wedsSub: "",
      dateLabel: "Wedding Date",
      dateVal: "Saturday, 12 December 2026",
      timingsLabel: "Ceremony Schedule",
      timingsVal: "10 to 12 December 2026 · Auspicious Ceremonies",
      venueLabel: "Wedding Venue",
      venueVal: "Srishti Resort & Club, AB Road, Dewas",
      contactLabel: "Contact & RSVP",
      blessingQuote: "“Bound by sacred vows and love divine, two souls begin their timeless journey as one.”",
      blessingCitation: "Seven Sacred Vows · Vedic Saptapadi",
    },
  },

  // Contact & RSVP Direct Helplines
  contacts: [
    { name: "Jitendra Sharma", phone: "8305158826", tel: "+918305158826" },
    { name: "Rahul Pal", phone: "7566125977", tel: "+917566125977" },
    { name: "Rohit Pal", phone: "8109123787", tel: "+918109123787" },
  ],

  // Ceremony Section Config (Bilingual)
  eventsSection: {
    hi: {
      badge: "मांगलिक क्षण · वैवाहिक कार्यक्रम",
      title: "मांगलिक उत्सव एवं कार्यक्रम",
      intro: "10 से 12 दिसम्बर 2026 · समस्त मांगलिक आयोजनों में आपकी गरिमामयी उपस्थिति प्रार्थनीय है",
      saveTheDateTag: "शुभ तिथि",
      viewMap: "गूगल मैप देखें",
      addToCalendar: "कैलेंडर में जोड़ें",
      dayTabs: [
        { id: "all", label: "सभी", sub: "समस्त 9 कार्यक्रम" },
        { id: "10", label: "10 दिस", sub: "गणेश व माता पूजन" },
        { id: "11", label: "11 दिस", sub: "मंडप · मामेरा · हल्दी/मेहंदी · संगीत" },
        { id: "12", label: "12 दिस", sub: "सगाई · बारात · स्वरुचिभोज · विवाह" },
      ],
    },
    en: {
      badge: "Sacred Moments · Ceremony Schedule",
      title: "Ceremony & Celebrations",
      intro: "10 to 12 December 2026 · We cordially invite you to celebrate our sacred wedding ceremonies",
      saveTheDateTag: "Save The Date",
      viewMap: "View Map",
      addToCalendar: "Add To Calendar",
      dayTabs: [
        { id: "all", label: "All Events", sub: "All 9 Ceremonies" },
        { id: "10", label: "10 Dec", sub: "Ganesh & Mata Poojan" },
        { id: "11", label: "11 Dec", sub: "Mandap · Mamera · Haldi/Mehndi · Sangeet" },
        { id: "12", label: "12 Dec", sub: "Sagai · Baraat · Reception · Vivah" },
      ],
    },
  },

  // Ceremony & Celebration Arch Cards (Full 5-Day Vedic & Traditional Itinerary)
  events: [
    {
      id: "mata-poojan",
      type: "poojan",
      day: "10",
      month: "Dec",
      year: "2026",
      motif: "🪔 · 🌸 · 🪔",
      startIso: "2026-12-10T10:00:00+05:30",
      endIso: "2026-12-10T15:00:00+05:30",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Manglaj+Shajapur",
      hi: {
        title: "श्री गणेश एवं माता पूजन",
        subtitle: "श्री गणेश व कुलदेवी माता पूजन का पावन अनुष्ठान",
        weekday: "गुरुवार",
        month: "दिसम्बर",
        time: "प्रातः 10:00 से दोपहर 03:00 तक",
        venue: "निज निवास",
        address: "मंगलाज, जिला शाजापुर",
        description: "प्रथम पूज्य विघ्नहर्ता भगवान श्री गणेश एवं कुलदेवी माता पूजन के पावन अनुष्ठान के साथ समस्त देवी-देवताओं का मंगल आह्वान व आशीर्वाद।",
        saveTheDateTag: "गुरुवार · गणेश एवं माता पूजन",
      },
      en: {
        title: "Shri Ganesh & Mata Poojan",
        subtitle: "Divine Blessings of Lord Ganesha & Kuldevi Mata",
        weekday: "Thursday",
        month: "Dec",
        time: "10:00 AM to 03:00 PM",
        venue: "Home Residence",
        address: "Manglaj, District Shajapur",
        description: "Invoking the divine blessings of Lord Ganesha and Kuldevi Mata for an auspicious beginning to the sacred wedding ceremonies.",
        saveTheDateTag: "Thursday · Ganesh & Mata Poojan",
      },
      titleHindi: "श्री गणेश एवं माता पूजन",
      title: "श्री गणेश एवं माता पूजन",
      subtitle: "Divine Blessings of Lord Ganesha & Sacred Poojan",
      weekday: "Thursday",
      weekdayHindi: "गुरुवार",
      time: "प्रातः 10:00 से दोपहर 03:00 तक",
      venuePlaceholder: "निज निवास",
      addressPlaceholder: "मंगलाज, जिला शाजापुर",
      description: "प्रथम पूज्य विघ्नहर्ता भगवान श्री गणेश एवं कुलदेवी माता पूजन के पावन अनुष्ठान के साथ समस्त देवी-देवताओं का मंगल आह्वान व आशीर्वाद।",
    },
    {
      id: "mandap",
      type: "mandap",
      day: "11",
      month: "Dec",
      year: "2026",
      motif: "🏛️ · 🌿 · 🏛️",
      startIso: "2026-12-11T11:00:00+05:30",
      endIso: "2026-12-11T14:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "मंडप",
        subtitle: "मंडप मुहूर्त, रोपण एवं कलश स्थापना",
        weekday: "शुक्रवार",
        month: "दिसम्बर",
        time: "प्रातः 11:00 बजे से",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "वैदिक मंत्रोच्चार के साथ पावन विवाह मंडप का रोपण, कलश स्थापना व समस्त देवी-देवताओं का मंगल आह्वान।",
        saveTheDateTag: "शुक्रवार · मंडप मुहूर्त",
      },
      en: {
        title: "Mandap Muhurat",
        subtitle: "Sacred Mandap Erection & Kalash Sthapana",
        weekday: "Friday",
        month: "Dec",
        time: "11:00 AM onwards",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "Ceremonial erection of the holy wedding canopy (Mandap) and Kalash invocation with Vedic chants to bless the auspicious union.",
        saveTheDateTag: "Friday · Mandap Ceremony",
      },
      titleHindi: "मंडप",
      title: "मंडप",
      subtitle: "Sacred Mandap Muhurat & Pillar Erection",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "प्रातः 11:00 बजे से",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "वैदिक मंत्रोच्चार के साथ पावन विवाह मंडप का रोपण, कलश स्थापना व समस्त देवी-देवताओं का मंगल आह्वान।",
    },
    {
      id: "mamera",
      type: "mamera",
      day: "11",
      month: "Dec",
      year: "2026",
      motif: "🎁 · 👑 · 🎁",
      startIso: "2026-12-11T13:00:00+05:30",
      endIso: "2026-12-11T16:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "मामेरा",
        subtitle: "ननिहाल पक्ष का भव्य सत्कार व मामेरा रस्म",
        weekday: "शुक्रवार",
        month: "दिसम्बर",
        time: "दोपहर 01:00 बजे से",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "ननिहाल पक्ष का भव्य सत्कार, पारंपरिक मामेरा व स्नेहिल उपहारों के साथ मंगल आशीष।",
        saveTheDateTag: "शुक्रवार · मामेरा रस्म",
      },
      en: {
        title: "Mamera",
        subtitle: "Grand Welcoming of Maternal Uncles & Mamera",
        weekday: "Friday",
        month: "Dec",
        time: "01:00 PM onwards",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "The grand welcoming of maternal uncles (Mama Ji), bestowing auspicious Mamera gifts, festive garments, and loving blessings.",
        saveTheDateTag: "Friday · Mamera Ceremony",
      },
      titleHindi: "मामेरा",
      title: "मामेरा",
      subtitle: "Grand Welcoming of Maternal Uncles & Mamera",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "दोपहर 01:00 बजे से",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "ननिहाल पक्ष का भव्य सत्कार, पारंपरिक मामेरा व स्नेहिल उपहारों के साथ मंगल आशीष।",
    },
    {
      id: "haldi-mehndi",
      type: "haldi",
      day: "11",
      month: "Dec",
      year: "2026",
      motif: "🌿 · 💛 · 🌿",
      startIso: "2026-12-11T16:00:00+05:30",
      endIso: "2026-12-11T19:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "हल्दी एवं मेहंदी",
        subtitle: "उल्लासपूर्ण हल्दी एवं मेहंदी रस्म",
        weekday: "शुक्रवार",
        month: "दिसम्बर",
        time: "शाम 04:00 बजे से",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "सौभाग्य, स्नेह व सतरंगी खुशियों के संग पावन हल्दी व मेहंदी का मनोहारी उत्सव।",
        saveTheDateTag: "शुक्रवार · हल्दी एवं मेहंदी",
      },
      en: {
        title: "Haldi & Mehndi",
        subtitle: "Vibrant Haldi Ceremony & Festive Henna Adornment",
        weekday: "Friday",
        month: "Dec",
        time: "04:00 PM onwards",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "An auspicious celebration of golden turmeric blessings and intricate festive henna adornment with family and loved ones.",
        saveTheDateTag: "Friday · Haldi & Mehndi",
      },
      titleHindi: "हल्दी एवं मेहंदी",
      title: "हल्दी एवं मेहंदी",
      subtitle: "Vibrant Haldi & Festive Mehndi Celebration",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "शाम 04:00 बजे से",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "सौभाग्य, स्नेह व सतरंगी खुशियों के संग पावन हल्दी व मेहंदी का मनोहारी उत्सव।",
    },
    {
      id: "mahila-sangeet",
      type: "sangeet",
      day: "11",
      month: "Dec",
      year: "2026",
      motif: "🪕 · 🎶 · 🪕",
      startIso: "2026-12-11T19:00:00+05:30",
      endIso: "2026-12-11T23:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "महिला संगीत",
        subtitle: "संगीत एवं नृत्योत्सव की शाम",
        weekday: "शुक्रवार",
        month: "दिसम्बर",
        time: "शाम 07:00 बजे से",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "ढोलक की थाप, पारंपरिक लोकगीत, मनमोहक नृत्य प्रस्तुतियां व संगीत से सजी उल्लासपूर्ण शाम।",
        saveTheDateTag: "शुक्रवार · संगीतमय शाम",
      },
      en: {
        title: "Mahila Sangeet",
        subtitle: "Grand Musical Night, Folk Melodies & Dance",
        weekday: "Friday",
        month: "Dec",
        time: "07:00 PM onwards",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "An evening filled with vibrant folk melodies, dholak rhythms, energetic dance choreography, and celebration.",
        saveTheDateTag: "Friday · Sangeet Celebration",
      },
      titleHindi: "महिला संगीत",
      title: "महिला संगीत",
      subtitle: "Grand Musical Night, Folk Melodies & Dance",
      weekday: "Friday",
      weekdayHindi: "शुक्रवार",
      time: "शाम 07:00 बजे से",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "ढोलक की थाप, पारंपरिक लोकगीत, मनमोहक नृत्य प्रस्तुतियां व संगीत से सजी उल्लासपूर्ण शाम।",
    },
    {
      id: "sagai",
      type: "sagai",
      day: "12",
      month: "Dec",
      year: "2026",
      motif: "💍 · ✨ · 💍",
      startIso: "2026-12-12T11:00:00+05:30",
      endIso: "2026-12-12T14:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "सगाई समारोह",
        subtitle: "वर-वधू अंगूठी विनिमय एवं स्नेह-मिलन",
        weekday: "शनिवार",
        month: "दिसम्बर",
        time: "प्रातः 11:00 बजे से",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "वर-वधू द्वारा अंगूठी विनिमय व दोनों परिवारों का परस्पर स्नेह-मिलन, शुभ शगुन व भोज।",
        saveTheDateTag: "शनिवार · सगाई समारोह",
      },
      en: {
        title: "Ring Ceremony (Sagai)",
        subtitle: "Sacred Ring Exchange & Formal Family Union",
        weekday: "Saturday",
        month: "Dec",
        time: "11:00 AM onwards",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "Priyanshi and Abhishek exchange engagement rings sealing their bond, followed by celebratory shagun and a royal feast.",
        saveTheDateTag: "Saturday · Ring Ceremony",
      },
      titleHindi: "सगाई",
      title: "सगाई समारोह",
      subtitle: "Royal Ring Ceremony & Family Union",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "प्रातः 11:00 बजे से",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "वधू-वर द्वारा अंगूठी विनिमय व दोनों परिवारों का परस्पर स्नेह-मिलन, शुभ शगुन व भोज।",
    },
    {
      id: "baraat-swagat",
      type: "baraat",
      day: "12",
      month: "Dec",
      year: "2026",
      motif: "🐎 · 🎺 · 🥁",
      startIso: "2026-12-12T18:00:00+05:30",
      endIso: "2026-12-12T20:00:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "बारात स्वागत",
        subtitle: "शाही बारात का भव्य स्वागत एवं अगवानी",
        weekday: "शनिवार",
        month: "दिसम्बर",
        time: "शाम 06:00 बजे",
        venue: "सृष्टि रिसॉर्ट्स एंड क्लब, देवास",
        address: "सृष्टि रिसॉर्ट्स एंड क्लब देवास में बारात अगवानी",
        description: "वर पक्ष की शाही बारात का सृष्टि रिसॉर्ट्स एंड क्लब देवास में भव्य स्वागत, अगवानी एवं सत्कार।",
        saveTheDateTag: "शनिवार · बारात स्वागत",
      },
      en: {
        title: "Baraat Swagat",
        subtitle: "Royal Baraat Procession & Grand Swagat",
        weekday: "Saturday",
        month: "Dec",
        time: "06:00 PM Onwards",
        venue: "Srishti Resort & Club, Dewas",
        address: "Grand Baraat Welcoming at Srishti Resort & Club, Dewas",
        description: "Grand welcoming and reception of groom Abhishek and the royal Baraat procession with celebratory music and flower shower at Srishti Resort & Club.",
        saveTheDateTag: "Saturday · Baraat Swagat",
      },
      titleHindi: "बारात स्वागत",
      title: "बारात स्वागत",
      subtitle: "Grand Royal Baraat Welcoming & Swagat",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "शाम 06:00 बजे",
      venuePlaceholder: "सृष्टि रिसॉर्ट्स एंड क्लब, देवास",
      addressPlaceholder: "सृष्टि रिसॉर्ट्स एंड क्लब देवास में बारात अगवानी",
      description: "वर पक्ष की शाही बारात का सृष्टि रिसॉर्ट्स एंड क्लब देवास में भव्य स्वागत, अगवानी एवं सत्कार।",
    },
    {
      id: "varmala-reception",
      type: "reception",
      day: "12",
      month: "Dec",
      year: "2026",
      motif: "🌸 · 🍽️ · 🌸",
      startIso: "2026-12-12T19:00:00+05:30",
      endIso: "2026-12-12T23:59:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "वरमाला एवं स्वरुचिभोज",
        subtitle: "भव्य वरमाला समारोह एवं स्वरुचिभोज",
        weekday: "शनिवार",
        month: "दिसम्बर",
        time: "समय शाम 7 से आपके आगमन तक",
        venue: "सृष्टि रिसॉर्ट एंड क्लब",
        address: "एबी रोड, देवास",
        description: "वर-वधू का पावन वरमाला समारोह एवं स्वरुचिभोज। आप सभी सपरिवार सादर आमंत्रित हैं।",
        saveTheDateTag: "शनिवार · वरमाला एवं स्वरुचिभोज",
      },
      en: {
        title: "Reception",
        subtitle: "Varmala Ceremony & Royal Wedding Feast",
        weekday: "Saturday",
        month: "Dec",
        time: "07:00 PM onwards (Till your arrival)",
        venue: "Srishti Resort & Club",
        address: "AB Road, Dewas",
        description: "Grand Varmala garland ceremony followed by a celebratory wedding dinner reception to welcome and bless the newlyweds.",
        saveTheDateTag: "Saturday · Reception",
      },
      titleHindi: "वरमाला एवं स्वरुचिभोज",
      title: "वरमाला एवं स्वरुचिभोज",
      subtitle: "Reception & Varmala Feast",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "समय शाम 7 से आपके आगमन तक",
      venuePlaceholder: "सृष्टि रिसॉर्ट एंड क्लब",
      addressPlaceholder: "एबी रोड, देवास",
      description: "वर-वधू का पावन वरमाला समारोह एवं सस्नेह स्वरुचिभोज।",
    },
    {
      id: "shubh-vivah",
      type: "matrimony",
      day: "12",
      month: "Dec",
      year: "2026",
      motif: "ॐ · 卐 · 🔥",
      startIso: "2026-12-12T23:30:00+05:30",
      endIso: "2026-12-13T03:30:00+05:30",
      mapUrl: "https://maps.app.goo.gl/Xyuxn4DUoihz3x1j7",
      hi: {
        title: "शुभलग्न एवं पाणिग्रहण संस्कार",
        subtitle: "सात फेरे, सप्तपदी एवं सिन्दूरदान",
        weekday: "शनिवार",
        month: "दिसम्बर",
        time: "मध्य रात्रि (शुभ लग्न मुहूर्त)",
        venue: "सृष्टि रिसॉर्ट्स एंड क्लब देवास",
        address: "एबी रोड, देवास",
        description: "पवित्र अग्नि को साक्षी मानकर वैदिक पाणिग्रहण संस्कार, सप्तपदी व सात फेरे सम्पन्न होंगे।",
        saveTheDateTag: "शनिवार · शुभ लग्न मुहूर्त",
      },
      en: {
        title: "Shubh Vivah & Paanigrahan",
        subtitle: "Sacred Vedic Vivah, Saptapadi & Seven Vows",
        weekday: "Saturday",
        month: "Dec",
        time: "Midnight (Auspicious Muhurat)",
        venue: "Srishti Resort & Club, Dewas",
        address: "AB Road, Dewas",
        description: "The sacred Vedic wedding rituals before Agni Deva, Hastamelap, and Seven Sacred Vows (Saptapadi).",
        saveTheDateTag: "Saturday · Wedding Ceremony",
      },
      titleHindi: "शुभलग्न एवं पाणिग्रहण",
      title: "शुभलग्न एवं पाणिग्रहण",
      subtitle: "Sacred Vedic Vivah, Saptapadi & Seven Vows",
      weekday: "Saturday",
      weekdayHindi: "शनिवार",
      time: "मध्य रात्रि (Auspicious Midnight Muhurat)",
      venuePlaceholder: "सृष्टि रिसॉर्ट्स एंड क्लब देवास",
      addressPlaceholder: "एबी रोड, देवास",
      description: "पवित्र अग्नि को साक्षी मानकर वैदिक पाणिग्रहण संस्कार, सप्तपदी व सात फेरे सम्पन्न होंगे।",
    },
  ],

  // Gallery Section & Lightbox
  gallery: {
    eyebrow: "Cherished Chapters",
    title: "Our Journey In Frames",
    subtitle: "Every smile, every glance, and the moments we will treasure forever",
    itemsTrack1: [
      { src: img0220, title: "Pre-Wedding Celebration", caption: "Priyanshi & Abhishek — Cherished Moments" },
      { src: img0232, title: "Timeless Togetherness", caption: "Priyanshi & Abhishek — Eternal Promise" },
      { src: img0238, title: "Endless Smiles", caption: "Priyanshi & Abhishek — Beautiful Journey" },
      { src: img0263, title: "Hand in Hand", caption: "Priyanshi & Abhishek — Forever Connected" },
      { src: img0290, title: "Romantic Serenade", caption: "Priyanshi & Abhishek — Two Hearts as One" },
      { src: img0309, title: "Golden Hour Glow", caption: "Priyanshi & Abhishek — Sunlit Romance" },
      { src: img0320, title: "Gaze of Love", caption: "Priyanshi & Abhishek — Silent Whispers" },
      { src: img0353, title: "Gentle Embrace", caption: "Priyanshi & Abhishek — Pure Affection" },
      { src: img0375, title: "Sacred Bond", caption: "Priyanshi & Abhishek — Blessed Journey" },
      { src: img0402, title: "Joyous Reverie", caption: "Priyanshi & Abhishek — Radiant Laughter" },
      { src: img0414, title: "Royal Elegance", caption: "Priyanshi & Abhishek — Majestic Harmony" },
      { src: img0451, title: "Sweet Companionship", caption: "Priyanshi & Abhishek — A Lifetime of Love" },
      { src: img0463, title: "Starlight Promise", caption: "Priyanshi & Abhishek — Under the Sky" },
      { src: img0474, title: "Serene Romance", caption: "Priyanshi & Abhishek — Peace and Love" },
      { src: img0493, title: "Vows of Tomorrow", caption: "Priyanshi & Abhishek — Our Forever" },
      { src: img0508, title: "Destined Together", caption: "Priyanshi & Abhishek — Written in Stars" },
      { src: img0534, title: "Warm Affection", caption: "Priyanshi & Abhishek — Heart to Heart" },
    ],
    itemsTrack2: [
      { src: img0585, title: "Cherished Promise", caption: "Priyanshi & Abhishek — Precious Memories" },
      { src: img0601, title: "Laughter and Light", caption: "Priyanshi & Abhishek — Boundless Joy" },
      { src: img0612, title: "Moments of Grace", caption: "Priyanshi & Abhishek — Tender Elegance" },
      { src: img0648, title: "Eternal Symphony", caption: "Priyanshi & Abhishek — Music of the Heart" },
      { src: img0663, title: "Whispering Breeze", caption: "Priyanshi & Abhishek — In Each Other's Arms" },
      { src: img0669, title: "Enchanted Twilight", caption: "Priyanshi & Abhishek — Magic in Twilight" },
      { src: img0703, title: "Radiant Journey", caption: "Priyanshi & Abhishek — Walking Together" },
      { src: img0777, title: "Infinite Devotion", caption: "Priyanshi & Abhishek — Unconditional Love" },
      { src: imgE0381, title: "Magic in the Air", caption: "Priyanshi & Abhishek — Dreams Come True" },
      { src: imgE0570, title: "Soulmate Connection", caption: "Priyanshi & Abhishek — Joined by Destiny" },
      { src: imgE0586, title: "Golden Horizon", caption: "Priyanshi & Abhishek — Beautiful Future" },
      { src: imgE0827, title: "Joy Unfolding", caption: "Priyanshi & Abhishek — Smiles of Forever" },
      { src: imgE0927, title: "Love's Gentle Touch", caption: "Priyanshi & Abhishek — Soft Whispers" },
      { src: imgP0001, title: "Beautiful Destiny", caption: "Priyanshi & Abhishek — Our New Beginning" },
      { src: imgP0002, title: "A Promise Made", caption: "Priyanshi & Abhishek — First Chapter" },
      { src: imgP0003, title: "A Promise Kept", caption: "Priyanshi & Abhishek — Timeless Union" },
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
