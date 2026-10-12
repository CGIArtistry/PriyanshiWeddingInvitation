# Abhishek & Priyanshi — Cinematic Wedding Invitation Website 💍✨

A complete, responsive, luxury wedding invitation website crafted for **Abhishek Pal & Priyanshi Sharma**, inspired by modern cinematic design aesthetics.

---

## 🌟 Key Highlights & Design Experience

1. **Cinematic Celestial Opening Scene**
   - Deep navy and midnight teal atmospheric gradient background.
   - Interactive starlight, sparkle snow, and particle canvases (`SparkleSnowCanvas`, `BubbleVeilCanvas`, `DrawingTrailCanvas`).
   - 10 floating orbital framed wedding photographs drifting with 3D parallax responsive to mouse / tilt.
   - Central breathing portal with golden wax seal monogram (**AP**).
   - "Open Our Invitation" central button triggering an ethereal full-screen light wash (`glow-transition`) into the invitation page.

2. **Main Hero Section**
   - Serene misty lake and sky backdrop with rising golden fireflies canvas.
   - Interactive Monogram badge (**AP**): tapping/hovering bursts with romantic hearts (`♥`) and gold sparkles (`✦`).
   - Calligraphic and Roman serif typography (`Alex Brush`, `Pinyon Script`, `Cinzel`).
   - Sacred Vedic Vivah Mangal Shloka with English translation.

3. **Save The Date & Live Dynamic Countdown**
   - Royal Envelope with Wax Seal (**AP**): tap to unveil triggers shimmering golden explosion and celebratory confetti!
   - Dynamic real-time countdown to **12 December 2026** calculating Days, Hours, Minutes, and Seconds (re-calculated every second, not hardcoded).
   - Radial cursor tracking illumination over the countdown card.
   - Instant **"Add to Calendar"** button generating a Google Calendar event dynamically.

4. **Our Story — "A Promise Kept"**
   - Warm ivory, peach, and soft gold editorial layout.
   - Overlapping Polaroid-style photo frames with realistic drop shadows, slight rotations (`-2.5°` and `+2.5°`), and 3D hover response.
   - Monogram stamp overlay (**AP**).
   - Poetic story prose and bulleted milestones.

5. **Wedding Photography Gallery & Lightbox**
   - Continuous horizontal editorial carousel tracks with bidirectional movement.
   - Touch drag and hover-pause support.
   - Click to open **Full Lightbox Modal** with high-res photo, titles, romantic captions, previous/next buttons, close control, and keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).

6. **Traditional Formal Invitation Card**
   - Centered royal card with fine dashed golden border.
   - Traditional Sanskrit Invocation (*॥ श्री गणेशाय नमः ॥*).
   - Clearly marked editable placeholders for family names, bride and groom details, muhurat timings, venue, and contact numbers.

7. **Ceremony & Celebration Arch Cards**
   - Three distinctively styled tall arched cards (`border-radius: 190px 190px 32px 32px`):
     - **Haldi & Mehendi**: Saffron & warm marigold yellow with folk celebration details.
     - **Baraat & Sangeet**: Champagne, cream, and shimmering gold.
     - **Holy Wedding Vivah (Phere)**: Deep royal burgundy and muted gold with sacred vows narrative.
   - Each card includes date badges, time pill badges, a **"View Location"** Google Maps link, and an individual **"Add To Calendar"** button.

8. **Warm Wishes & RSVP Form**
   - Refined guest response form with guest name, attendance status, number of guests, and blessing notes.
   - Interactive submission feedback with instant confirmation toast.

9. **Heavenly Finale & Floating Controls**
   - Closing celestial gradient with rising twinkling stars canvas (`FinaleCanvas`).
   - Romantic closing blessing: *"Two hearts, one beautiful journey, and a lifetime waiting to begin."*
   - Floating glassmorphism **Audio Player** with animated soundwave indicator (unmutes softly on invitation open).
   - Floating **Back-to-Top** smooth scroll button.

---

## 🎨 Color Palette & Design Tokens

- **Powder Blue & Misty White**: `#ddf2fd`, `#b1d7e2`, `#f8fcff`
- **Soft Peach & Ivory**: `#fad4c0`, `#f6dfc8`, `#fffdf5`
- **Champagne & Gold**: `#ecd6a0`, `#b68d40`, `#f7d89e`
- **Deep Royal Burgundy**: `#4a1c24`, `#24080d`, `#370617`
- **Vibrant Saffron & Marigold**: `#f9c80e`, `#ee6c1b`, `#ff9e00`

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ES modules)
- **Bundler & Tooling**: Vite 6
- **Styling**: Vanilla CSS (Custom Design System in `src/index.css`)
- **Animations & Effects**: HTML5 Canvas (Particle physics, Fireflies, Starlight, Confetti), GSAP, CSS 3D Transforms
- **Icons**: Lucide Icons
- **Typography**: Google Fonts (`Cinzel`, `Alex Brush`, `Pinyon Script`, `Plus Jakarta Sans`)

---

## 🚀 Getting Started

### 1. Installation
In the project root folder:
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized, production-ready static files will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) to preview the build locally.

---

## ✏️ How to Customize Couple & Wedding Details

All details (names, dates, placeholders, events, and photos) are stored in one central file:
📁 **[`src/config/weddingConfig.js`](./src/config/weddingConfig.js)**

### 1. Updating Venue and Timings
Open `src/config/weddingConfig.js` and edit:
```javascript
weddingDate: {
  iso: "2026-12-12T10:30:00+05:30",
  displayDay: "12",
  displayMonth: "December",
  displayYear: "2026",
  displayWeekday: "Saturday",
  timePlaceholder: "10:30 AM Auspicious Muhurat",
  venuePlaceholder: "Your Actual Wedding Venue Name",
  fullLocationPlaceholder: "Complete Address, City, State",
}
```

### 2. Updating Family Names
In `formalCard`:
```javascript
familyNamesPlaceholder: "Mr. & Mrs. [Groom's Parents] & Mr. & Mrs. [Bride's Parents]"
```

### 3. Replacing Photographs
Place your photos in:
- `src/assets/images/` and `public/images/`
Recommended files:
- `bubble_couple.jpg` — Circular portrait for the intro opening bubble.
- `hero_couple.jpg` — Widescreen portrait for the main hero background.
- `story_one.jpg` & `story_two.jpg` — Vertical photos for the Polaroid "Our Story" section.
- `gallery_haldi.jpg`, `gallery_sangeet.jpg`, `gallery_vivah.jpg`, `gallery_mandap.jpg`, `gallery_reception.jpg` — Gallery carousel and arch cards.

### 4. Replacing Background Music
Replace `public/music/wedding-song.mp3` with your preferred romantic song or audio file.

---

## 🌐 Deployment Instructions

### Option A: Deploy to GitHub Pages

1. **Repository Setup**: Push this repository to GitHub.
2. The `vite.config.js` is already configured with `base: './'`, which automatically handles any repository subpath (e.g. `https://yourusername.github.io/wedding-website/`).
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **GitHub Actions**.
   - Choose the standard **Static HTML** or **Vite** action, or build with:
     ```bash
     npm run build
     ```
   - Push the contents of the `dist/` folder to the `gh-pages` branch.

### Option B: Deploy to Vercel

1. Push your project to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**. Your cinematic wedding invitation will be live instantly with a global CDN!

---

*Wishing Abhishek & Priyanshi a lifetime of love, joy, and sacred togetherness!* 💖✨
