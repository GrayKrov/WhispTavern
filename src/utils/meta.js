// src/utils/meta.js
export function ensureMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

export function setMetaContent(selector, content, attrsIfCreate) {
  const el = ensureMeta(selector, attrsIfCreate);
  el.setAttribute("content", content);
}

export function updateHead({ title, description, image, url }) {
  // Title
  if (title) document.title = title;

  // Description
  if (description) {
    setMetaContent('meta[name="description"]', description, {
      name: "description",
    });
    setMetaContent('meta[property="og:description"]', description, {
      property: "og:description",
    });
    setMetaContent('meta[name="twitter:description"]', description, {
      name: "twitter:description",
    });
  }

  // Open Graph
  if (title)
    setMetaContent('meta[property="og:title"]', title, {
      property: "og:title",
    });
  setMetaContent('meta[property="og:type"]', "website", {
    property: "og:type",
  });
  if (url)
    setMetaContent('meta[property="og:url"]', url, { property: "og:url" });

  // Image
  if (image) {
    setMetaContent('meta[property="og:image"]', image, {
      property: "og:image",
    });
    setMetaContent('meta[name="twitter:image"]', image, {
      name: "twitter:image",
    });
  }

  // Twitter
  setMetaContent('meta[name="twitter:card"]', "summary_large_image", {
    name: "twitter:card",
  });

  // Canonical
  if (url) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }
}
