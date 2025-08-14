<!-- src/pages/creator/CreatorDemo.vue -->
<template>
  <div class="demo-root" :class="['t-' + theme]">
    <!-- ======= HEADER (bespoke) ======= -->
    <header
      class="demo-nav"
      @mouseenter="navHover = true"
      @mouseleave="navHover = false"
    >
      <div class="nav-inner">
        <a class="brand" href="#" aria-label="Demo home">
          <svg
            class="sigil"
            width="36"
            height="36"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" :stop-color="css('--c1')"></stop>
                <stop offset="1" :stop-color="css('--c2')"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#g)"
              d="M32 4l26 15v26L32 60 6 45V19L32 4zm0 8L14 22v20l18 10 18-10V22L32 12z"
            />
            <circle :fill="css('--ink')" cx="32" cy="32" r="4" />
          </svg>
          <span class="wordmark">ARC-FORGE</span>
        </a>

        <nav class="links" aria-label="Primary">
          <a href="#" @click.prevent="openPalette">Actions (⌘K)</a>
          <a href="#" @click.prevent="scrollTo('#gallery')">Gallery</a>
          <a href="#" @click.prevent="scrollTo('#projects')">Projects</a>
          <a href="#" @click.prevent="scrollTo('#timeline')">Timeline</a>
        </nav>

        <div class="controls">
          <button
            class="chip"
            @click="cycleTheme"
            :aria-label="'Theme: ' + theme"
          >
            Theme: {{ themeLabel }}
          </button>
          <button class="chip ghost" @click="openPalette">Command</button>
        </div>
      </div>
      <div class="nav-glow" :class="{ on: navHover }"></div>
    </header>

    <!-- ======= HERO + CANVAS ======= -->
    <section class="hero">
      <canvas ref="bg" class="bg" aria-hidden="true"></canvas>
      <div class="hero-inner">
        <h1
          class="glitch"
          @mouseenter="glitchOn = true"
          @mouseleave="glitchOn = false"
        >
          <span>Design that bends light</span>
          <span aria-hidden="true" class="ghost ghost-a"
            >Design that bends light</span
          >
          <span aria-hidden="true" class="ghost ghost-b"
            >Design that bends light</span
          >
        </h1>
        <p class="sub">Experimental, performant, and unapologetically extra.</p>
        <div class="cta">
          <a
            class="btn btn-solid"
            href="#"
            @click.prevent="scrollTo('#projects')"
            >See Components</a
          >
          <a class="btn btn-wire" href="#" @click.prevent="openPalette"
            >Try Commands</a
          >
        </div>
      </div>
    </section>

    <!-- ======= METRICS ======= -->
    <section class="metrics" aria-label="Live metrics">
      <div class="metric">
        <svg viewBox="0 0 120 120" class="dial" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="track"></circle>
          <circle
            cx="60"
            cy="60"
            r="52"
            class="prog"
            :style="{ strokeDashoffset: dialOffset(uptimePct) }"
          ></circle>
        </svg>
        <div class="m-inner">
          <div class="num">{{ uptimePct }}%</div>
          <div class="label">Uptime (simulated)</div>
        </div>
      </div>
      <div class="metric">
        <div class="num">{{ ping }}ms</div>
        <div class="label">Simulated latency</div>
      </div>
      <div class="metric">
        <div class="num">{{ buildSize }} KB</div>
        <div class="label">Demo bundle size</div>
      </div>
    </section>

    <!-- ======= PROJECT PANELS (3D tilt) ======= -->
    <section class="panels" id="projects" aria-label="Showcase panels">
      <article
        class="panel"
        v-for="p in panels"
        :key="p.title"
        @pointermove="onTilt($event)"
        @pointerleave="resetTilt($event)"
        tabindex="0"
        role="article"
        :aria-label="p.title"
      >
        <h3 class="p-title">{{ p.title }}</h3>
        <p class="p-copy">{{ p.copy }}</p>
        <ul class="p-bullets">
          <li v-for="b in p.points" :key="b">{{ b }}</li>
        </ul>
        <div class="p-chrome">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="p-glow"></div>
      </article>
    </section>

    <!-- ======= MEDIA WALL ======= -->
    <section class="gallery" id="gallery" aria-label="Media wall">
      <div class="g-grid">
        <div v-for="n in 10" :key="n" class="tile" :style="tileStyle(n)">
          <div class="label">#{{ n }}</div>
        </div>
      </div>
    </section>

    <!-- ======= HORIZONTAL TIMELINE ======= -->
    <section class="timeline" id="timeline" aria-label="Milestones">
      <div class="rail" ref="rail">
        <div class="t-card" v-for="(t, i) in timeline" :key="i">
          <div class="t-date">{{ t.when }}</div>
          <div class="t-title">{{ t.title }}</div>
          <p class="t-copy">{{ t.copy }}</p>
        </div>
      </div>
    </section>

    <!-- ======= FOOTER (bespoke) ======= -->
    <footer class="demo-footer" role="contentinfo">
      <div class="f-inner">
        <div class="credit">
          <div class="mono">Built for extremes.</div>
          <div class="sig">© WhispTavern Demo • No frameworks beyond Vue.</div>
        </div>
        <div class="f-actions">
          <button class="chip ghost" @click="cycleTheme">Cycle Theme</button>
          <button class="chip" @click="scrollTo('body')">Back to top ↑</button>
        </div>
      </div>
    </footer>

    <!-- ======= COMMAND PALETTE ======= -->
    <div
      class="palette"
      v-if="paletteOpen"
      @click.self="closePalette"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div class="pal-body" @keydown.esc="closePalette" ref="pal">
        <input
          class="pal-input"
          type="text"
          v-model="palQuery"
          placeholder="Type a command… (theme / scroll / glow)"
          autofocus
        />
        <ul class="pal-list">
          <li v-for="(cmd, i) in filteredCmds" :key="i" @click="run(cmd)">
            <span class="cmd">{{ cmd.label }}</span>
            <span class="hint">{{ cmd.hint }}</span>
          </li>
          <li v-if="!filteredCmds.length" class="empty">
            No matching commands
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue";

/* =========================
   THEME ENGINE (CSS vars)
   ========================= */
const theme = ref("neon"); // 'neon' | 'vapor' | 'mono'
const themeLabel = computed(() => {
  return theme.value === "neon"
    ? "Neon"
    : theme.value === "vapor"
    ? "Vaporwave"
    : "Monochrome";
});
function cycleTheme() {
  theme.value =
    theme.value === "neon"
      ? "vapor"
      : theme.value === "vapor"
      ? "mono"
      : "neon";
}
function css(name) {
  // helper for inline SVG stop-colors: returns current CSS var value
  const el = document.documentElement;
  return getComputedStyle(el).getPropertyValue(name).trim() || "#fff";
}
watchEffect(() => {
  const r = document.documentElement.style;
  if (theme.value === "neon") {
    r.setProperty("--bg", "#0b0f14");
    r.setProperty("--ink", "#ecf4ff");
    r.setProperty("--c1", "#00f0ff");
    r.setProperty("--c2", "#9b5cff");
    r.setProperty("--accent", "#33ff88");
  } else if (theme.value === "vapor") {
    r.setProperty("--bg", "#221133");
    r.setProperty("--ink", "#fff1fa");
    r.setProperty("--c1", "#ff71ce");
    r.setProperty("--c2", "#01cdfe");
    r.setProperty("--accent", "#05ffa1");
  } else {
    r.setProperty("--bg", "#111");
    r.setProperty("--ink", "#f5f5f5");
    r.setProperty("--c1", "#888");
    r.setProperty("--c2", "#ccc");
    r.setProperty("--accent", "#fff");
  }
});

/* =========================
   NAV + HERO
   ========================= */
const navHover = ref(false);
const glitchOn = ref(false);
function scrollTo(sel) {
  const tgt = sel === "body" ? document.body : document.querySelector(sel);
  if (!tgt) return;
  tgt.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   METRICS (simulated)
   ========================= */
const uptimePct = ref(99);
const ping = ref(12);
const buildSize = ref(87);
let metricsTimer;
onMounted(() => {
  metricsTimer = setInterval(() => {
    uptimePct.value = 99 + Math.floor(Math.random() * 2);
    ping.value = 10 + Math.floor(Math.random() * 30);
    buildSize.value = 70 + Math.floor(Math.random() * 40);
  }, 1400);
});
onBeforeUnmount(() => clearInterval(metricsTimer));
const dialCirc = 2 * Math.PI * 52;
const dialOffset = (pct) => String(dialCirc - (pct / 100) * dialCirc);

/* =========================
   PANELS (3D tilt)
   ========================= */
const panels = [
  {
    title: "Micro-interactions",
    copy: "Delight without drag: hover physics, ink ripples, and haptics.",
    points: ["GPU-cheap", "A11y-aware", "Motion-reduced fallback"],
  },
  {
    title: "Adaptive Visuals",
    copy: "Theme systems as code: flip palettes and layout density live.",
    points: ["Tokens → CSS vars", "Palette switch", "Fluid type"],
  },
  {
    title: "Edge Performance",
    copy: "Critical-path first paint; defer the rest with intent.",
    points: ["Lazy-hydrate", "content-visibility", "Containment"],
  },
];
function onTilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const dx = (e.clientX - cx) / (r.width / 2);
  const dy = (e.clientY - cy) / (r.height / 2);
  el.style.setProperty("--rx", String((-dy * 6).toFixed(2)) + "deg");
  el.style.setProperty("--ry", String((dx * 8).toFixed(2)) + "deg");
}
function resetTilt(e) {
  const el = e.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
}

/* =========================
   GALLERY TILES
   ========================= */
function tileStyle(n) {
  const seed = n * 137;
  const a = (seed * 31) % 360;
  const b = (seed * 67) % 360;
  return {
    background: `conic-gradient(from 90deg at 50% 50%, hsl(${a} 90% 55%), hsl(${b} 90% 60%), hsl(${a} 90% 55%))`,
  };
}

/* =========================
   TIMELINE (horizontal)
   ========================= */
const timeline = [
  {
    when: "2024-Q4",
    title: "Prototype Lab",
    copy: "First pass on component lab and theme tokens.",
  },
  {
    when: "2025-Q1",
    title: "Neon Modes",
    copy: "Live palette switching and motion-reduced choreography.",
  },
  {
    when: "2025-Q2",
    title: "Edge-First",
    copy: "Content visibility, hydration boundaries, idle tasks.",
  },
  {
    when: "2025-Q3",
    title: "Creator Kits",
    copy: "Composable kits: nav variants, intro blocks, media walls.",
  },
  {
    when: "2025-Q4",
    title: "Automation",
    copy: "Data pipes: Sheets → JSON → Pages.",
  },
];
const rail = ref(null);

/* =========================
   COMMAND PALETTE
   ========================= */
const paletteOpen = ref(false);
const palQuery = ref("");
const pal = ref(null);
const commands = [
  {
    label: "Switch theme → Neon",
    hint: "theme neon",
    run: () => (theme.value = "neon"),
  },
  {
    label: "Switch theme → Vaporwave",
    hint: "theme vapor",
    run: () => (theme.value = "vapor"),
  },
  {
    label: "Switch theme → Monochrome",
    hint: "theme mono",
    run: () => (theme.value = "mono"),
  },
  {
    label: "Scroll → Projects",
    hint: "go projects",
    run: () => scrollTo("#projects"),
  },
  {
    label: "Scroll → Gallery",
    hint: "go gallery",
    run: () => scrollTo("#gallery"),
  },
  {
    label: "Scroll → Timeline",
    hint: "go timeline",
    run: () => scrollTo("#timeline"),
  },
  {
    label: "Toggle nav glow",
    hint: "glow",
    run: () => (navHover.value = !navHover.value),
  },
];
const filteredCmds = computed(() => {
  const q = palQuery.value.trim().toLowerCase();
  if (!q) return commands;
  return commands.filter((c) =>
    (c.label + " " + c.hint).toLowerCase().includes(q)
  );
});
function run(cmd) {
  cmd.run();
  closePalette();
}
function openPalette() {
  paletteOpen.value = true;
  palQuery.value = "";
  setTimeout(() => pal.value?.querySelector("input")?.focus(), 0);
}
function closePalette() {
  paletteOpen.value = false;
}
function onKey(e) {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
  }
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

/* =========================
   CANVAS PARTICLE FIELD
   ========================= */
const bg = ref(null);
let raf = 0,
  ctx,
  w = 0,
  h = 0,
  particles = [],
  prefersReducedMotion = false;

function initCanvas() {
  const c = bg.value;
  if (!c) return;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion = mq.matches;
  ctx = c.getContext("2d");
  onResize();
  createParticles();
  draw();
  window.addEventListener("resize", onResize, { passive: true });
}
function destroyCanvas() {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", onResize);
}
function onResize() {
  const c = bg.value;
  if (!c) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = c.clientWidth;
  h = c.clientHeight;
  c.width = Math.floor(w * dpr);
  c.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function createParticles() {
  const count = prefersReducedMotion ? 24 : 72;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: 1 + Math.random() * 2,
  }));
}
function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  // subtle grid
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#fff";
  for (let x = 0; x < w; x += 40) ctx.fillRect(x, 0, 1, h);
  for (let y = 0; y < h; y += 40) ctx.fillRect(0, y, w, 1);
  ctx.globalAlpha = 1;

  // neon connections
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    a.x += a.vx;
    a.y += a.vy;
    if (a.x < 0 || a.x > w) a.vx *= -1;
    if (a.y < 0 || a.y > h) a.vy *= -1;

    ctx.beginPath();
    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
    ctx.fillStyle = css("--c2");
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 120 * 120) {
        const alpha = 1 - d2 / (120 * 120);
        ctx.strokeStyle = css("--c1");
        ctx.globalAlpha = alpha * 0.55;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  raf = requestAnimationFrame(draw);
}
onMounted(() => {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initCanvas();
  }
});
onBeforeUnmount(destroyCanvas);
</script>

<style scoped lang="scss">
/* Local, self-contained palette (overridden via JS) */
:root {
  --bg: #0b0f14;
  --ink: #ecf4ff;
  --c1: #00f0ff;
  --c2: #9b5cff;
  --accent: #33ff88;
}

.demo-root {
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
}

/* ======= Header ======= */
.demo-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(6px);
  background: color-mix(in oklab, var(--bg) 80%, transparent 20%);
  border-bottom: 1px solid color-mix(in oklab, var(--ink) 12%, transparent);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.6rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
}
.brand {
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  text-decoration: none;
  color: var(--ink);
  font-weight: 900;
  letter-spacing: 0.12em;
  .sigil {
    filter: drop-shadow(
      0 0 8px color-mix(in oklab, var(--c2) 60%, transparent)
    );
  }
  .wordmark {
    opacity: 0.95;
  }
}
.links {
  display: inline-flex;
  gap: 1.1rem;
  a {
    color: var(--ink);
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    opacity: 0.85;
    position: relative;
  }
  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: linear-gradient(90deg, var(--c1), var(--c2));
    transform: scaleX(0);
    transform-origin: 50% 50%;
    transition: transform 0.18s ease;
  }
  a:hover::after,
  a:focus-visible::after {
    transform: scaleX(1);
  }
}
.controls {
  display: inline-flex;
  gap: 0.6rem;
}
.chip {
  appearance: none;
  border: 1px solid color-mix(in oklab, var(--ink) 18%, transparent);
  background: color-mix(in oklab, var(--bg) 60%, var(--c2) 8%);
  color: var(--ink);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}
.chip.ghost {
  background: transparent;
}

.nav-glow {
  height: 2px;
  background: linear-gradient(90deg, var(--c1), var(--c2), var(--accent));
  opacity: 0;
  transition: opacity 0.2s ease;
}
.nav-glow.on {
  opacity: 0.65;
}

/* ======= Hero ======= */
.hero {
  position: relative;
  min-height: 56vh;
  display: grid;
  place-items: center;
  overflow: clip;
  border-bottom: 1px solid color-mix(in oklab, var(--ink) 12%, transparent);
}
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
}
.hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 3rem 1rem 2rem;
}
.glitch {
  position: relative;
  font-size: clamp(1.6rem, 3.5vw, 3rem);
  font-weight: 1000;
  letter-spacing: 0.02em;
  line-height: 1.1;
  text-transform: uppercase;
  filter: drop-shadow(
    0 6px 22px color-mix(in oklab, var(--c2) 55%, transparent)
  );
}
.glitch .ghost {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: difference;
  opacity: 0.35;
}
.glitch .ghost-a {
  transform: translate3d(2px, -2px, 0);
  color: var(--c1);
}
.glitch .ghost-b {
  transform: translate3d(-2px, 2px, 0);
  color: var(--c2);
}
.sub {
  margin: 0.8rem auto 1.2rem;
  opacity: 0.9;
  max-width: 46ch;
}
.cta {
  display: inline-flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
}
.btn {
  text-decoration: none;
  font-weight: 900;
  border: 1px solid color-mix(in oklab, var(--ink) 22%, transparent);
  padding: 0.7rem 1.1rem;
  border-radius: 0.8rem;
  letter-spacing: 0.02em;
}
.btn-solid {
  background: linear-gradient(135deg, var(--c1), var(--c2));
  color: #0a0a0a;
}
.btn-wire {
  background: transparent;
  color: var(--ink);
}

/* ======= Metrics ======= */
.metrics {
  max-width: 1100px;
  margin: 1.5rem auto 2rem;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.metric {
  position: relative;
  border: 1px solid color-mix(in oklab, var(--ink) 14%, transparent);
  border-radius: 1rem;
  padding: 1rem 1rem 1.1rem;
  background: color-mix(in oklab, var(--bg) 70%, var(--c1) 6%);
}
.metric .num {
  font-size: 1.6rem;
  font-weight: 1000;
}
.metric .label {
  opacity: 0.8;
}
.dial {
  width: 120px;
  height: 120px;
  display: block;
  margin: 0.25rem auto 0.35rem;
}
.track {
  fill: none;
  stroke: color-mix(in oklab, var(--ink) 12%, transparent);
  stroke-width: 8;
}
.prog {
  fill: none;
  stroke: var(--c2);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: calc(2 * 3.14159 * 52);
  transition: stroke-dashoffset 0.4s ease;
}

/* ======= Panels (3D tilt) ======= */
.panels {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.panel {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
  transition: transform 0.14s ease;
  background: color-mix(in oklab, var(--bg) 75%, var(--c2) 8%);
  border: 1px solid color-mix(in oklab, var(--ink) 14%, transparent);
  border-radius: 1rem;
  padding: 1rem 1rem 1.2rem;
  overflow: hidden;
}
.p-title {
  margin: 0 0 0.35rem;
  font-weight: 1000;
  letter-spacing: 0.02em;
}
.p-copy {
  margin: 0 0 0.5rem;
  opacity: 0.9;
}
.p-bullets {
  margin: 0;
  padding-left: 1.1rem;
}
.p-chrome {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  gap: 0.3rem;
}
.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--c1);
  box-shadow: 0 0 16px color-mix(in oklab, var(--c1) 80%, transparent);
}
.p-chrome .dot:nth-child(2) {
  background: var(--c2);
}
.p-chrome .dot:nth-child(3) {
  background: var(--accent);
}
.p-glow {
  position: absolute;
  inset: 40% -20% -20% -20%;
  background: radial-gradient(
    60% 60% at 50% 0%,
    color-mix(in oklab, var(--c2) 40%, transparent),
    transparent
  );
  pointer-events: none;
}

/* ======= Gallery ======= */
.gallery {
  padding: 1.5rem 1rem 2rem;
}
.g-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.tile {
  aspect-ratio: 1 / 1;
  border-radius: 0.8rem;
  border: 1px solid color-mix(in oklab, var(--ink) 12%, transparent);
  position: relative;
  overflow: hidden;
}
.tile .label {
  position: absolute;
  bottom: 0.4rem;
  right: 0.5rem;
  font-weight: 1000;
  font-size: 0.9rem;
  background: color-mix(in oklab, #000 40%, transparent);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

/* ======= Timeline ======= */
.timeline {
  padding: 0.5rem 0 2.5rem;
}
.rail {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding: 0 1rem 1rem;
  scroll-snap-type: x mandatory;
}
.t-card {
  scroll-snap-align: start;
  min-width: 260px;
  max-width: 320px;
  border: 1px solid color-mix(in oklab, var(--ink) 14%, transparent);
  border-radius: 0.9rem;
  padding: 0.9rem;
  background: color-mix(in oklab, var(--bg) 70%, var(--c1) 6%);
}
.t-date {
  opacity: 0.8;
  font-weight: 800;
  margin-bottom: 0.2rem;
}
.t-title {
  font-weight: 1000;
  margin-bottom: 0.25rem;
}

/* ======= Footer ======= */
.demo-footer {
  border-top: 1px solid color-mix(in oklab, var(--ink) 12%, transparent);
  background: color-mix(in oklab, var(--bg) 92%, var(--c1) 4%);
}
.f-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  opacity: 0.85;
}
.sig {
  opacity: 0.7;
  font-size: 0.95rem;
}
.f-actions {
  display: inline-flex;
  gap: 0.6rem;
}

/* ======= Palette ======= */
.palette {
  position: fixed;
  inset: 0;
  background: color-mix(in oklab, #000 60%, transparent);
  display: grid;
  place-items: start center;
  padding-top: 8vh;
  z-index: 60;
}
.pal-body {
  width: min(680px, 92vw);
  background: color-mix(in oklab, var(--bg) 75%, var(--c2) 6%);
  border: 1px solid color-mix(in oklab, var(--ink) 18%, transparent);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}
.pal-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 0;
  outline: none;
  background: color-mix(in oklab, var(--bg) 60%, var(--c1) 8%);
  color: var(--ink);
  font-size: 1rem;
  font-weight: 800;
}
.pal-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  max-height: 50vh;
  overflow: auto;
}
.pal-list li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.6rem 0.7rem;
  border-radius: 0.6rem;
  cursor: pointer;
}
.pal-list li:hover {
  background: color-mix(in oklab, var(--bg) 60%, var(--c2) 12%);
}
.pal-list .cmd {
  font-weight: 900;
}
.pal-list .hint {
  opacity: 0.75;
  font-size: 0.92rem;
}
.pal-list .empty {
  opacity: 0.8;
  display: block;
  text-align: center;
}

/* Mobile polish */
@media (max-width: 640px) {
  .links {
    display: none;
  }
  .hero-inner {
    padding: 2.2rem 1rem 1.6rem;
  }
  .metrics {
    grid-template-columns: 1fr 1fr;
  }
  .f-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .glitch .ghost-a,
  .glitch .ghost-b {
    display: none;
  }
  .panel {
    transition: none;
  }
}
</style>
