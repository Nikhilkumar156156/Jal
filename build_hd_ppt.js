const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const SLIDES_DIR = path.join(__dirname, "slides_hd");

const SLIDE_INFO = [
  { num: 1, name: "Opening", notes: "JAL - Water Conservation & Water Bodies Revival. 4-Week Environmental Leadership Program at UCET Hazaribag." },
  { num: 2, name: "Team & Mission", notes: "One Team. One Element. One Mission. Overview of all 21 team members and our 5 core focus areas." },
  { num: 3, name: "The Journey", notes: "4 Weeks. 4 Experiences. 1 Connected Story. Canary Hill, Biodiversity Park, Nursery Visit, Salfarni Waterfall." },
  { num: 4, name: "Field Experience", notes: "We went beyond the classroom. Firsthand field observations across all 4 key locations." },
  { num: 5, name: "Canary Hill", notes: "Week 01: Cleanup Drive at Canary Hill. Trail litter removal and surface runoff pollution awareness." },
  { num: 6, name: "Biodiversity Park", notes: "Week 02: Ecosystem Study at Biodiversity Park. Understanding the link between water and biodiversity." },
  { num: 7, name: "Nursery Visit", notes: "Week 03: Plants & Soil at Nursery. Vegetation influence on soil moisture retention and the water cycle." },
  { num: 8, name: "Salfarni Waterfall", notes: "Week 04: Wildlife Sanctuary & Salfarni Waterfall. Natural stream catchments and ecosystem health." },
  { num: 9, name: "Field Insights", notes: "From Fieldwork to Insight. The 5 interconnected pillars of water conservation." },
  { num: 10, name: "The Problem", notes: "The problem: Unmanaged rainwater runoff leading to low aquifer recharge and water stress." },
  { num: 11, name: "The Solution", notes: "Turning water into an engineered system: Collection, Diversion, Filtration, Recharge, and Smart Monitoring." },
  { num: 12, name: "Closing Ceremony", notes: "Closing Ceremony & Felicitation. Public awareness street play (Nukkad Natak), project presentation pitch, and certificate distribution honoring the 21 student ambassadors." },
  { num: 13, name: "Commitment", notes: "Protect Water. Restore Nature. Build the Future. JAL - UCET Hazaribag." },
];

async function buildHdDeck() {
  console.log("Building High-Definition Visual Deck (.pptx)...");
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = "JAL - Water Conservation & Water Bodies Revival (HD Deck)";
  pptx.author = "Nikhil & Team";
  pptx.company = "UCET Hazaribag";

  for (const info of SLIDE_INFO) {
    const slide = pptx.addSlide();
    slide.transition = { type: "fade" };

    const imgPath = path.join(SLIDES_DIR, `slide_${String(info.num).padStart(2, "0")}.png`);
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%"
      });
    }

    if (info.notes) {
      slide.addNotes(info.notes);
    }
  }

  const outputPath = path.join(__dirname, "JAL_Water_Conservation_HD_Visual.pptx");
  await pptx.writeFile({ fileName: outputPath });
  console.log(`HD Visual Deck successfully created at:\n${outputPath}`);
}

buildHdDeck().catch((err) => {
  console.error("Error building HD deck:", err);
});
