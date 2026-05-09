/* eslint-disable */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SOURCE = path.join(__dirname, "..", "src", "assets", "avatar.jpg");
const OUT_DIR = path.join(__dirname, "..", "public");

const sizes = [
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-64x64.png", size: 64 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 }
];

(async () => {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing source:", SOURCE);
    process.exit(1);
  }

  for (const { name, size } of sizes) {
    const out = path.join(OUT_DIR, name);
    await sharp(SOURCE)
      .resize(size, size, { fit: "cover", position: "centre" })
      .png({ quality: 92 })
      .toFile(out);
    const bytes = fs.statSync(out).size;
    console.log(`${name.padEnd(28)}  ${size}x${size}  ${(bytes / 1024).toFixed(1)} KB`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
