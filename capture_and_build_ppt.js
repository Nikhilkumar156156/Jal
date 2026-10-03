const puppeteer = require("puppeteer-core");
const pptxgen = require("pptxgenjs");
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 3000;
const SLIDES_DIR = path.join(__dirname, "slides_hd");

const SLIDE_INFO = [
  { num: 1, name: "Opening", wait: 3800, notes: "JAL - Water Conservation & Water Bodies Revival. 4-Week Environmental Leadership Program at UCET Hazaribag." },
  { num: 2, name: "Team & Mission", wait: 2500, notes: "One Team. One Element. One Mission. Overview of all 21 team members and our 5 core focus areas." },
  { num: 3, name: "The Journey", wait: 5000, notes: "4 Weeks. 4 Experiences. 1 Connected Story. Canary Hill, Biodiversity Park, Nursery Visit, Salfarni Waterfall." },
  { num: 4, name: "Field Experience", wait: 2500, notes: "We went beyond the classroom. Firsthand field observations across all 4 key locations." },
  { num: 5, name: "Canary Hill", wait: 2200, notes: "Week 01: Cleanup Drive at Canary Hill. Trail litter removal and surface runoff pollution awareness." },
  { num: 6, name: "Biodiversity Park", wait: 2200, notes: "Week 02: Ecosystem Study at Biodiversity Park. Understanding the link between water and biodiversity." },
  { num: 7, name: "Nursery Visit", wait: 2200, notes: "Week 03: Plants & Soil at Nursery. Vegetation influence on soil moisture retention and the water cycle." },
  { num: 8, name: "Salfarni Waterfall", wait: 2200, notes: "Week 04: Wildlife Sanctuary & Salfarni Waterfall. Natural stream catchments and ecosystem health." },
  { num: 9, name: "Field Insights", wait: 4000, notes: "From Fieldwork to Insight. The 5 interconnected pillars of water conservation." },
  { num: 10, name: "The Problem", wait: 4600, notes: "The problem: Unmanaged rainwater runoff leading to low aquifer recharge and water stress." },
  { num: 11, name: "The Solution", wait: 4200, notes: "Turning water into an engineered system: Collection, Diversion, Filtration, Recharge, and Smart Monitoring." },
  { num: 12, name: "Closing Ceremony", wait: 3500, notes: "Closing Ceremony & Felicitation. Public awareness street play (Nukkad Natak), project presentation pitch, and certificate distribution honoring the 21 student ambassadors." },
  { num: 13, name: "Commitment", wait: 6600, notes: "Protect Water. Restore Nature. Build the Future. JAL - UCET Hazaribag." },
];

function waitForServer(port, timeout = 35000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      const req = http.get(`http://localhost:${port}/Jal`, (res) => {
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > timeout) {
          reject(new Error("Timeout waiting for Next.js server to start"));
        } else {
          setTimeout(check, 500);
        }
      });
    }
    check();
  });
}

function isServerRunning(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/Jal`, (res) => resolve(true));
    req.on("error", () => resolve(false));
  });
}

async function run() {
  if (!fs.existsSync(SLIDES_DIR)) {
    fs.mkdirSync(SLIDES_DIR, { recursive: true });
  }

  let server = null;
  const running = await isServerRunning(PORT);
  if (!running) {
    console.log(`Starting Next.js dev server on port ${PORT}...`);
    server = spawn("cmd.exe", ["/c", `npx.cmd next dev -p ${PORT}`], {
      cwd: __dirname,
      stdio: "ignore",
      detached: false
    });
    await waitForServer(PORT);
  } else {
    console.log(`Server already active on port ${PORT}.`);
  }

  try {
    console.log("Launching headless Edge browser...");

    const browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--window-size=1920,1080"
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2 // High DPI for crystal clear presentation quality
      }
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/Jal`, { waitUntil: "networkidle0" });

    // Wait for the slide helper function to become available
    await page.waitForFunction(() => typeof window.__goToSlide === "function", { timeout: 15000 });

    console.log(`Capturing ${SLIDE_INFO.length} high-resolution slides...`);

    const capturedImages = [];

    for (let i = 0; i < SLIDE_INFO.length; i++) {
      const info = SLIDE_INFO[i];
      console.log(`[${i + 1}/${SLIDE_INFO.length}] Navigating to Slide ${info.num}: ${info.name}...`);

      // Switch to slide
      await page.evaluate((idx) => {
        if (typeof window.__goToSlide === "function") {
          window.__goToSlide(idx);
        }
      }, i);

      // Wait for animations and content to settle
      await new Promise((r) => setTimeout(r, info.wait));

      // Temporarily hide bottom-right controls and hints for clean presentation capture
      await page.evaluate(() => {
        const controls = document.querySelector("div.absolute.bottom-5.right-4");
        if (controls) controls.style.display = "none";
        const hint = document.querySelector("div.absolute.bottom-6.left-6");
        if (hint) hint.style.display = "none";
      });

      const imgPath = path.join(SLIDES_DIR, `slide_${String(info.num).padStart(2, "0")}.png`);
      await page.screenshot({ path: imgPath, type: "png" });
      capturedImages.push({ ...info, imgPath });

      // Restore controls
      await page.evaluate(() => {
        const controls = document.querySelector("div.absolute.bottom-5.right-4");
        if (controls) controls.style.display = "";
        const hint = document.querySelector("div.absolute.bottom-6.left-6");
        if (hint) hint.style.display = "";
      });
    }

    await browser.close();
    console.log("All slides successfully captured!");

    // Build PowerPoint Presentation
    console.log("Assembling PowerPoint presentation (.pptx)...");
    const pptx = new pptxgen();
    pptx.layout = "LAYOUT_16x9";
    pptx.title = "JAL - Water Conservation & Water Bodies Revival";
    pptx.author = "Nikhil & Team";
    pptx.company = "UCET Hazaribag";

    capturedImages.forEach((slideData) => {
      const slide = pptx.addSlide();
      slide.transition = { type: "fade" };

      // Full bleed 16:9 image with exact styling, zero distortion
      slide.addImage({
        path: slideData.imgPath,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%"
      });

      if (slideData.notes) {
        slide.addNotes(slideData.notes);
      }
    });

    const outputPptxPath = path.join(__dirname, "JAL_Water_Conservation_Presentation.pptx");
    await pptx.writeFile({ fileName: outputPptxPath });
    console.log(`SUCCESS! Pixel-perfect presentation created at:\n${outputPptxPath}`);

  } finally {
    if (server) {
      server.kill();
    }
  }
}

run().catch((err) => {
  console.error("Error in capture and build:", err);
  process.exit(1);
});
