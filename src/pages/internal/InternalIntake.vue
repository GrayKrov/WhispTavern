<!-- src/pages/internal/Intake.vue -->
<template>
  <div class="intake">
    <header class="top">
      <h1>Creator Intake</h1>
      <p class="sub">Quick overview of statuses, tags, and missing assets.</p>
    </header>

    <!-- Controls -->
    <section class="controls">
      <input
        v-model="q"
        class="search"
        type="search"
        placeholder="Search by name or slug…"
        aria-label="Search creators"
      />

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

    <!-- Summary -->
    <section class="summary">
      <div class="kpi">
        <div class="num">{{ filtered.length }}</div>
        <div class="label">Visible</div>
      </div>
      <div class="kpi">
        <div class="num">{{ totals }}</div>
        <div class="label">Total creators</div>
      </div>
      <div class="kpi warn">
        <div class="num">{{ missingCount }}</div>
        <div class="label">Missing assets</div>
      </div>
    </section>

    <!-- Table -->
    <section class="table-wrap">
      <table class="table" aria-label="Creators">
        <thead>
          <tr>
            <th>Creator</th>
            <th>Status</th>
            <th>Tags</th>
            <th>Avatar</th>
            <th>Banner</th>
            <th>Links</th>
            <th>Blurb</th>
            <th>Route</th>
            <th>Needs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredSorted" :key="c.slug">
            <td class="name">
              <strong>{{ c.name }}</strong>
              <div class="slug">/{{ c.slug }}</div>
            </td>
            <td>
              <span :class="['status', 's--' + normalizeStatus(c.status)]">
                {{ prettyStatus(c.status) }}
              </span>
            </td>
            <td>
              <span v-for="t in c.tags || []" :key="t" class="tag">{{ t }}</span>
            </td>
            <td class="center">{{ c.avatar ? "✅" : "—" }}</td>
            <td class="center">{{ c.banner ? "✅" : "—" }}</td>
            <td class="center">
              {{ c.links && c.links.length ? c.links.length : "—" }}
            </td>
            <td class="center">{{ c.blurb ? "✅" : "—" }}</td>
            <td>
              <RouterLink :to="routeFor(c)" class="route">open</RouterLink>
            </td>
            <td class="needs">
              <span v-if="!c.avatar" class="need">avatar</span>
              <span v-if="!c.blurb" class="need">blurb</span>
              <span v-if="!(c.links && c.links.length)" class="need">links</span>
              <span v-if="!c.banner" class="need dim">banner</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!filteredSorted.length" class="empty">
        No creators match your filters.
      </p>
    </section>
  </div>
</template>

<!-- Give the component a multi-word name to satisfy ESLint -->
<script>
export default { name: "InternalIntake" };
</script>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import creators from "@/content/creators.json";

const q = ref("");
const onlyMissing = ref(false);

// status filter (default: all on)
const statuses = [
  { key: "live", label: "Live" },
  { key: "in-progress", label: "In Progress" },
  { key: "coming-soon", label: "Coming Soon" },
  { key: "planned", label: "Planned" },
];
const statusSet = ref(new Set(statuses.map((s) => s.key)));
function toggleStatus(k) {
  const s = new Set(statusSet.value);
  s.has(k) ? s.delete(k) : s.add(k);
  statusSet.value = s.size ? s : new Set(statuses.map((x) => x.key));
}

const allTags = computed(() => {
  const set = new Set();
  for (const c of creators) (c.tags || []).forEach((t) => set.add(t));
  return Array.from(set).sort();
});
const tagSet = ref(new Set());
function toggleTag(t) {
  const s = new Set(tagSet.value);
  s.has(t) ? s.delete(t) : s.add(t);
  tagSet.value = s;
}
function clearTags() {
  tagSet.value = new Set();
}

// helpers
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

// base list + counts
const totals = creators.length;
const counts = computed(() => {
  const m = { live: 0, "in-progress": 0, "coming-soon": 0, planned: 0 };
  creators.forEach((c) => (m[normalizeStatus(c.status)] += 1));
  return m;
});

// filter pipeline
const filtered = computed(() => {
  const qv = q.value.trim().toLowerCase();
  const activeStatuses = statusSet.value;
  const activeTags = tagSet.value;

  return creators.filter((c) => {
    if (!activeStatuses.has(normalizeStatus(c.status))) return false;

    if (qv) {
      const hay = `${c.name || ""} ${c.slug || ""} ${(c.tags || []).join(" ")}`.toLowerCase();
      if (!hay.includes(qv)) return false;
    }

    if (activeTags.size) {
      const set = new Set(c.tags || []);
      let hit = false;
      for (const t of activeTags) if (set.has(t)) { hit = true; break; }
      if (!hit) return false;
    }

    if (onlyMissing.value) {
      const needs = !c.avatar || !c.blurb || !(c.links && c.links.length);
      if (!needs) return false;
    }

    return true;
  });
});

// sort by status → name
const order = { live: 0, "in-progress": 1, "coming-soon": 2, planned: 3 };
const filteredSorted = computed(() =>
  [...filtered.value].sort((a, b) => {
    const sa = order[normalizeStatus(a.status)] ?? 9;
    const sb = order[normalizeStatus(b.status)] ?? 9;
    if (sa !== sb) return sa - sb;
    return String(a.name).localeCompare(String(b.name));
  })
);

// missing KPI
const missingCount = computed(
  () => creators.filter((c) => !c.avatar || !c.blurb || !(c.links && c.links.length)).length
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.intake {
  max-width: 1100px;
  margin: 0 auto;
  padding: ($sp-4 + $sp-2) $sp-3 $sp-4;
}

.top {
  margin-bottom: $sp-2;
  h1 { margin: 0; }
  .sub { margin: $sp-1 0 0; color: #555; }
}

.controls {
  display: grid;
  gap: $sp-2;
  margin-bottom: $sp-2;
}

.search {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font: inherit;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-1;

  .check {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-1;
  align-items: center;
  .label { font-weight: 700; margin-right: 0.25rem; }
}

.chip {
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: #f6f6f6;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-weight: 700;
  cursor: pointer;
  &.active { background: #e9e0d6; }
  &.ghost { background: transparent; }
}

.summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: $sp-2;
  margin: $sp-1 0 $sp-2;
}
.kpi {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
  padding: $sp-2;
  background: linear-gradient(#fafafa, #f6f6f6);
  text-align: center;
  .num { font-size: 1.3rem; font-weight: 800; }
  .label { color: #555; }
  &.warn .num { color: #8a3b00; }
}

.table-wrap { overflow-x: auto; }
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
.table tbody tr:first-child td { border-top: none; }

.name .slug { color: #666; font-size: 0.85rem; }
.center { text-align: center; }
.route { font-weight: 700; }

.status {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  font-weight: 800;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.s--live { background: #d6f5d6; color: #123812; }
.s--in-progress { background: #fff1c9; color: #5a3a00; }
.s--coming-soon { background: #eee; color: #333; }
.s--planned { background: #eee; color: #333; }

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
.needs .need.dim { background: #eee; color: #333; }

/* mobile polish */
@media (max-width: 640px) {
  .summary { grid-template-columns: 1fr; }
}
</style>
