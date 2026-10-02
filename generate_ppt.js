const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const pptx = new pptxgen();

// Set presentation layout to 16:9 widescreen (13.33 x 7.5 inches)
pptx.layout = "LAYOUT_16x9";
pptx.title = "JAL - Water Conservation & Water Bodies Revival";
pptx.author = "Nikhil & Team";
pptx.company = "UCET Hazaribag";

// Color Palette
const COLORS = {
  abyss: "041B2D",
  deep: "063B5C",
  ocean: "0A5A7A",
  aqua: "00A9C7",
  cyanBright: "24D3E8",
  turquoise: "4DE7D2",
  leaf: "6FE3A0",
  white: "FFFFFF",
  cardBg: "08273E",
  cardBgLight: "0B3654",
  borderAqua: "1E6A8A",
  textMuted: "94A3B8",
  textSub: "CBD5E1",
};

// Paths to images
const HERO_IMG = path.join(__dirname, "public", "images", "hero-water.png");
const FINAL_IMG = path.join(__dirname, "public", "images", "final-nature.png");
const SURFACE_IMG = path.join(__dirname, "public", "images", "water-surface.png");

// Helper to add standard slide background
function addDarkBackground(slide, topColor = COLORS.deep, bottomColor = COLORS.abyss) {
  slide.background = { color: bottomColor };
  // Gradient simulated with a backdrop shape
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    fill: { color: topColor, transparency: 65 },
    line: { color: topColor, width: 0 }
  });
  // Water wave motif bar at bottom
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 7.2,
    w: "100%",
    h: 0.3,
    fill: { color: COLORS.aqua, transparency: 30 },
    line: { width: 0 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 7.35,
    w: "100%",
    h: 0.15,
    fill: { color: COLORS.turquoise, transparency: 10 },
    line: { width: 0 }
  });
}

// Helper to add header to slide
function addSlideHeader(slide, title, highlightText, slideNum, slideLabel) {
  // Slide indicator top right
  slide.addText(`${String(slideNum).padStart(2, "0")} / 12  ·  ${slideLabel}`, {
    x: 8.0,
    y: 0.35,
    w: 5.0,
    h: 0.35,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: COLORS.turquoise,
    align: "right",
    charSpacing: 2
  });

  // Top progress accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 0.35,
    w: 1.5,
    h: 0.04,
    fill: { color: COLORS.turquoise },
    line: { width: 0 }
  });

  // Slide Title
  const titleRuns = [];
  if (title) {
    titleRuns.push({
      text: title + " ",
      options: { fontFace: "Segoe UI", fontSize: 24, bold: true, color: COLORS.white }
    });
  }
  if (highlightText) {
    titleRuns.push({
      text: highlightText,
      options: { fontFace: "Segoe UI", fontSize: 24, bold: true, color: COLORS.turquoise }
    });
  }

  slide.addText(titleRuns, {
    x: 0.8,
    y: 0.55,
    w: 11.5,
    h: 0.85,
    valign: "top"
  });
}

// Helper to create photo placeholder card
function addPhotoBox(slide, x, y, w, h, title, subtitle) {
  // Card Container
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.15,
    fill: { color: COLORS.cardBg, transparency: 20 },
    line: { color: COLORS.borderAqua, width: 1.2 }
  });

  // Viewfinder corners
  const cornerLen = 0.25;
  // top-left
  slide.addShape(pptx.ShapeType.line, { x: x + 0.1, y: y + 0.1, w: cornerLen, h: 0, line: { color: COLORS.turquoise, width: 1.5 } });
  slide.addShape(pptx.ShapeType.line, { x: x + 0.1, y: y + 0.1, w: 0, h: cornerLen, line: { color: COLORS.turquoise, width: 1.5 } });
  // top-right
  slide.addShape(pptx.ShapeType.line, { x: x + w - 0.1 - cornerLen, y: y + 0.1, w: cornerLen, h: 0, line: { color: COLORS.turquoise, width: 1.5 } });
  slide.addShape(pptx.ShapeType.line, { x: x + w - 0.1, y: y + 0.1, w: 0, h: cornerLen, line: { color: COLORS.turquoise, width: 1.5 } });
  // bottom-left
  slide.addShape(pptx.ShapeType.line, { x: x + 0.1, y: y + h - 0.1, w: cornerLen, h: 0, line: { color: COLORS.turquoise, width: 1.5 } });
  slide.addShape(pptx.ShapeType.line, { x: x + 0.1, y: y + h - 0.1 - cornerLen, w: 0, h: cornerLen, line: { color: COLORS.turquoise, width: 1.5 } });
  // bottom-right
  slide.addShape(pptx.ShapeType.line, { x: x + w - 0.1 - cornerLen, y: y + h - 0.1, w: cornerLen, h: 0, line: { color: COLORS.turquoise, width: 1.5 } });
  slide.addShape(pptx.ShapeType.line, { x: x + w - 0.1, y: y + h - 0.1 - cornerLen, w: 0, h: cornerLen, line: { color: COLORS.turquoise, width: 1.5 } });

  // Camera icon circle
  const iconSize = 0.55;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + (w - iconSize) / 2,
    y: y + h / 2 - 0.65,
    w: iconSize,
    h: iconSize,
    fill: { color: COLORS.deep },
    line: { color: COLORS.turquoise, width: 1 }
  });

  slide.addText("📷", {
    x: x + (w - iconSize) / 2,
    y: y + h / 2 - 0.65,
    w: iconSize,
    h: iconSize,
    fontSize: 14,
    align: "center",
    valign: "middle"
  });

  const textRuns = [
    { text: title.toUpperCase() + "\n", options: { fontSize: 10.5, bold: true, color: COLORS.white, charSpacing: 1 } },
    { text: "INSERT FIELD PHOTO", options: { fontSize: 8.5, color: COLORS.turquoise, charSpacing: 1.5 } }
  ];
  if (subtitle) {
    textRuns.push({ text: "\n" + subtitle, options: { fontSize: 9, color: COLORS.textMuted } });
  }

  slide.addText(textRuns, {
    x: x + 0.15,
    y: y + h / 2 - 0.05,
    w: w - 0.3,
    h: 1.2,
    align: "center",
    valign: "top"
  });
}

// ==========================================
// SLIDE 1: OPENING / TITLE SLIDE
// ==========================================
{
  const slide = pptx.addSlide();
  if (fs.existsSync(HERO_IMG)) {
    slide.addImage({ path: HERO_IMG, x: 0, y: 0, w: "100%", h: "100%" });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: "100%",
      fill: { color: COLORS.abyss, transparency: 40 },
      line: { width: 0 }
    });
  } else {
    addDarkBackground(slide);
  }

  // Wave accent bottom
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.2, w: "100%", h: 0.3,
    fill: { color: COLORS.aqua, transparency: 30 },
    line: { width: 0 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.35, w: "100%", h: 0.15,
    fill: { color: COLORS.turquoise, transparency: 10 },
    line: { width: 0 }
  });

  // Center Glass Card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.6, y: 1.0, w: 8.13, h: 4.8,
    rectRadius: 0.35,
    fill: { color: COLORS.abyss, transparency: 30 },
    line: { color: COLORS.borderAqua, width: 1.5 }
  });

  slide.addText("UCET · HAZARIBAG", {
    x: 2.6, y: 1.3, w: 8.13, h: 0.4,
    fontFace: "Segoe UI",
    fontSize: 11,
    bold: true,
    color: COLORS.turquoise,
    align: "center",
    charSpacing: 4
  });

  slide.addText("JAL", {
    x: 2.6, y: 1.7, w: 8.13, h: 1.35,
    fontFace: "Impact",
    fontSize: 88,
    color: COLORS.turquoise,
    align: "center"
  });

  slide.addText("जल", {
    x: 2.6, y: 2.95, w: 8.13, h: 0.7,
    fontFace: "Nirmala UI",
    fontSize: 34,
    color: COLORS.white,
    align: "center"
  });

  slide.addText("Water Conservation & Water Bodies Revival", {
    x: 2.6, y: 3.75, w: 8.13, h: 0.45,
    fontFace: "Segoe UI",
    fontSize: 16,
    bold: true,
    color: COLORS.white,
    align: "center"
  });

  slide.addText("4-Week Environmental Leadership Program", {
    x: 2.6, y: 4.25, w: 8.13, h: 0.4,
    fontFace: "Segoe UI",
    fontSize: 13,
    color: COLORS.cyanBright,
    align: "center"
  });

  // Bottom Tagline
  slide.addText("OBSERVE  ·  UNDERSTAND  ·  ACT  ·  RESTORE", {
    x: 1.0, y: 6.2, w: 11.33, h: 0.4,
    fontFace: "Segoe UI",
    fontSize: 12,
    bold: true,
    color: COLORS.textSub,
    align: "center",
    charSpacing: 4
  });
}

// ==========================================
// SLIDE 2: TEAM & MISSION
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "ONE TEAM.", "ONE ELEMENT. ONE MISSION.", 2, "Team & Mission");

  // Left Column: Team
  slide.addText("THE TEAM", {
    x: 0.8, y: 1.5, w: 7.2, h: 0.35,
    fontSize: 11, bold: true, color: COLORS.turquoise, charSpacing: 3
  });

  const TEAM = [
    { name: "Shiv", role: "Captain" },
    { name: "Nikhil", role: "Created By" },
    { name: "Roushani", role: "Captain" },
    { name: "Utkarsh" },
    { name: "Ankit" },
    { name: "Siddharth" },
    { name: "Abhishek" },
    { name: "Ashit" },
    { name: "Binay" },
    { name: "Aditya" },
    { name: "Aryan" },
    { name: "Amit" },
    { name: "Priyadarshan" },
    { name: "Ravi" },
    { name: "Taleshwar" },
    { name: "Shivam" },
    { name: "Aditya S." },
    { name: "Sanjeet" },
    { name: "Ekta" },
    { name: "Khushi" },
    { name: "Kaya" },
  ];

  const cols = 4;
  const colW = 1.7;
  const rowH = 0.7;
  const startX = 0.8;
  const startY = 1.95;

  TEAM.forEach((m, idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    const x = startX + c * (colW + 0.1);
    const y = startY + r * (rowH + 0.1);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: colW, h: rowH,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg, transparency: 15 },
      line: { color: COLORS.borderAqua, width: 0.8 }
    });

    const runs = [
      { text: "💧 " + m.name + "\n", options: { fontSize: 10, bold: true, color: COLORS.white } }
    ];
    if (m.role) {
      runs.push({ text: m.role.toUpperCase(), options: { fontSize: 7.5, bold: true, color: COLORS.turquoise, charSpacing: 1 } });
    }

    slide.addText(runs, {
      x: x + 0.08, y: y + 0.05, w: colW - 0.16, h: rowH - 0.1,
      valign: "middle"
    });
  });

  // Right Column: Mission Card
  const rx = 8.3;
  const ry = 1.7;
  const rw = 4.2;
  const rh = 5.0;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: ry, w: rw, h: rh,
    rectRadius: 0.25,
    fill: { color: COLORS.cardBgLight, transparency: 20 },
    line: { color: COLORS.turquoise, width: 1.5 }
  });

  slide.addText("💧 JAL", {
    x: rx + 0.4, y: ry + 0.4, w: rw - 0.8, h: 0.8,
    fontFace: "Impact", fontSize: 42, color: COLORS.turquoise
  });

  slide.addText("Water Conservation & Water Bodies Revival", {
    x: rx + 0.4, y: ry + 1.25, w: rw - 0.8, h: 0.5,
    fontFace: "Segoe UI", fontSize: 13, bold: true, color: COLORS.white
  });

  slide.addText("OUR FOCUS AREAS", {
    x: rx + 0.4, y: ry + 2.0, w: rw - 0.8, h: 0.35,
    fontSize: 10.5, bold: true, color: COLORS.turquoise, charSpacing: 2
  });

  const FOCUS_AREAS = [
    "Groundwater",
    "Wastewater",
    "Rainwater",
    "Filtration",
    "Water Bodies",
  ];

  FOCUS_AREAS.forEach((area, i) => {
    const fy = ry + 2.45 + i * 0.46;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: rx + 0.4, y: fy, w: rw - 0.8, h: 0.38,
      rectRadius: 0.1,
      fill: { color: COLORS.deep, transparency: 20 },
      line: { color: COLORS.aqua, width: 0.8 }
    });

    slide.addText("• " + area, {
      x: rx + 0.6, y: fy, w: rw - 1.2, h: 0.38,
      fontSize: 11, bold: true, color: COLORS.white, valign: "middle"
    });
  });
}

// ==========================================
// SLIDE 3: THE JOURNEY (4 WEEKS OVERVIEW)
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "4 WEEKS. 4 EXPERIENCES.", "1 CONNECTED STORY.", 3, "The Journey");

  // River line graphic in background
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 3.5, w: 11.73, h: 0.08,
    fill: { color: COLORS.aqua, transparency: 40 },
    line: { width: 0 }
  });

  const WEEKS = [
    {
      week: "01",
      title: "Canary Hill",
      activity: "Cleanup Drive",
      purpose: "Clean surroundings, environmental awareness",
      icon: "⛰️"
    },
    {
      week: "02",
      title: "Biodiversity Park",
      activity: "Ecosystem Study",
      purpose: "Water and biodiversity connection",
      icon: "🌿"
    },
    {
      week: "03",
      title: "Nursery Visit",
      activity: "Plants & Soil",
      purpose: "Vegetation, soil and the water cycle",
      icon: "🌱"
    },
    {
      week: "04",
      title: "Salfarni Waterfall",
      activity: "Wildlife Sanctuary",
      purpose: "Natural water bodies and ecosystems",
      icon: "🌊"
    },
  ];

  const cardW = 2.75;
  const cardGap = 0.25;
  const startX = 0.8;

  WEEKS.forEach((wk, i) => {
    const x = startX + i * (cardW + cardGap);
    const yOffset = i % 2 === 1 ? 2.5 : 1.7; // staggered flow

    // Droplet marker
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + cardW / 2 - 0.25,
      y: yOffset - 0.55,
      w: 0.5, h: 0.5,
      fill: { color: COLORS.deep },
      line: { color: COLORS.turquoise, width: 1.5 }
    });
    slide.addText("💧", {
      x: x + cardW / 2 - 0.25, y: yOffset - 0.55, w: 0.5, h: 0.5,
      fontSize: 10, align: "center", valign: "middle"
    });

    // Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: yOffset, w: cardW, h: 3.8,
      rectRadius: 0.18,
      fill: { color: COLORS.cardBg, transparency: 10 },
      line: { color: COLORS.borderAqua, width: 1.2 }
    });

    // Header banner of card
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: yOffset, w: cardW, h: 1.1,
      rectRadius: 0.18,
      fill: { color: COLORS.deep, transparency: 10 },
      line: { width: 0 }
    });

    slide.addText(`WEEK ${wk.week}`, {
      x: x + 0.2, y: yOffset + 0.15, w: 1.5, h: 0.4,
      fontFace: "Impact", fontSize: 24, color: COLORS.borderAqua
    });

    slide.addText(wk.icon, {
      x: x + cardW - 0.8, y: yOffset + 0.15, w: 0.6, h: 0.4,
      fontSize: 20, align: "right"
    });

    // Body
    slide.addText([
      { text: `WEEK ${wk.week}\n`, options: { fontSize: 9.5, bold: true, color: COLORS.turquoise, charSpacing: 2 } },
      { text: wk.title + "\n", options: { fontSize: 15, bold: true, color: COLORS.white } },
      { text: wk.activity + "\n\n", options: { fontSize: 12, color: COLORS.cyanBright } },
      { text: wk.purpose, options: { fontSize: 10.5, color: COLORS.textMuted } }
    ], {
      x: x + 0.2, y: yOffset + 1.25, w: cardW - 0.4, h: 2.3,
      valign: "top"
    });
  });
}

// ==========================================
// SLIDE 4: FIELD EXPERIENCE (BEYOND THE CLASSROOM)
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "WE WENT", "BEYOND THE CLASSROOM", 4, "Field Experience");

  const PANELS = [
    { label: "Canary Hill", caption: "Cleanup & environmental awareness" },
    { label: "Biodiversity Park", caption: "Water + biodiversity" },
    { label: "Nursery", caption: "Plants + soil + water" },
    { label: "Salfarni", caption: "Natural water bodies + ecosystem" },
  ];

  const w = 2.75;
  const h = 3.6;
  const gap = 0.25;
  const sx = 0.8;
  const sy = 1.65;

  PANELS.forEach((p, i) => {
    const x = sx + i * (w + gap);
    slide.addText(`PANEL 0${i + 1}`, {
      x, y: sy - 0.28, w, h: 0.25,
      fontSize: 9, bold: true, color: COLORS.turquoise, charSpacing: 2
    });
    addPhotoBox(slide, x, sy, w, h, p.label, p.caption);
  });

  // Central Statement quote bottom left
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 5.5, w: 7.6, h: 1.2,
    rectRadius: 0.15,
    fill: { color: COLORS.cardBg, transparency: 20 },
    line: { color: COLORS.borderAqua, width: 1 }
  });

  slide.addText("“Seeing environmental problems firsthand changed how we understood them.”", {
    x: 1.1, y: 5.65, w: 7.0, h: 0.9,
    fontFace: "Georgia", fontSize: 14, italic: true, color: COLORS.white, valign: "middle"
  });

  // Ecosystem badge bottom right
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.7, y: 5.5, w: 3.83, h: 1.2,
    rectRadius: 0.15,
    fill: { color: COLORS.cardBgLight, transparency: 15 },
    line: { color: COLORS.turquoise, width: 1.2 }
  });

  slide.addText("🐾 ECOSYSTEM", {
    x: 8.9, y: 5.65, w: 3.4, h: 0.3,
    fontSize: 9.5, bold: true, color: COLORS.turquoise, charSpacing: 2
  });

  slide.addText("Wildlife Sanctuary", {
    x: 8.9, y: 5.95, w: 3.4, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.white
  });
}

// ==========================================
// WEEKS 1 TO 4 DETAILED LOCATION SLIDES (SLIDES 5-8)
// ==========================================
const LOCATIONS = [
  {
    slideNum: 5,
    week: "01",
    name: "Canary Hill",
    activity: "Cleanup Drive",
    lead: "Clean surroundings protect the water we depend on.",
    focus: ["Litter removal along trails", "Awareness on surface pollution", "How waste reaches runoff"],
    note: "Initial field observation",
    photos: ["Canary Hill", "Cleanup Drive", "Team on Field"]
  },
  {
    slideNum: 6,
    week: "02",
    name: "Biodiversity Park",
    activity: "Ecosystem Study",
    lead: "Biodiversity depends on healthy, connected water systems.",
    focus: ["Water & biodiversity link", "Habitat and wetland observation", "Native species & vegetation"],
    note: "Initial field observation",
    photos: ["Biodiversity Park", "Habitat Study", "Native Species"]
  },
  {
    slideNum: 7,
    week: "03",
    name: "Nursery",
    activity: "Plants & Soil",
    lead: "Plants shape the soil and the water cycle around them.",
    focus: ["Soil moisture & retention", "Vegetation and the water cycle", "Saplings for green cover"],
    note: "Initial field observation",
    photos: ["Nursery Visit", "Sapling Care", "Soil Moisture Analysis"]
  },
  {
    slideNum: 8,
    week: "04",
    name: "Salfarni Waterfall",
    activity: "Wildlife Sanctuary",
    lead: "Natural water bodies and ecosystems need protection.",
    focus: ["Stream flow & catchment", "Natural water body health", "Wildlife sanctuary ecosystem"],
    note: "Initial field observation",
    photos: ["Salfarni Waterfall", "Sanctuary Trek", "Stream Flow Catchment"]
  }
];

LOCATIONS.forEach(loc => {
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, `WEEK ${loc.week} ·`, loc.name.toUpperCase(), loc.slideNum, loc.name);

  // Left Narrative Column
  const lx = 0.8;
  const ly = 1.6;
  const lw = 5.2;

  // Badge: Activity
  slide.addShape(pptx.ShapeType.roundRect, {
    x: lx, y: ly, w: 2.3, h: 0.35,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBgLight },
    line: { color: COLORS.turquoise, width: 1 }
  });
  slide.addText(loc.activity.toUpperCase(), {
    x: lx, y: ly, w: 2.3, h: 0.35,
    fontSize: 9, bold: true, color: COLORS.turquoise, align: "center", valign: "middle", charSpacing: 1.5
  });

  // Title
  slide.addText(loc.name, {
    x: lx, y: ly + 0.45, w: lw, h: 0.8,
    fontFace: "Segoe UI", fontSize: 32, bold: true, color: COLORS.white
  });

  // Lead Quote
  slide.addText(loc.lead, {
    x: lx, y: ly + 1.25, w: lw, h: 0.7,
    fontSize: 14, color: COLORS.textSub, italic: true
  });

  // Focus Bullet Cards
  loc.focus.forEach((pt, i) => {
    const fy = ly + 2.05 + i * 0.75;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: lx, y: fy, w: lw, h: 0.65,
      rectRadius: 0.12,
      fill: { color: COLORS.cardBg, transparency: 15 },
      line: { color: COLORS.borderAqua, width: 0.9 }
    });

    slide.addShape(pptx.ShapeType.ellipse, {
      x: lx + 0.15, y: fy + 0.12, w: 0.4, h: 0.4,
      fill: { color: COLORS.deep },
      line: { color: COLORS.turquoise, width: 1 }
    });

    slide.addText("💧", {
      x: lx + 0.15, y: fy + 0.12, w: 0.4, h: 0.4,
      fontSize: 9, align: "center", valign: "middle"
    });

    slide.addText(pt, {
      x: lx + 0.65, y: fy, w: lw - 0.8, h: 0.65,
      fontSize: 11.5, bold: true, color: COLORS.white, valign: "middle"
    });
  });

  // Note footer
  slide.addText(`🔍  ${loc.note.toUpperCase()}`, {
    x: lx, y: ly + 4.4, w: lw, h: 0.35,
    fontSize: 9.5, bold: true, color: COLORS.cyanBright, charSpacing: 2
  });

  // Right Side: Layered Photo Composition (1 Hero Top + 2 Half Bottom)
  const rx = 6.4;
  const rw = 6.13;
  // Hero photo (top)
  addPhotoBox(slide, rx, 1.6, rw, 2.6, loc.photos[0], "Hero Photo Slot");
  // Two smaller photos (bottom)
  const halfW = (rw - 0.25) / 2;
  addPhotoBox(slide, rx, 4.4, halfW, 2.2, loc.photos[1], "Field Capture");
  addPhotoBox(slide, rx + halfW + 0.25, 4.4, halfW, 2.2, loc.photos[2], "Team & Action");
});

// ==========================================
// SLIDE 9: INSIGHTS (FROM FIELDWORK TO INSIGHT)
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "FROM FIELDWORK TO", "INSIGHT", 9, "Insights");

  // Clean 5 Key Connected Insights Columns / Cards
  const NODES = [
    { n: "01", title: "Clean Surroundings", text: "Clean trails and surroundings directly protect runoff and local water bodies." },
    { n: "02", title: "Biodiversity Link", text: "Diverse vegetation and wildlife depend upon unpolluted, connected water systems." },
    { n: "03", title: "Soil & Vegetation", text: "Healthy plant root systems enhance soil moisture and natural water retention." },
    { n: "04", title: "Natural Protection", text: "Natural springs and waterfalls require strict ecological safeguarding." },
    { n: "05", title: "Community Action", text: "Active local participation turns awareness into long-term preservation." },
  ];

  const cardW = 2.15;
  const cardGap = 0.19;
  const sx = 0.8;

  NODES.forEach((node, i) => {
    const x = sx + i * (cardW + cardGap);
    const y = 1.65;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: 3.4,
      rectRadius: 0.15,
      fill: { color: COLORS.cardBg, transparency: 15 },
      line: { color: COLORS.borderAqua, width: 1.2 }
    });

    // Badge Number
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + cardW / 2 - 0.35, y: y + 0.25, w: 0.7, h: 0.7,
      fill: { color: COLORS.deep },
      line: { color: COLORS.turquoise, width: 1.5 }
    });
    slide.addText(node.n, {
      x: x + cardW / 2 - 0.35, y: y + 0.25, w: 0.7, h: 0.7,
      fontSize: 12, bold: true, color: COLORS.turquoise, align: "center", valign: "middle"
    });

    // Title & Text
    slide.addText(node.title, {
      x: x + 0.15, y: y + 1.1, w: cardW - 0.3, h: 0.5,
      fontFace: "Segoe UI", fontSize: 12, bold: true, color: COLORS.white, align: "center"
    });

    slide.addText(node.text, {
      x: x + 0.15, y: y + 1.65, w: cardW - 0.3, h: 1.5,
      fontFace: "Segoe UI", fontSize: 10.5, color: COLORS.textSub, align: "center"
    });
  });

  // Reflection Banner Bottom
  const rx = 0.8;
  const ry = 5.35;
  const rw = 11.73;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: ry, w: rw, h: 1.4,
    rectRadius: 0.18,
    fill: { color: COLORS.cardBgLight, transparency: 15 },
    line: { color: COLORS.turquoise, width: 1.5 }
  });

  slide.addText("OUR CORE INSIGHT", {
    x: rx + 0.4, y: ry + 0.18, w: rw - 0.8, h: 0.3,
    fontSize: 10, bold: true, color: COLORS.turquoise, charSpacing: 2
  });

  slide.addText([
    {
      text: "The field visits helped us understand that water conservation is not an isolated problem. ",
      options: { fontSize: 13.5, color: COLORS.white }
    },
    {
      text: "Water, waste, vegetation, biodiversity and human activity are deeply connected. ",
      options: { fontSize: 13.5, bold: true, color: COLORS.turquoise }
    },
    {
      text: "Seeing these dynamics firsthand allowed us to transition from passive environmental observation to structured engineering action.",
      options: { fontSize: 12.5, color: COLORS.textSub }
    }
  ], {
    x: rx + 0.4, y: ry + 0.45, w: rw - 0.8, h: 0.85,
    valign: "middle"
  });
}

// ==========================================
// SLIDE 10: THE PROBLEM (UNMANAGED RUNOFF)
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "THE PROBLEM WE SAW —", "UNMANAGED RAINWATER RUNOFF", 10, "The Problem");

  // Left Side: 5 Problem Cascade Steps
  const PROBLEM = [
    { label: "1. Rainfall", sub: "Intense, short bursts overwhelm drainage" },
    { label: "2. Surface Runoff", sub: "Water sheets off concrete & hard ground" },
    { label: "3. Water Lost", sub: "Carried away into drains, completely unused" },
    { label: "4. Low Recharge", sub: "Underground aquifers barely refill" },
    { label: "5. Water Stress", sub: "Scarcity builds over time across communities" },
  ];

  const sx = 0.8;
  const pw = 5.2;

  PROBLEM.forEach((step, i) => {
    const y = 1.6 + i * 0.95;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: sx, y, w: pw, h: 0.72,
      rectRadius: 0.12,
      fill: { color: COLORS.cardBg, transparency: 15 },
      line: { color: COLORS.borderAqua, width: 1 }
    });

    slide.addShape(pptx.ShapeType.ellipse, {
      x: sx + 0.15, y: y + 0.16, w: 0.4, h: 0.4,
      fill: { color: COLORS.deep },
      line: { color: COLORS.turquoise, width: 1.2 }
    });

    slide.addText(String(i + 1), {
      x: sx + 0.15, y: y + 0.16, w: 0.4, h: 0.4,
      fontSize: 10, bold: true, color: COLORS.turquoise, align: "center", valign: "middle"
    });

    slide.addText([
      { text: step.label + "  ·  ", options: { fontSize: 12, bold: true, color: COLORS.white } },
      { text: step.sub, options: { fontSize: 10.5, color: COLORS.textMuted } }
    ], {
      x: sx + 0.65, y, w: pw - 0.8, h: 0.72,
      valign: "middle"
    });

    if (i < PROBLEM.length - 1) {
      slide.addText("↓", {
        x: sx + 0.2, y: y + 0.68, w: 0.3, h: 0.3,
        fontSize: 12, bold: true, color: COLORS.turquoise, align: "center"
      });
    }
  });

  // Right Side: Opportunity & Quotes
  const rx = 6.6;
  const rw = 5.93;

  // Opportunity Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: 1.6, w: rw, h: 2.2,
    rectRadius: 0.18,
    fill: { color: COLORS.cardBgLight, transparency: 15 },
    line: { color: COLORS.turquoise, width: 1.5 }
  });

  slide.addText("THE OPPORTUNITY", {
    x: rx + 0.4, y: 1.8, w: rw - 0.8, h: 0.35,
    fontSize: 11, bold: true, color: COLORS.turquoise, charSpacing: 2
  });

  const OPPORTUNITY = ["Capture", "Filter", "Store", "Recharge", "Monitor"];
  OPPORTUNITY.forEach((op, i) => {
    const ox = rx + 0.35 + i * 1.05;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: ox, y: 2.4, w: 0.95, h: 0.6,
      rectRadius: 0.1,
      fill: { color: COLORS.deep },
      line: { color: COLORS.aqua, width: 1 }
    });
    slide.addText(op, {
      x: ox, y: 2.4, w: 0.95, h: 0.6,
      fontSize: 10, bold: true, color: COLORS.white, align: "center", valign: "middle"
    });
    if (i < OPPORTUNITY.length - 1) {
      slide.addText("→", {
        x: ox + 0.95, y: 2.4, w: 0.15, h: 0.6,
        fontSize: 11, bold: true, color: COLORS.turquoise, align: "center", valign: "middle"
      });
    }
  });

  // Quote Box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: 4.1, w: rw, h: 1.3,
    rectRadius: 0.15,
    fill: { color: COLORS.cardBg, transparency: 20 },
    line: { color: COLORS.borderAqua, width: 1 }
  });

  slide.addText("“Field observations helped us connect environmental awareness with an engineering problem.”", {
    x: rx + 0.3, y: 4.25, w: rw - 0.6, h: 1.0,
    fontFace: "Georgia", fontSize: 13, italic: true, color: COLORS.white, valign: "middle"
  });

  // Field Data Placeholder Chip
  slide.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: 5.65, w: 3.2, h: 0.45,
    rectRadius: 0.2,
    fill: { color: COLORS.abyss },
    line: { color: COLORS.turquoise, width: 1, dashType: "dash" }
  });

  slide.addText("🟢  FIELD DATA: TO BE ADDED", {
    x: rx, y: 5.65, w: 3.2, h: 0.45,
    fontSize: 9.5, bold: true, color: COLORS.turquoise, align: "center", valign: "middle", charSpacing: 1.5
  });
}

// ==========================================
// SLIDE 11: THE SOLUTION (TURNING WATER INTO A SYSTEM)
// ==========================================
{
  const slide = pptx.addSlide();
  addDarkBackground(slide);
  addSlideHeader(slide, "TURNING WATER INTO", "A SYSTEM", 11, "The Solution");

  // 5 Stages across top
  const STAGES = [
    { num: "01", title: "Rainwater Collection", icon: "🌧️" },
    { num: "02", title: "First-Flush Diversion", icon: "🚰" },
    { num: "03", title: "Filtration", icon: "🧪" },
    { num: "04", title: "Storage / Recharge", icon: "⚡" },
    { num: "05", title: "Smart Monitoring", icon: "📊" },
  ];

  const stageW = 2.2;
  const stageGap = 0.18;
  const sx = 0.8;

  // Horizontal connector line
  slide.addShape(pptx.ShapeType.line, {
    x: sx + stageW / 2, y: 2.1, w: 4 * (stageW + stageGap), h: 0,
    line: { color: COLORS.turquoise, width: 1.5, dashType: "dash" }
  });

  STAGES.forEach((s, i) => {
    const x = sx + i * (stageW + stageGap);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.5, w: stageW, h: 1.8,
      rectRadius: 0.15,
      fill: { color: COLORS.cardBg, transparency: 15 },
      line: { color: COLORS.borderAqua, width: 1.2 }
    });

    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + stageW / 2 - 0.35, y: 1.65, w: 0.7, h: 0.7,
      fill: { color: COLORS.deep },
      line: { color: COLORS.turquoise, width: 1.2 }
    });

    slide.addText(s.icon, {
      x: x + stageW / 2 - 0.35, y: 1.65, w: 0.7, h: 0.7,
      fontSize: 16, align: "center", valign: "middle"
    });

    slide.addText(s.num, {
      x, y: 2.4, w: stageW, h: 0.25,
      fontSize: 9, bold: true, color: COLORS.turquoise, align: "center", charSpacing: 2
    });

    slide.addText(s.title, {
      x: x + 0.1, y: 2.65, w: stageW - 0.2, h: 0.55,
      fontSize: 11, bold: true, color: COLORS.white, align: "center", valign: "top"
    });
  });

  // Monitoring UI Dashboard widgets
  const WIDGETS = [
    { label: "WATER LEVEL", val: "62%", fillW: 1.5 },
    { label: "RAINFALL", val: "44 mm", fillW: 1.1 },
    { label: "FLOW RATE", val: "55 L/m", fillW: 1.3 },
    { label: "FILTER CONDITION", val: "80% Optimal", fillW: 1.9 },
  ];

  const ww = 2.8;
  const wgap = 0.22;
  const wx = 0.8;

  WIDGETS.forEach((w, i) => {
    const x = wx + i * (ww + wgap);
    const y = 3.6;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: ww, h: 1.35,
      rectRadius: 0.15,
      fill: { color: COLORS.cardBgLight, transparency: 20 },
      line: { color: COLORS.borderAqua, width: 1 }
    });

    slide.addText(w.label, {
      x: x + 0.2, y: y + 0.15, w: ww - 0.4, h: 0.25,
      fontSize: 9, bold: true, color: COLORS.turquoise, charSpacing: 1.5
    });

    slide.addText(w.val, {
      x: x + 0.2, y: y + 0.4, w: ww - 0.4, h: 0.45,
      fontFace: "Impact", fontSize: 20, color: COLORS.white
    });

    // Mini progress bar
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2, y: y + 0.95, w: ww - 0.4, h: 0.12,
      rectRadius: 0.06,
      fill: { color: COLORS.deep },
      line: { width: 0 }
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2, y: y + 0.95, w: Math.min(w.fillW, ww - 0.4), h: 0.12,
      rectRadius: 0.06,
      fill: { color: COLORS.turquoise },
      line: { width: 0 }
    });
  });

  slide.addText("INDICATIVE MONITORING UI  ·  FIELD DATA TO BE ADDED", {
    x: 0.8, y: 5.15, w: 11.73, h: 0.3,
    fontSize: 9, color: COLORS.textMuted, align: "center", charSpacing: 2
  });

  // Core philosophy quote
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.8, y: 5.65, w: 9.73, h: 0.85,
    rectRadius: 0.15,
    fill: { color: COLORS.cardBg, transparency: 15 },
    line: { color: COLORS.turquoise, width: 1.2 }
  });

  slide.addText([
    { text: "Capture what we receive.  ", options: { fontSize: 15, bold: true, color: COLORS.white } },
    { text: "Clean what we collect.  ", options: { fontSize: 15, bold: true, color: COLORS.turquoise } },
    { text: "Recharge what we can.", options: { fontSize: 15, bold: true, color: COLORS.cyanBright } }
  ], {
    x: 2.0, y: 5.65, w: 9.33, h: 0.85,
    align: "center", valign: "middle"
  });
}

// ==========================================
// SLIDE 12: COMMITMENT & CLOSING
// ==========================================
{
  const slide = pptx.addSlide();
  if (fs.existsSync(FINAL_IMG)) {
    slide.addImage({ path: FINAL_IMG, x: 0, y: 0, w: "100%", h: "100%" });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: "100%",
      fill: { color: COLORS.abyss, transparency: 45 },
      line: { width: 0 }
    });
  } else {
    addDarkBackground(slide);
  }

  // Wave accent bottom
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.2, w: "100%", h: 0.3,
    fill: { color: COLORS.aqua, transparency: 30 },
    line: { width: 0 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.35, w: "100%", h: 0.15,
    fill: { color: COLORS.turquoise, transparency: 10 },
    line: { width: 0 }
  });

  // Call to action lines
  slide.addText([
    { text: "PROTECT WATER.\n", options: { fontFace: "Impact", fontSize: 36, color: COLORS.white } },
    { text: "RESTORE NATURE.\n", options: { fontFace: "Impact", fontSize: 36, color: COLORS.turquoise } },
    { text: "BUILD THE FUTURE.", options: { fontFace: "Impact", fontSize: 36, color: COLORS.cyanBright } }
  ], {
    x: 1.0, y: 0.8, w: 11.33, h: 2.2,
    align: "center", valign: "middle"
  });

  // Center Badge Card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.16, y: 3.1, w: 5.0, h: 1.6,
    rectRadius: 0.25,
    fill: { color: COLORS.abyss, transparency: 25 },
    line: { color: COLORS.turquoise, width: 1.5 }
  });

  slide.addText([
    { text: "💧 JAL  ", options: { fontFace: "Impact", fontSize: 38, color: COLORS.turquoise } },
    { text: "जल\n", options: { fontFace: "Nirmala UI", fontSize: 26, color: COLORS.white } },
    { text: "4-WEEK ENVIRONMENTAL LEADERSHIP PROGRAM", options: { fontFace: "Segoe UI", fontSize: 10, bold: true, color: COLORS.cyanBright, charSpacing: 2 } }
  ], {
    x: 4.16, y: 3.2, w: 5.0, h: 1.4,
    align: "center", valign: "middle"
  });

  // Team roster
  const TEAM_NAMES = [
    "Shiv", "Nikhil", "Roushani", "Utkarsh", "Ankit", "Siddharth", "Abhishek",
    "Ashit", "Binay", "Aditya", "Aryan", "Amit", "Priyadarshan", "Ravi",
    "Taleshwar", "Shivam", "Aditya S.", "Sanjeet", "Ekta", "Khushi", "Kaya"
  ];

  slide.addText(TEAM_NAMES.join("   ·   "), {
    x: 1.0, y: 5.0, w: 11.33, h: 0.6,
    fontSize: 10.5, color: COLORS.textSub, align: "center"
  });

  // Institution Footer
  slide.addText("UCET  |  HAZARIBAG", {
    x: 1.0, y: 6.0, w: 11.33, h: 0.4,
    fontFace: "Segoe UI", fontSize: 12, bold: true, color: COLORS.white, align: "center", charSpacing: 4
  });
}

// Output path
const outputPath = path.join(__dirname, "JAL_Water_Conservation_Presentation.pptx");

pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`SUCCESS: Presentation created at: ${fileName}`);
  })
  .catch(err => {
    console.error("ERROR generating presentation:", err);
    process.exit(1);
  });
