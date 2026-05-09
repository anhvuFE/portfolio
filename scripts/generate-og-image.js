/* eslint-disable */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SOURCE = path.join(__dirname, "..", "src", "assets", "avatar.jpg");
const OUT = path.join(__dirname, "..", "public", "og-image.png");

const W = 1200;
const H = 630;
const AVATAR_SIZE = 360;
const PAD = 80;

const BG = "#0a0a0a";
const ACCENT = "#0eaddf";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing source:", SOURCE);
    process.exit(1);
  }

  // Avatar with rounded corners
  const avatarBuffer = await sharp(SOURCE)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}"><rect x="0" y="0" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}" rx="40" ry="40" fill="white"/></svg>`
        ),
        blend: "dest-in"
      }
    ])
    .png()
    .toBuffer();

  const avatarX = PAD;
  const avatarY = Math.round((H - AVATAR_SIZE) / 2);
  const textX = avatarX + AVATAR_SIZE + 56;

  const svg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="80%" cy="20%" r="50%">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${BG}"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>

      <text x="${textX}" y="${avatarY + 80}" font-family="-apple-system, system-ui, sans-serif"
            font-size="22" font-weight="600" fill="${ACCENT}" letter-spacing="3">
        FULL STACK DEVELOPER
      </text>

      <text x="${textX}" y="${avatarY + 170}" font-family="-apple-system, system-ui, sans-serif"
            font-size="78" font-weight="800" fill="${TEXT_PRIMARY}" letter-spacing="-2">
        Vũ Xuân Anh
      </text>

      <text x="${textX}" y="${avatarY + 235}" font-family="-apple-system, system-ui, sans-serif"
            font-size="28" font-weight="500" fill="${TEXT_MUTED}">
        React · TypeScript · Node
      </text>

      <line x1="${textX}" y1="${avatarY + 290}" x2="${textX + 80}" y2="${avatarY + 290}"
            stroke="${ACCENT}" stroke-width="3"/>

      <text x="${textX}" y="${avatarY + 340}" font-family="-apple-system, system-ui, sans-serif"
            font-size="22" font-weight="500" fill="${TEXT_MUTED}">
        Hanoi, Vietnam · open to freelance &amp; full-time
      </text>

      <text x="${PAD}" y="${H - 40}" font-family="ui-monospace, monospace"
            font-size="18" font-weight="500" fill="${TEXT_MUTED}">
        anhvuFE.github.io/portfolio
      </text>

      <text x="${W - PAD}" y="${H - 40}" font-family="ui-monospace, monospace"
            font-size="18" font-weight="500" fill="${ACCENT}" text-anchor="end">
        github.com/anhvuFE
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([{ input: avatarBuffer, top: avatarY, left: avatarX }])
    .png({ quality: 92 })
    .toFile(OUT);

  const bytes = fs.statSync(OUT).size;
  console.log(`og-image.png  ${W}x${H}  ${(bytes / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
