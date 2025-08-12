/* scripts/generate-sitemap.cjs */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const base =
  (process.env.BASE_URL && String(process.env.BASE_URL)) ||
  (process.argv.find((a) => a.startsWith("--base=")) || "").replace(
    "--base=",
    ""
  ) ||
  "http://localhost:8080";

const creators = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src", "content", "creators.json"), "utf8")
);

const urls = new Set(["/", "/community", "/krov"]);

creators.forEach((c) => {
  const slug = (c && c.slug ? String(c.slug).trim() : "").replace(/^\/+/, "");
  if (slug && slug !== "krov") urls.add("/" + slug);
});

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Array.from(urls)
    .map((u) => `  <url><loc>${base}${u}</loc></url>`)
    .join("\n") +
  `\n</urlset>\n`;

const outPath = path.join(ROOT, "public", "sitemap.xml");
fs.writeFileSync(outPath, xml);
console.log(`Wrote ${outPath} with ${urls.size} routes using base=${base}`);
