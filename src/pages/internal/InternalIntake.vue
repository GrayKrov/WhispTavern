<!-- src/pages/internal/InternalIntake.vue -->
<template>
  <div class="intake-pro">
    <!-- HEADER -->
    <header class="top">
      <div class="lhs">
        <h1>Creator Control Panel</h1>
        <p class="sub">Private overview • filters • Kanban • exports • notes</p>
      </div>

      <div class="rhs">
        <button class="btn ghost" @click="exportJSON">Export JSON</button>
        <button class="btn" @click="exportCSV">Export CSV</button>
      </div>
    </header>

    <!-- KPIs -->
    <section class="kpis">
      <div class="kpi">
        <div class="num">{{ totals }}</div>
        <div class="label">Total</div>
      </div>
      <div class="kpi good">
        <div class="num">{{ counts.live || 0 }}</div>
        <div class="label">Live</div>
      </div>
      <div class="kpi warn">
        <div class="num">{{ counts["in-progress"] || 0 }}</div>
        <div class="label">In Progress</div>
      </div>
      <div class="kpi dim">
        <div class="num">{{ counts["coming-soon"] || 0 }}</div>
        <div class="label">Coming Soon</div>
      </div>
      <div class="kpi dim">
        <div class="num">{{ counts.planned || 0 }}</div>
        <div class="label">Planned</div>
      </div>
      <div class="kpi alert">
        <div class="num">{{ missingCount }}</div>
        <div class="label">Missing assets</div>
      </div>
      <div class="kpi focus">
        <div class="num">{{ avgReadiness }}%</div>
        <div class="label">Avg readiness</div>
      </div>
    </section>

    <!-- DISTRIBUTION BAR -->
    <section class="dist">
      <div class="dist-bar" aria-label="Status distribution">
        <div
          class="seg live"
          :style="{ '--w': segWidth('live') }"
          :title="distTitle('Live')"
        ></div>
        <div
          class="seg prog"
          :style="{ '--w': segWidth('in-progress') }"
          :title="distTitle('In Progress')"
        ></div>
        <div
          class="seg soon"
          :style="{ '--w': segWidth('coming-soon') }"
          :title="distTitle('Coming Soon')"
        ></div>
        <div
          class="seg plan"
          :style="{ '--w': segWidth('planned') }"
          :title="distTitle('Planned')"
        ></div>
      </div>
      <small class="hint">Hover segments for exact counts</small>
    </section>

    <!-- CONTROLS -->
    <section class="controls">
      <input
        v-model="q"
        class="search"
        type="search"
        placeholder="Search by name, slug, or tags…"
        aria-label="Search creators"
      />

      <div class="row wrap">
        <div class="chips">
          <button
            v-for="s in statuses"
            :key="s.key"
            :class="['chip', 'chip--status', { active: statusSet.has(s.key) }]"
            @click="toggleStatus(s.key)"
          >
            {{ s.label }} ({{ counts[s.key] || 0 }})
          </button>

          <label class="check">
            <input type="checkbox" v-model="onlyMissing" />
            Only missing assets
          </label>
        </div>

        <div class="view">
          <label class="sel">
            <span>Sort</span>
            <select v-model="sortKey">
              <option value="readiness">Readiness (desc)</option>
              <option value="name">Name (A→Z)</option>
              <option value="status">Status</option>
              <option value="priority">Priority (local)</option>
            </select>
          </label>

          <div class="toggle">
            <button
              class="btn ghost"
              :class="{ active: view === 'table' }"
              @click="view = 'table'"
            >
              Table
            </button>
            <button
              class="btn ghost"
              :class="{ active: view === 'kanban' }"
              @click="view = 'kanban'"
            >
              Kanban
            </button>
            <button
              class="btn ghost"
              :class="{ active: view === 'grid' }"
              @click="view = 'grid'"
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      <div class="tags" v-if="allTags.length">
        <span class="label">Tags:</span>
        <button
          v-for="t in allTags"
          :key="t"
          :class="['chip', { active: tagSet.has(t) }]"
          @click="toggleTag(t)"
        >
          {{ t }}
        </button>
        <button class="chip ghost" v-if="tagSet.size" @click="clearTags">
          Clear tags
        </button>
      </div>
    </section>

    <!-- VIEWS -->
    <section v-if="view === 'table'" class="table-wrap">
      <table class="table" aria-label="Creators">
        <thead>
          <tr>
            <th>Creator</th>
            <th>Status</th>
            <th>Readiness</th>
            <th>Tags</th>
            <th class="center">Avatar</th>
            <th class="center">Banner</th>
            <th class="center">Links</th>
            <th class="center">Blurb</th>
            <th class="center">Priority</th>
            <th>Route</th>
            <th>Needs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredSorted" :key="c.slug">
            <td class="name">
              <strong>{{ c.name }}</strong>
              <div class="slug">/{{ c.slug }}</div>
              <div class="tiny">
                <label>
                  Note:
                  <input
                    class="note"
                    :value="noteFor(c.slug)"
                    @input="(e) => setNote(c.slug, e.target.value)"
                    placeholder="private note (local)"
                  />
                </label>
              </div>
            </td>

            <td>
              <span :class="['status', 's--' + normalizeStatus(c.status)]">
                {{ prettyStatus(c.status) }}
              </span>
            </td>

            <td class="readiness">
              <div class="bar"><span :style="{ width: score(c) + '%' }" /></div>
              <div class="pct">{{ score(c) }}%</div>
            </td>

            <td>
              <span v-for="t in c.tags || []" :key="t" class="tag">{{
                t
              }}</span>
            </td>

            <td class="center">{{ c.avatar ? "✅" : "—" }}</td>
            <td class="center">{{ c.banner ? "✅" : "—" }}</td>
            <td class="center">
              {{ c.links && c.links.length ? c.links.length : "—" }}
            </td>
            <td class="center">{{ c.blurb ? "✅" : "—" }}</td>

            <td class="center">
              <select
                class="prio"
                :value="priorityFor(c.slug)"
                @change="(e) => setPriority(c.slug, Number(e.target.value))"
                title="Local priority 0–3"
              >
                <option :value="0">0</option>
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
              </select>
            </td>

            <td>
              <RouterLink :to="routeFor(c)" class="route">open</RouterLink>
            </td>

            <td class="needs">
              <span v-if="!c.avatar" class="need">avatar</span>
              <span v-if="!c.blurb" class="need">blurb</span>
              <span v-if="!(c.links && c.links.length)" class="need"
                >links</span
              >
              <span v-if="!c.banner" class="need dim">banner</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!filteredSorted.length" class="empty">
        No creators match your filters.
      </p>
    </section>

    <!-- KANBAN -->
    <section v-else-if="view === 'kanban'" class="kanban">
      <div v-for="col in kanbanCols" :key="col.key" class="col">
        <header class="col-head">
          <h3>{{ col.label }}</h3>
          <span class="count">{{ byStatus[col.key]?.length || 0 }}</span>
        </header>

        <div class="stack">
          <article
            v-for="c in byStatus[col.key]"
            :key="c.slug"
            class="card"
            :style="{ '--accent': cardAccent(c) }"
            :title="'/' + c.slug"
          >
            <header class="row gap">
              <strong class="truncate">{{ c.name }}</strong>
              <span class="chip mini">P{{ priorityFor(c.slug) }}</span>
            </header>

            <div class="score">
              <div class="bar mini">
                <span :style="{ width: score(c) + '%' }" />
              </div>
              <div class="pct mini">{{ score(c) }}%</div>
            </div>

            <div class="tags mini">
              <span
                v-for="t in (c.tags || []).slice(0, 4)"
                :key="t"
                class="tag tiny"
                >{{ t }}</span
              >
            </div>

            <div class="needs mini">
              <span v-if="!c.avatar" class="need">avatar</span>
              <span v-if="!c.blurb" class="need">blurb</span>
              <span v-if="!(c.links && c.links.length)" class="need"
                >links</span
              >
            </div>

            <footer class="row between">
              <RouterLink :to="routeFor(c)" class="route">open</RouterLink>
              <select
                class="prio sm"
                :value="priorityFor(c.slug)"
                @change="(e) => setPriority(c.slug, Number(e.target.value))"
              >
                <option :value="0">P0</option>
                <option :value="1">P1</option>
                <option :value="2">P2</option>
                <option :value="3">P3</option>
              </select>
            </footer>
          </article>
        </div>
      </div>
    </section>

    <!-- GRID (compact cards) -->
    <section v-else class="card-grid">
      <article
        v-for="c in filteredSorted"
        :key="c.slug"
        class="mini-card"
        :style="{ '--accent': cardAccent(c) }"
      >
        <header class="row gap">
          <strong class="truncate">{{ c.name }}</strong>
          <span :class="['status', 'tiny', 's--' + normalizeStatus(c.status)]">
            {{ prettyStatus(c.status) }}
          </span>
        </header>

        <div class="row gap tiny">
          <span class="chip tiny">/{{ c.slug }}</span>
          <span class="chip tiny">P{{ priorityFor(c.slug) }}</span>
          <span class="chip tiny">{{ score(c) }}%</span>
        </div>

        <div class="tags tiny">
          <span
            v-for="t in (c.tags || []).slice(0, 3)"
            :key="t"
            class="tag tiny"
            >{{ t }}</span
          >
        </div>

        <footer class="row between">
          <RouterLink :to="routeFor(c)" class="route">open</RouterLink>
          <button class="btn ghost sm" @click="cyclePriority(c.slug)">
            prio+1
          </button>
        </footer>
      </article>

      <p v-if="!filteredSorted.length" class="empty">
        No creators match your filters.
      </p>
    </section>
  </div>
</template>

<script setup>
/* eslint-disable vue/multi-word-component-names */
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import creators from "@/content/creators.json";

/* ---------- Local state ---------- */
const q = ref("");
const onlyMissing = ref(false);
const sortKey = ref("readiness"); // readiness | name | status | priority
const view = ref("table"); // table | kanban | grid

const statuses = [
  { key: "live", label: "Live" },
  { key: "in-progress", label: "In Progress" },
  { key: "coming-soon", label: "Coming Soon" },
  { key: "planned", label: "Planned" },
];
const statusSet = ref(new Set(statuses.map((s) => s.key)));

const allTags = computed(() => {
  const set = new Set();
  for (const c of creators) (c.tags || []).forEach((t) => set.add(t));
  return Array.from(set).sort();
});
const tagSet = ref(new Set());

/* ---------- Helpers ---------- */
function toggleStatus(k) {
  const s = new Set(statusSet.value);
  s.has(k) ? s.delete(k) : s.add(k);
  statusSet.value = s.size ? s : new Set(statuses.map((x) => x.key));
}
function toggleTag(t) {
  const s = new Set(tagSet.value);
  s.has(t) ? s.delete(t) : s.add(t);
  tagSet.value = s;
}
function clearTags() {
  tagSet.value = new Set();
}

function normalizeStatus(s) {
  const v = String(s || "").toLowerCase();
  if (["live", "active"].includes(v)) return "live";
  if (v.includes("progress")) return "in-progress";
  if (v.includes("soon")) return "coming-soon";
  if (v.includes("plan")) return "planned";
  return "coming-soon";
}
function prettyStatus(s) {
  const k = normalizeStatus(s);
  return (
    {
      "in-progress": "In Progress",
      "coming-soon": "Coming Soon",
      planned: "Planned",
      live: "Live",
    }[k] || "Coming Soon"
  );
}
function routeFor(c) {
  return c.slug === "krov" ? "/krov" : `/${c.slug}`;
}

/* ---------- Readiness score (0..100) ---------- */
function score(c) {
  const k = normalizeStatus(c.status);
  const base =
    { planned: 10, "coming-soon": 30, "in-progress": 60, live: 90 }[k] ?? 30;
  const bits =
    (c.avatar ? 1 : 0) +
    (c.blurb ? 1 : 0) +
    (c.links && c.links.length ? 1 : 0) +
    (c.banner ? 1 : 0);
  return Math.min(100, base + bits * 5);
}

/* ---------- Local notes & priorities (persist in localStorage) ---------- */
const LS_NOTES = "wt_intake_notes";
const LS_PRIO = "wt_intake_priority";

function loadMap(key) {
  try {
    return new Map(
      Object.entries(JSON.parse(localStorage.getItem(key) || "{}"))
    );
  } catch {
    return new Map();
  }
}
function saveMap(key, map) {
  const obj = Object.fromEntries(map.entries());
  localStorage.setItem(key, JSON.stringify(obj));
}

const notesMap = loadMap(LS_NOTES);
function noteFor(slug) {
  return notesMap.get(slug) || "";
}
function setNote(slug, text) {
  notesMap.set(slug, text || "");
  saveMap(LS_NOTES, notesMap);
}

const prioMap = loadMap(LS_PRIO);
function priorityFor(slug) {
  return Number(prioMap.get(slug) || 0);
}
function setPriority(slug, val) {
  prioMap.set(slug, Math.max(0, Math.min(3, Number(val) || 0)));
  saveMap(LS_PRIO, prioMap);
}
function cyclePriority(slug) {
  setPriority(slug, (priorityFor(slug) + 1) % 4);
}

/* ---------- Base lists & aggregates ---------- */
const totals = creators.length;
const counts = computed(() => {
  const m = { live: 0, "in-progress": 0, "coming-soon": 0, planned: 0 };
  creators.forEach((c) => (m[normalizeStatus(c.status)] += 1));
  return m;
});
const missingCount = computed(
  () =>
    creators.filter(
      (c) => !c.avatar || !c.blurb || !(c.links && c.links.length)
    ).length
);
const avgReadiness = computed(() => {
  if (!creators.length) return 0;
  const s = creators.reduce((acc, c) => acc + score(c), 0);
  return Math.round(s / creators.length);
});

/* Distribution helpers */
function segWidth(key) {
  const n = counts.value[key] || 0;
  const pct = totals ? (n / totals) * 100 : 0;
  return pct.toFixed(2) + "%";
}
function distTitle(label) {
  return `${label}: ${counts.value[normalizeStatus(label)] || 0} / ${totals}`;
}

/* ---------- Filter pipeline ---------- */
const filtered = computed(() => {
  const qv = q.value.trim().toLowerCase();
  const activeStatuses = statusSet.value;
  const activeTags = tagSet.value;

  return creators.filter((c) => {
    if (!activeStatuses.has(normalizeStatus(c.status))) return false;
    if (qv) {
      const hay = `${c.name || ""} ${c.slug || ""} ${(c.tags || []).join(
        " "
      )} ${c.blurb || ""}`.toLowerCase();
      if (!hay.includes(qv)) return false;
    }
    if (activeTags.size) {
      const set = new Set(c.tags || []);
      let hit = false;
      for (const t of activeTags)
        if (set.has(t)) {
          hit = true;
          break;
        }
      if (!hit) return false;
    }
    if (onlyMissing.value) {
      const needs = !c.avatar || !c.blurb || !(c.links && c.links.length);
      if (!needs) return false;
    }
    return true;
  });
});

const order = { live: 0, "in-progress": 1, "coming-soon": 2, planned: 3 };
const filteredSorted = computed(() => {
  const arr = [...filtered.value];
  switch (sortKey.value) {
    case "name":
      return arr.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    case "status":
      return arr.sort(
        (a, b) =>
          (order[normalizeStatus(a.status)] ?? 9) -
          (order[normalizeStatus(b.status)] ?? 9)
      );
    case "priority":
      return arr.sort(
        (a, b) =>
          priorityFor(b.slug) - priorityFor(a.slug) ||
          String(a.name).localeCompare(String(b.name))
      );
    default: // readiness
      return arr.sort(
        (a, b) =>
          score(b) - score(a) || String(a.name).localeCompare(String(b.name))
      );
  }
});

/* ---------- Kanban buckets ---------- */
const byStatus = computed(() => {
  const m = { live: [], "in-progress": [], "coming-soon": [], planned: [] };
  for (const c of filteredSorted.value) m[normalizeStatus(c.status)].push(c);
  return m;
});
const kanbanCols = [
  { key: "live", label: "Live" },
  { key: "in-progress", label: "In Progress" },
  { key: "coming-soon", label: "Coming Soon" },
  { key: "planned", label: "Planned" },
];

/* ---------- Export ---------- */
function toCSV(rows, headers) {
  const escape = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.map(escape).join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
}
function exportJSON() {
  const payload = filteredSorted.value.map(enrich);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  download(blob, "intake_filtered.json");
}
function exportCSV() {
  const payload = filteredSorted.value.map(enrich);
  const headers = [
    "name",
    "slug",
    "status",
    "readiness",
    "tags",
    "links",
    "avatar",
    "banner",
    "blurb",
    "priority",
    "needs",
  ];
  const rows = payload.map((p) => ({
    name: p.name,
    slug: p.slug,
    status: prettyStatus(p.status),
    readiness: p.readiness,
    tags: (p.tags || []).join("|"),
    links: p.linksCount,
    avatar: p.avatar ? "yes" : "no",
    banner: p.banner ? "yes" : "no",
    blurb: p.blurb ? "yes" : "no",
    priority: p.priority,
    needs: p.needs.join("|"),
  }));
  const blob = new Blob([toCSV(rows, headers)], {
    type: "text/csv;charset=utf-8",
  });
  download(blob, "intake_filtered.csv");
}
function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function enrich(c) {
  const needs = [];
  if (!c.avatar) needs.push("avatar");
  if (!c.blurb) needs.push("blurb");
  if (!(c.links && c.links.length)) needs.push("links");
  if (!c.banner) needs.push("banner");
  return {
    ...c,
    readiness: score(c),
    linksCount: c.links ? c.links.length : 0,
    priority: priorityFor(c.slug),
    needs,
  };
}

/* ---------- Accents ---------- */
function cardAccent(c) {
  const k = normalizeStatus(c.status);
  return (
    {
      live: "#d6f5d6",
      "in-progress": "#fff1c9",
      "coming-soon": "#eee",
      planned: "#eee",
    }[k] || "#eee"
  );
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

/* Layout */
.intake-pro {
  max-width: 1200px;
  margin: 0 auto;
  padding: ($sp-4 + $sp-2) $sp-3 $sp-4;
}
.top {
  display: flex;
  gap: $sp-2;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $sp-2;
  h1 {
    margin: 0;
  }
  .sub {
    margin: 0.25rem 0 0;
    color: #555;
  }
  .btn {
    padding: 0.5rem 0.9rem;
    border-radius: 0.6rem;
    font-weight: 800;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #eee;
  }
  .btn.ghost {
    background: #fafafa;
  }
}

/* KPIs */
.kpis {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: $sp-2;
  margin-bottom: $sp-2;
}
.kpi {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
  padding: $sp-2;
  text-align: center;
  background: linear-gradient(#fafafa, #f6f6f6);
  .num {
    font-size: 1.35rem;
    font-weight: 800;
  }
  .label {
    color: #555;
  }
  &.good .num {
    color: #135a13;
  }
  &.warn .num {
    color: #815300;
  }
  &.alert .num {
    color: #8a3b00;
  }
  &.focus .num {
    color: #1b3c78;
  }
}

/* Distribution bar */
.dist {
  margin-bottom: $sp-2;
}
.dist-bar {
  display: grid;
  grid-template-columns: var(--live, 1fr) var(--prog, 1fr) var(--soon, 1fr) var(
      --plan,
      1fr
    );
  height: 14px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.seg {
  width: var(--w);
  height: 100%;
}
.seg.live {
  background: #b7ebb7;
}
.seg.prog {
  background: #ffeaa1;
}
.seg.soon {
  background: #ddd;
}
.seg.plan {
  background: #ccc;
}
.hint {
  color: #666;
}

/* Controls */
.controls {
  display: grid;
  gap: $sp-2;
  margin-bottom: $sp-2;
}
.search {
  width: 100%;
  padding: 0.65rem 0.8rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font: inherit;
}
.row {
  display: flex;
  align-items: center;
  gap: $sp-2;
}
.wrap {
  flex-wrap: wrap;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-1;
}
.check {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-1;
  align-items: center;
  .label {
    font-weight: 800;
    margin-right: 0.25rem;
  }
}
.chip {
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: #f6f6f6;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-weight: 800;
  cursor: pointer;
  &.active {
    background: #e9e0d6;
  }
  &.ghost {
    background: transparent;
  }
}
.view {
  margin-left: auto;
  display: flex;
  gap: $sp-2;
  align-items: center;
}
.sel {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  select {
    border: none;
    background: transparent;
    font-weight: 700;
  }
}
.toggle .btn {
  border-radius: 0.6rem;
}
.toggle .btn.active {
  background: #e9e0d6;
}

/* Table */
.table-wrap {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
}
.table thead th {
  text-align: left;
  font-weight: 800;
  padding: 0.7rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}
.table tbody td {
  padding: 0.6rem 0.7rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  vertical-align: top;
}
.table tbody tr:first-child td {
  border-top: none;
}
.name .slug {
  color: #666;
  font-size: 0.85rem;
}
.tiny {
  font-size: 0.85rem;
  color: #555;
}
.note {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.35rem 0.45rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.14);
}
.center {
  text-align: center;
}
.route {
  font-weight: 800;
}
.prio,
.prio.sm {
  font: inherit;
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 0.4rem;
  background: #f7f7f7;
  padding: 0.15rem 0.25rem;
}
.readiness {
  min-width: 160px;
}
.bar {
  height: 8px;
  border-radius: 999px;
  background: #eee;
  position: relative;
  overflow: hidden;
}
.bar > span {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  background: linear-gradient(90deg, #b98a5e, #d9b793);
  transition: width 160ms ease;
}
.pct {
  font-weight: 800;
  color: #333;
  margin-top: 0.25rem;
}
.status {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  font-weight: 800;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.status.tiny {
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
}
.s--live {
  background: #d6f5d6;
  color: #123812;
}
.s--in-progress {
  background: #fff1c9;
  color: #5a3a00;
}
.s--coming-soon,
.s--planned {
  background: #eee;
  color: #333;
}
.tag {
  display: inline-block;
  margin: 0 0.25rem 0.25rem 0;
  padding: 0.15rem 0.45rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  background: #fafafa;
  font-size: 0.8rem;
}
.needs .need {
  display: inline-block;
  margin: 0 0.25rem 0.25rem 0;
  padding: 0.1rem 0.4rem;
  border-radius: 0.35rem;
  background: #ffe3d6;
  color: #5a2600;
  font-size: 0.75rem;
  font-weight: 800;
}
.needs .need.dim {
  background: #eee;
  color: #333;
}

/* Kanban */
.kanban {
  display: grid;
  gap: $sp-2;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.col {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 220px;
}
.col-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  h3 {
    margin: 0;
    font-size: 1rem;
  }
  .count {
    font-weight: 800;
    color: #555;
  }
}
.stack {
  padding: 0.6rem;
  display: grid;
  gap: 0.6rem;
}
.card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.6rem;
  padding: 0.6rem;
  background: linear-gradient(#fff, #fafafa);
  box-shadow: 0 1px 0 var(--accent, #eee) inset;
}
.row {
  display: flex;
  align-items: center;
}
.gap {
  gap: 0.5rem;
}
.between {
  justify-content: space-between;
}
.truncate {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.score {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.35rem;
  margin: 0.35rem 0;
}
.bar.mini {
  height: 6px;
}
.pct.mini {
  font-size: 0.8rem;
  font-weight: 800;
  color: #444;
}
.chip {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #f3f3f3;
  font-weight: 800;
}
.chip.mini {
  font-size: 0.7rem;
  padding: 0.05rem 0.35rem;
}
.tags.mini .tag.tiny {
  font-size: 0.7rem;
  padding: 0.05rem 0.35rem;
}
.btn.sm {
  padding: 0.25rem 0.5rem;
}
.btn.ghost {
  background: #f6f6f6;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.btn.ghost.sm {
  font-weight: 800;
}

/* Grid */
.card-grid {
  display: grid;
  gap: $sp-2;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.mini-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.75rem;
  padding: 0.8rem;
  background: #fff;
  box-shadow: 0 1px 0 var(--accent, #eee) inset;
}

/* Empty */
.empty {
  text-align: center;
  color: #666;
  margin: $sp-3 0;
}

/* Responsive */
@media (max-width: 960px) {
  .kpis {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .kanban {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .kanban {
    grid-template-columns: 1fr;
  }
}
</style>
