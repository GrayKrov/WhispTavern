/* Build AVIF/WebP assets from JPG/PNG using sharp */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const DIRS = ["src/assets/images", "src/assets/avatars", "src/assets/logos"];
const exts = new Set([".jpg", ".jpeg", ".png"]);
const exists = (p) => fs.existsSync(p);

async function convertOne(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!exts.has(ext)) return;

  const base = absPath.slice(0, -ext.length);
  const avifOut = `${base}.avif`;
  const webpOut = `${base}.webp`;
  if (exists(avifOut) && exists(webpOut)) return;

  const isAvatar = /[/\\]avatars[/\\]/i.test(absPath);
  const resize = isAvatar
    ? { width: 512, height: 512, fit: "cover", withoutEnlargement: true }
    : { width: 1920, withoutEnlargement: true };

  const input = sharp(absPath).resize(resize);

  if (!exists(avifOut)) {
    await input
      .clone()
      .avif({ quality: isAvatar ? 50 : 45, effort: 6 })
      .toFile(avifOut);
    console.log("✔ AVIF", path.relative(ROOT, avifOut));
  }
  if (!exists(webpOut)) {
    await input
      .clone()
      .webp({ quality: isAvatar ? 70 : 60 })
      .toFile(webpOut);
    console.log("✔ WEBP", path.relative(ROOT, webpOut));
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p);
    else convertOne(p).catch((e) => console.error("Image error:", e, p));
  });
}

for (const d of DIRS) {
  const abs = path.join(ROOT, d);
  if (exists(abs)) walk(abs);
}
