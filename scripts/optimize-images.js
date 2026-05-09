/* eslint-disable */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");

const targets = [
  { file: "avatar.jpg", maxWidth: 720, jpegQuality: 82, webpQuality: 78 },
  { file: "CERTIFICATE_LANDING_PAGE~HN06MIP031ZR.jpeg", maxWidth: 1400, jpegQuality: 80, webpQuality: 76 },
  { file: "CERTIFICATE_LANDING_PAGE~JX9RP6QIBWPS.jpeg", maxWidth: 1400, jpegQuality: 80, webpQuality: 76 },
  { file: "SSL.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "NWC.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "SWE.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "WED.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "ENW.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "Project.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "PMG.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 },
  { file: "Design.jpg", maxWidth: 1200, jpegQuality: 80, webpQuality: 75 }
];

async function processOne(target) {
  const srcPath = path.join(ASSETS_DIR, target.file);
  if (!fs.existsSync(srcPath)) {
    console.log(`SKIP (missing): ${target.file}`);
    return;
  }

  const ext = path.extname(target.file);
  const base = target.file.slice(0, -ext.length);
  const jpegOut = path.join(ASSETS_DIR, base + ".jpg");
  const webpOut = path.join(ASSETS_DIR, base + ".webp");

  const beforeBytes = fs.statSync(srcPath).size;

  const image = sharp(srcPath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const targetWidth = Math.min(meta.width || target.maxWidth, target.maxWidth);

  await image
    .resize({ width: targetWidth, withoutEnlargement: true })
    .jpeg({ quality: target.jpegQuality, mozjpeg: true })
    .toFile(jpegOut + ".tmp");

  await sharp(srcPath, { failOn: "none" })
    .rotate()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: target.webpQuality, effort: 5 })
    .toFile(webpOut);

  // Atomic replace original (only if extension is jpg/jpeg — keep filename for existing imports)
  if (ext.toLowerCase() === ".jpg" || ext.toLowerCase() === ".jpeg") {
    fs.renameSync(jpegOut + ".tmp", srcPath);
  } else {
    fs.unlinkSync(jpegOut + ".tmp");
  }

  const afterJpegBytes = fs.statSync(srcPath).size;
  const afterWebpBytes = fs.statSync(webpOut).size;

  const fmt = (n) => (n / 1024).toFixed(1) + "KB";
  console.log(
    `${target.file.padEnd(50)}  ${fmt(beforeBytes)} -> jpg ${fmt(afterJpegBytes)} | webp ${fmt(
      afterWebpBytes
    )}  (-${(100 - (afterWebpBytes / beforeBytes) * 100).toFixed(0)}% webp)`
  );
}

(async () => {
  let totalBefore = 0;
  let totalAfterWebp = 0;
  for (const t of targets) {
    const srcPath = path.join(ASSETS_DIR, t.file);
    if (fs.existsSync(srcPath)) totalBefore += fs.statSync(srcPath).size;
    await processOne(t);
    const ext = path.extname(t.file);
    const webpPath = path.join(ASSETS_DIR, t.file.slice(0, -ext.length) + ".webp");
    if (fs.existsSync(webpPath)) totalAfterWebp += fs.statSync(webpPath).size;
  }
  const fmt = (n) => (n / 1024 / 1024).toFixed(2) + " MB";
  console.log(
    `\nTOTAL  before=${fmt(totalBefore)}  webp=${fmt(totalAfterWebp)}  saved≈${fmt(
      totalBefore - totalAfterWebp
    )}`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
