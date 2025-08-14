<template>
  <div
    class="creator-demo"
    :data-theme="isDark ? 'dark' : 'light'"
    ref="rootEl"
  >
    <a href="#main" class="skip">Skip to content</a>

    <!-- Header -->
    <header class="demo-header" :class="{ scrolled }" role="banner">
      <div class="h-inner">
        <button class="sigil" @click="scrollToTop" aria-label="Scroll to top">
          ✦
        </button>
        <div class="brand" aria-label="Brand">
          <span class="name">ASTRA // DEMO</span>
        </div>
        <nav class="actions" aria-label="Page actions">
          <button
            class="btn ghost"
            @click="toggleTheme"
            :aria-pressed="isDark ? 'true' : 'false'"
          >
            {{ isDark ? "Light" : "Dark" }}
          </button>
          <a class="btn primary" href="#contact">Work With Us</a>
        </nav>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <canvas ref="stars" class="stars" aria-hidden="true"></canvas>
      <div class="aurora" aria-hidden="true"></div>
      <div class="glow-top" aria-hidden="true"></div>

      <div class="hero-inner">
        <h1 id="hero-title" class="headline">
          Craft the impossible. <span class="spark">Together.</span>
        </h1>
        <p class="tagline">
          Bespoke creator pages with original navbars, motion you can feel, and
          performance that scores. Built by hand—shipped like craft.
        </p>
        <div class="hero-actions">
          <a href="#work" class="btn primary">See Work</a>
          <a href="#process" class="btn ghost">How We Build</a>
        </div>

        <!-- Trust row -->
        <ul class="trust" aria-label="Highlights">
          <li>Zero bloat</li>
          <li>Motion-safe</li>
          <li>SEO-ready</li>
        </ul>
      </div>
    </section>

    <main id="main" class="main" role="main">
      <!-- Features -->
      <section
        id="features"
        class="section features"
        aria-labelledby="features-title"
      >
        <h2 id="features-title" class="section-title">Built for creators</h2>
        <ul class="grid">
          <li class="card reveal">
            <div class="icon" aria-hidden="true">🖋️</div>
            <h3>Art-directed minimalism</h3>
            <p>
              Hard edges, soft glow. Typography up front; chrome stays quiet.
            </p>
          </li>
          <li class="card reveal">
            <div class="icon" aria-hidden="true">⚡</div>
            <h3>Performance first</h3>
            <p>
              Canvas stars in ~1ms/frame on modern GPUs. No libraries required.
            </p>
          </li>
          <li class="card reveal">
            <div class="icon" aria-hidden="true">🧭</div>
            <h3>Ownable layout</h3>
            <p>Navbar, hero, and modules themed to your vibe—not a template.</p>
          </li>
          <li class="card reveal">
            <div class="icon" aria-hidden="true">🛡️</div>
            <h3>Accessible by default</h3>
            <p>
              Keyboard, contrast, ARIA, and reduced-motion respected end-to-end.
            </p>
          </li>
        </ul>
      </section>

      <!-- Selected Work -->
      <section
        id="work"
        class="section showcase"
        aria-labelledby="showcase-title"
      >
        <h2 id="showcase-title" class="section-title">Selected work</h2>
        <div class="masonry">
          <article class="tile reveal" v-for="(item, i) in tiles" :key="i">
            <div class="tile-ink"></div>
            <div class="tile-inner">
              <header class="tile-head">
                <h3>{{ item.title }}</h3>
                <ul class="pill-row" aria-label="Tags">
                  <li v-for="(t, j) in item.tags" :key="j" class="pill">
                    {{ t }}
                  </li>
                </ul>
              </header>
              <p>{{ item.desc }}</p>
              <a
                :href="item.href"
                class="link"
                target="_blank"
                rel="noopener"
                :aria-label="'Open ' + item.title"
              >
                Open
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- Process -->
      <section
        id="process"
        class="section process"
        aria-labelledby="process-title"
      >
        <h2 id="process-title" class="section-title">
          Process that respects your time
        </h2>
        <ol class="steps">
          <li class="step reveal">
            <div class="bubble">1</div>
            <div class="body">
              <h3>30-min brief</h3>
              <p>
                Goals, tone, assets. We define the first version and guardrails.
              </p>
            </div>
          </li>
          <li class="step reveal">
            <div class="bubble">2</div>
            <div class="body">
              <h3>Playable draft</h3>
              <p>
                Live URL in days: hero, navbar, and one key module. Iterate
                fast.
              </p>
            </div>
          </li>
          <li class="step reveal">
            <div class="bubble">3</div>
            <div class="body">
              <h3>Finish & ship</h3>
              <p>Polish, accessibility pass, and performance budget locked.</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Offerings -->
      <section id="offer" class="section offer" aria-labelledby="offer-title">
        <h2 id="offer-title" class="section-title">Out-of-the-box options</h2>
        <ul class="offer-grid">
          <li class="offer-card reveal">
            <h3>Starter</h3>
            <ul class="list">
              <li>Hero + custom navbar</li>
              <li>One content module</li>
              <li>Light/Dark theme</li>
            </ul>
            <div class="cta">
              <a href="#contact" class="btn primary">Start</a>
            </div>
          </li>
          <li class="offer-card featured reveal">
            <h3>Creator Pro</h3>
            <ul class="list">
              <li>Hero + navbar + 3 modules</li>
              <li>Brand tokens + copy polish</li>
              <li>Performance & a11y pass</li>
            </ul>
            <div class="cta">
              <a href="#contact" class="btn primary">Book</a>
            </div>
          </li>
          <li class="offer-card reveal">
            <h3>Bespoke</h3>
            <ul class="list">
              <li>Custom motion system</li>
              <li>Integrations (Discord/GitHub)</li>
              <li>Unique footer & sections</li>
            </ul>
            <div class="cta">
              <a href="#contact" class="btn primary">Talk</a>
            </div>
          </li>
        </ul>
      </section>

      <!-- Callout -->
      <section class="section callout" aria-labelledby="callout-title">
        <h2 id="callout-title" class="visually-hidden">Call to action</h2>
        <blockquote class="quote">
          <p>“Simplicity is not a style; it is a decision.”</p>
          <cite>— Astra Principle</cite>
        </blockquote>
        <a
          id="contact"
          href="https://discord.com/invite/JfMh3P57zh"
          class="btn primary big"
          target="_blank"
          rel="noopener"
        >
          Start a build
        </a>
      </section>
    </main>

    <!-- Footer -->
    <footer class="app-footer" role="contentinfo">
      <div class="f-inner">
        <span>© {{ year }} Creator Demo · Forged with Vue 3</span>
        <nav aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#work">Work</a>
          <button class="linkish" @click="scrollToTop">Top ↑</button>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineOptions({ name: "CreatorDemo" });
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const year = new Date().getFullYear();
const rootEl = ref(null);

/* Theme (persisted, ESLint-safe) */
const THEME_KEY = "wt_demo_theme";
const prefersDark = !!(
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
);
const saved =
  (typeof localStorage !== "undefined" && localStorage.getItem(THEME_KEY)) ||
  null;
const isDark = ref(saved ? saved === "dark" : prefersDark);

watch(isDark, (v) => {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(THEME_KEY, v ? "dark" : "light");
    } catch (e) {
      // storage might be unavailable (private mode); ignore safely
      void e;
    }
  }
  document.documentElement.style.colorScheme = v ? "dark" : "light";
});

function toggleTheme() {
  isDark.value = !isDark.value;
}

/* Header scroll state */
const scrolled = ref(false);
function handleScroll() {
  scrolled.value = window.scrollY > 8;
}

/* Reveal-on-view */
let io;
function mountReveals() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  els.forEach((el) => io.observe(el));
}

/* Showcase data */
const tiles = ref([
  {
    title: "Krov — Systems Minimalism",
    desc: "Monochrome, sigil-forward, razor UI rhythm.",
    tags: ["Navbar", "Hero", "Repos"],
    href: "https://github.com/graykrov",
  },
  {
    title: "Arc-Forge Components",
    desc: "Nebula hero + gallery kit.",
    tags: ["Gallery", "Theme"],
    href: "#",
  },
  {
    title: "Okami Launch",
    desc: "Glassy cards, tuned gradients.",
    tags: ["Marketing"],
    href: "#",
  },
  {
    title: "Community Cards",
    desc: "Avatar-centric grid on mobile.",
    tags: ["Community"],
    href: "#",
  },
  {
    title: "Announce System",
    desc: "Discord → JSON bridge, clean type.",
    tags: ["Automation"],
    href: "#",
  },
  {
    title: "Creator Placeholders",
    desc: "Sweet holding pages w/ motion.",
    tags: ["Placeholder"],
    href: "#",
  },
]);

/* Starfield (fast; static if reduced motion) */
const stars = ref(/** @type {HTMLCanvasElement|null} */ (null));
let raf = 0,
  ctx,
  w = 0,
  h = 0,
  dpr = 1;
let buf = [];
const reduce = !!(
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
);

function resize() {
  if (!stars.value) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  // Use precise bounding box to avoid off-by-one layout overflow
  const rect = stars.value.getBoundingClientRect();
  w = Math.round(rect.width);
  h = Math.round(rect.height);
  stars.value.width = Math.floor(w * dpr);
  stars.value.height = Math.floor(h * dpr);
  ctx = stars.value.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seed();
  if (reduce) renderStatic();
}

function seed() {
  const count = Math.floor((w * h) / 9000);
  buf = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.1 + 0.2,
    tw: Math.random() * Math.PI * 2,
    sp: 0.015 + Math.random() * 0.03,
    dx: (Math.random() - 0.5) * 0.02,
    dy: (Math.random() - 0.5) * 0.02,
  }));
}

function starColor() {
  const v = getComputedStyle(rootEl.value || document.documentElement)
    .getPropertyValue("--star")
    .trim();
  return v || "#fff";
}

function fog() {
  const g = ctx.createRadialGradient(
    w * 0.7,
    h * 0.3,
    0,
    w * 0.7,
    h * 0.3,
    Math.max(w, h)
  );
  g.addColorStop(
    0,
    isDark.value ? "rgba(120,120,255,0.10)" : "rgba(120,120,255,0.08)"
  );
  g.addColorStop(1, isDark.value ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)");
  return g;
}

function renderStatic() {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = fog();
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = starColor();
  for (const s of buf) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tick() {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = fog();
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = starColor();

  for (const s of buf) {
    s.tw += s.sp;
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < -5) s.x = w + 5;
    if (s.x > w + 5) s.x = -5;
    if (s.y < -5) s.y = h + 5;
    if (s.y > h + 5) s.y = -5;

    ctx.globalAlpha = 0.6 + Math.sin(s.tw) * 0.4;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  raf = requestAnimationFrame(tick);
}

/* Helpers */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Lifecycle */
onMounted(() => {
  document.documentElement.style.colorScheme = isDark.value ? "dark" : "light";
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  mountReveals();

  resize();
  window.addEventListener("resize", resize, { passive: true });
  if (!reduce) raf = requestAnimationFrame(tick);
});
watch(isDark, () => {
  // re-draw fog color when theme flips
  requestAnimationFrame(() => (reduce ? renderStatic() : renderStatic()));
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", resize);
  if (io) io.disconnect();
  cancelAnimationFrame(raf);
});
</script>

<style scoped lang="scss">
/* THEME TOKENS */
.creator-demo[data-theme="light"] {
  --bg: #f7f8ff;
  --surface: #ffffff;
  --text: #0f1222;
  --muted: #394154;
  --primary: #9aaaff;
  --primary-ink: #1c2033;
  --accent: #2aa7ff;
  --star: #222;
  --glow: 0 10px 40px rgba(140, 160, 255, 0.25);
}
.creator-demo[data-theme="dark"] {
  --bg: #05060a;
  --surface: #0c0f17;
  --text: #e8ebff;
  --muted: #a5abcc;
  --primary: #9aaaff;
  --primary-ink: #121425;
  --accent: #c9d1ff;
  --star: #fff;
  --glow: 0 10px 50px rgba(100, 130, 255, 0.45);
}

/* Layout */
.creator-demo {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
      1200px 700px at 70% -10%,
      rgba(130, 140, 255, 0.12),
      transparent 65%
    ),
    var(--bg);
  color: var(--text);

  /* 🔒 fix “wasted space” / horizontal scroll from backgrounds */
  overflow-x: clip;
  position: relative;
}
.skip {
  position: absolute;
  left: -9999px;
  top: auto;
}
.skip:focus {
  left: 1rem;
  top: 1rem;
  background: var(--surface);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  box-shadow: var(--glow);
}

/* Header */
.demo-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(120%) blur(8px);
  background: linear-gradient(
    to bottom,
    rgba(10, 12, 20, 0.75),
    rgba(10, 12, 20, 0.35) 60%,
    transparent
  );
  border-bottom: 1px solid rgba(150, 170, 255, 0.08);
  transition: box-shadow 0.3s ease, background 0.3s ease;
}
.demo-header.scrolled {
  box-shadow: 0 6px 32px rgba(30, 40, 80, 0.25);
  background: rgba(10, 12, 20, 0.75);
}
.h-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.sigil {
  font-size: 1.25rem;
  line-height: 1;
  background: transparent;
  border: 1px solid rgba(150, 170, 255, 0.25);
  border-radius: 0.75rem;
  padding: 0.5rem 0.65rem;
  color: var(--accent);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.sigil:hover {
  transform: scale(1.05);
}
.brand .name {
  letter-spacing: 0.16em;
  font-weight: 700;
  opacity: 0.9;
  font-size: 0.95rem;
}
.actions {
  margin-left: auto;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* Hero */
.hero {
  position: relative;
  isolation: isolate;
  /* keep backgrounds inside so they don't create horizontal scroll */
  overflow: hidden;
  height: clamp(48svh, 60svh, 72svh);
  border-bottom: 1px solid rgba(150, 170, 255, 0.08);
}
.stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.aurora {
  position: absolute;
  inset: -10% -20% auto -20%;
  height: 120%;
  background: conic-gradient(
      from 210deg at 70% 20%,
      rgba(130, 150, 255, 0.22),
      rgba(190, 200, 255, 0.12),
      transparent 60%
    ),
    radial-gradient(
      60% 40% at 75% 10%,
      rgba(150, 180, 255, 0.28),
      transparent 60%
    );
  filter: blur(36px) saturate(120%);
  mix-blend-mode: screen;
  animation: drift 22s ease-in-out infinite alternate;
  pointer-events: none;
}
.glow-top {
  position: absolute;
  inset: -5% 0 auto 0;
  height: 40%;
  background: radial-gradient(
    60% 50% at 50% 0%,
    rgba(120, 140, 255, 0.2),
    transparent 60%
  );
  filter: blur(30px);
  mix-blend-mode: screen;
  pointer-events: none;
}
@keyframes drift {
  from {
    transform: translateY(0) rotate(0.2deg);
  }
  to {
    transform: translateY(-2%) rotate(-0.4deg);
  }
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  place-content: center;
  text-align: center;
  height: 100%;
  /* give the headline breathing room – prevents glyph clipping on the right */
  padding: 1.5rem clamp(1rem, 3vw, 2rem);
  max-width: 1100px;
  margin-inline: auto;
  box-sizing: border-box;
}
.headline {
  /* a touch wider range so it scales but never touches the edge */
  font-size: clamp(1.9rem, 3.6vw + 0.4rem, 3.4rem);
  letter-spacing: 0.01em;
  line-height: 1.08;
  margin: 0 0 0.25rem;
  font-weight: 800;
  text-wrap: balance;
  text-shadow: 0 8px 40px rgba(120, 140, 255, 0.25);
  /* subtle inline padding to avoid sub-pixel clipping on some GPUs */
  padding-right: 0.06em;
}
.headline .spark {
  display: inline-block;
  background: linear-gradient(90deg, var(--accent), var(--primary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.tagline {
  margin: 0.5rem auto 1rem;
  max-width: 58ch;
  opacity: 0.9;
  font-size: clamp(0.95rem, 0.6vw + 0.8rem, 1.05rem);
}
.hero-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
.trust {
  margin: 0.9rem 0 0;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  padding: 0;
  list-style: none;
  color: var(--muted);
  font-weight: 700;
  font-size: 0.9rem;
}
.trust li {
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba(150, 170, 255, 0.18);
  border-radius: 999px;
  background: rgba(160, 180, 255, 0.08);
}

/* Sections */
.main {
  flex: 1 1 auto;
  display: block;
}
.section {
  padding: clamp(2.5rem, 3vw + 1rem, 4rem) 1rem;
}
.section-title {
  max-width: 1200px;
  margin: 0 auto 1.25rem;
  font-size: clamp(1.4rem, 1.6vw + 0.8rem, 2rem);
  font-weight: 800;
}

/* Features */
.features {
  content-visibility: auto;
  contain-intrinsic-size: 600px;
}
.features .grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
.features .card {
  grid-column: span 6;
  background: linear-gradient(
    180deg,
    rgba(160, 180, 255, 0.08),
    rgba(120, 140, 255, 0.05)
  );
  border: 1px solid rgba(150, 170, 255, 0.18);
  border-radius: 1rem;
  padding: 1.25rem;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, var(--glow);
}
.features .card h3 {
  font-size: 1.1rem;
  margin: 0.5rem 0 0.25rem;
}
.features .card p {
  color: var(--muted);
}
.features .icon {
  font-size: 1.35rem;
  opacity: 0.9;
}
@media (max-width: 860px) {
  .features .card {
    grid-column: span 12;
  }
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Showcase */
.showcase {
  border-top: 1px solid rgba(150, 170, 255, 0.08);
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
}
.masonry {
  max-width: 1200px;
  margin: 0 auto;
  columns: 3 320px;
  column-gap: 1rem;
}
.tile {
  break-inside: avoid;
  background: var(--surface);
  border-radius: 1rem;
  margin: 0 0 1rem;
  border: 1px solid rgba(150, 170, 255, 0.14);
  overflow: clip;
  box-shadow: var(--glow);
  transition: transform 0.15s ease;
}
.tile:hover {
  transform: translateY(-2px);
}
.tile-ink {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    60% 60% at 30% 0%,
    rgba(140, 160, 255, 0.18),
    transparent 60%
  );
  filter: blur(20px);
  pointer-events: none;
}
.tile-inner {
  position: relative;
  padding: 1.1rem;
}
.tile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.tile h3 {
  font-size: 1.05rem;
  margin: 0;
}
.pill-row {
  display: flex;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.pill {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(150, 170, 255, 0.22);
  border-radius: 999px;
  background: rgba(160, 180, 255, 0.08);
  font-weight: 800;
}
.tile p {
  color: var(--muted);
  margin: 0 0 0.75rem;
}
.tile .link {
  display: inline-block;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Process */
.process {
  content-visibility: auto;
  contain-intrinsic-size: 600px;
}
.steps {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.9rem;
}
.step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
  background: linear-gradient(
    180deg,
    rgba(160, 180, 255, 0.08),
    rgba(120, 140, 255, 0.05)
  );
  border: 1px solid rgba(150, 170, 255, 0.18);
  border-radius: 0.9rem;
  padding: 0.9rem;
}
.bubble {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: var(--primary-ink);
  background: linear-gradient(180deg, var(--accent), var(--primary));
  box-shadow: var(--glow);
}
.step h3 {
  margin: 0 0 0.15rem;
}

/* Offerings */
.offer {
  content-visibility: auto;
  contain-intrinsic-size: 720px;
}
.offer-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.offer-card {
  background: linear-gradient(
    180deg,
    rgba(160, 180, 255, 0.08),
    rgba(120, 140, 255, 0.05)
  );
  border: 1px solid rgba(150, 170, 255, 0.18);
  border-radius: 1rem;
  padding: 1.25rem;
  display: grid;
  gap: 0.6rem;
  align-content: start;
}
.offer-card.featured {
  outline: 2px solid rgba(150, 170, 255, 0.35);
  box-shadow: var(--glow);
}
.offer-card h3 {
  margin: 0;
}
.offer-card .list {
  padding-left: 1rem;
  margin: 0.25rem 0;
  color: var(--muted);
}
.offer-card .cta {
  margin-top: 0.2rem;
}
@media (max-width: 900px) {
  .offer-grid {
    grid-template-columns: 1fr;
  }
}

/* Callout & Footer */
.callout {
  text-align: center;
}
.quote {
  font-size: clamp(1.1rem, 0.8vw + 1rem, 1.5rem);
  font-weight: 700;
  margin: 0 auto 1.25rem;
  max-width: 60ch;
  text-wrap: balance;
}
.quote cite {
  display: block;
  opacity: 0.65;
  font-style: normal;
  margin-top: 0.25rem;
}

.app-footer {
  margin-top: auto;
  border-top: 1px solid rgba(150, 170, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(160, 180, 255, 0.06),
    rgba(120, 140, 255, 0.03)
  );
}
.f-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.f-inner nav {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  --pad-x: 1rem;
  --pad-y: 0.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: var(--pad-y) var(--pad-x);
  border-radius: 0.9rem;
  border: 1px solid transparent;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease,
    background 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}
.btn.primary {
  background: linear-gradient(180deg, var(--accent), var(--primary));
  color: var(--primary-ink);
  box-shadow: var(--glow);
}
.btn.primary.big {
  --pad-x: 1.35rem;
  --pad-y: 0.95rem;
  font-size: 1.05rem;
}
.btn.ghost {
  background: rgba(160, 180, 255, 0.08);
  border-color: rgba(160, 180, 255, 0.25);
  color: var(--accent);
}
.btn:hover {
  transform: translateY(-1px);
}

/* Small screens */
@media (max-width: 560px) {
  .hero {
    height: auto;
    padding: 3rem 0 1.5rem;
  }
  .headline {
    font-size: clamp(1.45rem, 6vw, 2.2rem);
    line-height: 1.08;
  }
  .tagline {
    font-size: 0.95rem;
  }
}
</style>
