// src/utils/meta.js
export function updateHead(opts = {}) {
  const { title, description, image, url, robots } = opts;

  if (title) document.title = title;

  const ensure = (tag, attrs) => {
    const sel =
      tag +
      Object.entries(attrs)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("");
    let el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      document.head.appendChild(el);
    }
    return el;
  };

  const setMeta = (name, content) => {
    if (!content) return;
    const el = ensure("meta", { name });
    el.setAttribute("content", content);
  };
  const setOG = (property, content) => {
    if (!content) return;
    const el = ensure("meta", { property });
    el.setAttribute("content", content);
  };
  const setTwitter = (name, content) => setMeta(name, content);
  const setLinkRel = (rel, href) => {
    if (!href) return;
    const el = ensure("link", { rel });
    el.setAttribute("href", href);
  };

  // Standard
  if (description) setMeta("description", description);
  if (robots) setMeta("robots", robots); // 👈 here’s the robots line

  if (url) {
    setOG("og:url", url);
    setLinkRel("canonical", url);
  }
  if (title) {
    setOG("og:title", title);
    setTwitter("twitter:title", title);
  }
  if (description) {
    setOG("og:description", description);
    setTwitter("twitter:description", description);
  }
  if (image) {
    setOG("og:image", image);
    setTwitter("twitter:image", image);
  }
  setTwitter("twitter:card", "summary_large_image");
}
