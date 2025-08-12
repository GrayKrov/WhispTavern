/* scripts/build-images.cjs
   Convert images in src/assets/{images,avatars,logos} to .webp and .avif.
   Usage: npm run images:build
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const roots = ["src/assets/images", "src/assets/avatars", "src/assets/logos"];

const exts = [".jpg", ".jpeg", ".png"];

async function convert(file) {
  const dir = path.dirname(file);
  const name = path.basename(file, path.extname(file));
  const webp = path.join(dir, `${name}.webp`);
  const avif = path.join(dir, `${name}.avif`);

  if (!fs.existsSync(webp)) {
    await sharp(file).webp({ quality: 82 }).toFile(webp);
    console.log("→ webp", webp);
  }
  if (!fs.existsSync(avif)) {
    await sharp(file).avif({ quality: 50 }).toFile(avif);
    console.log("→ avif", avif);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (exts.includes(path.extname(full).toLowerCase())) queue.push(full);
  }
}

const queue = [];
roots.forEach((r) => fs.existsSync(r) && walk(r));

(async () => {
  for (const f of queue) {
    try {
      await convert(f);
    } catch (e) {
      console.error("✖", f, e.message);
    }
  }
  console.log("Done.");
})();
