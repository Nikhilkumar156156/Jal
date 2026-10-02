const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "public", "images");

function syncImages() {
  const folders = [
    "slide-04",
    "week-01-canary",
    "week-02-biodiversity",
    "week-03-nursery",
    "week-04-salfarni"
  ];

  folders.forEach(folder => {
    const fullFolder = path.join(IMAGES_DIR, folder);
    if (!fs.existsSync(fullFolder)) return;

    const files = fs.readdirSync(fullFolder);
    files.forEach(file => {
      if (file.endsWith(".txt")) return;

      const fullPath = path.join(fullFolder, file);
      if (!fs.statSync(fullPath).isFile()) return;

      // Extract pure base name e.g. "cleanup" from "cleanup.jpeg" or "cleanup.jpg.jpeg"
      const pureBase = file.split(".")[0];
      if (!pureBase) return;

      const jpgPath = path.join(fullFolder, `${pureBase}.jpg`);
      const jpegPath = path.join(fullFolder, `${pureBase}.jpeg`);
      const pngPath = path.join(fullFolder, `${pureBase}.png`);

      if (!fs.existsSync(jpgPath)) {
        fs.copyFileSync(fullPath, jpgPath);
        console.log(`Created ${folder}/${pureBase}.jpg`);
      }
      if (!fs.existsSync(jpegPath)) {
        fs.copyFileSync(fullPath, jpegPath);
        console.log(`Created ${folder}/${pureBase}.jpeg`);
      }
      if (!fs.existsSync(pngPath)) {
        fs.copyFileSync(fullPath, pngPath);
        console.log(`Created ${folder}/${pureBase}.png`);
      }
    });
  });

  // Also link slide-04 overview photos to week hero photos if hero doesn't exist
  const links = [
    { src: path.join(IMAGES_DIR, "slide-04", "canary.jpg"), dest: path.join(IMAGES_DIR, "week-01-canary", "hero.jpg") },
    { src: path.join(IMAGES_DIR, "slide-04", "biodiversity.jpg"), dest: path.join(IMAGES_DIR, "week-02-biodiversity", "hero.jpg") },
    { src: path.join(IMAGES_DIR, "slide-04", "nursery.jpg"), dest: path.join(IMAGES_DIR, "week-03-nursery", "hero.jpg") },
    { src: path.join(IMAGES_DIR, "slide-04", "salfarni.jpg"), dest: path.join(IMAGES_DIR, "week-04-salfarni", "hero.jpg") }
  ];

  links.forEach(({ src, dest }) => {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${path.basename(src)} -> ${path.relative(IMAGES_DIR, dest)}`);
    }
  });

  console.log("All image filenames synchronized across .jpg, .jpeg, .png!");
}

syncImages();
