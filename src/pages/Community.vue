<template>
  <div class="community-page">
    <CommunityBanner />

    <!-- Intro -->
    <section class="intro">
      <p>
        Meet the creators, collaborators, and friends who make our tavern
        special. Pull up a chair, browse the cards, and say hello.
      </p>
      <div class="cta-row">
        <a
          class="btn btn--primary"
          href="https://discord.com/invite/JfMh3P57zh"
          target="_blank"
          rel="noopener"
          >Join the Discord</a
        >
        <RouterLink class="btn btn--ghost" to="/">Back to Home</RouterLink>
      </div>
    </section>

    <!-- Standalone CTA above the grid -->
    <section class="cta" aria-labelledby="cta-title">
      <div class="cta-card">
        <h2 id="cta-title">Become a Creator</h2>
        <p>
          Want a custom page that matches your vibe? We’ll build it with you.
        </p>
        <a
          class="btn btn--primary"
          href="https://discord.com/invite/JfMh3P57zh"
          target="_blank"
          rel="noopener"
          >Start Here</a
        >
      </div>
    </section>

    <!-- Filters -->
    <section class="filters" aria-label="Filter creators">
      <div class="filters__row">
        <label class="visually-hidden" for="creator-search"
          >Search creators</label
        >
        <input
          id="creator-search"
          class="filter-input"
          type="search"
          v-model.trim="search"
          placeholder="Search creators by name…"
          aria-label="Search creators by name"
        />

        <button
          v-if="search || selectedStatus || selectedTags.length"
          class="btn btn--ghost btn--sm"
          @click="clearAll"
        >
          Clear filters
        </button>
      </div>

      <div class="filters__row">
        <span class="filters__label">Status:</span>
        <div class="chips statuses" role="group" aria-label="Filter by status">
          <button :class="{ active: !selectedStatus }" @click="setStatus('')">
            All
          </button>
          <button
            :class="{ active: selectedStatus === 'live' }"
            @click="setStatus('live')"
          >
            Live
          </button>
          <button
            :class="{ active: selectedStatus === 'coming-soon' }"
            @click="setStatus('coming-soon')"
          >
            Coming soon
          </button>
          <button
            :class="{ active: selectedStatus === 'in-progress' }"
            @click="setStatus('in-progress')"
          >
            In progress
          </button>
        </div>
      </div>

      <div v-if="allTags.length" class="filters__row">
        <span class="filters__label">Tags:</span>
        <div class="chips tags" role="group" aria-label="Filter by tags">
          <button
            v-for="tag in allTags"
            :key="tag"
            :class="{ active: selectedTagsSet.has(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grid (now receives filtered items) -->
    <section class="list-wrap">
      <CommunityList :items="filteredCreators" />
    </section>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { RouterLink } from "vue-router";
import CommunityBanner from "@/components/CommunityBanner.vue";
import CommunityList from "@/features/community/CommunityList.vue";
import creators from "@/content/creators.json";

function norm(s) {
  return String(s || "")
    .trim()
    .toLowerCase();
}

export default defineComponent({
  name: "CommunityPage",
  components: { CommunityBanner, CommunityList, RouterLink },
  setup() {
    // filter state
    const search = ref("");
    const selectedStatus = ref(""); // '', 'live', 'coming-soon', 'in-progress'
    const selectedTags = ref([]); // array of lowercased strings

    // derive all tags from data
    const allTags = computed(() => {
      const set = new Set();
      creators.forEach((c) => (c.tags || []).forEach((t) => set.add(norm(t))));
      return Array.from(set).sort();
    });

    const selectedTagsSet = computed(() => new Set(selectedTags.value));

    function toggleTag(tag) {
      const t = norm(tag);
      const arr = new Set(selectedTags.value);
      if (arr.has(t)) arr.delete(t);
      else arr.add(t);
      selectedTags.value = Array.from(arr);
    }

    function setStatus(s) {
      selectedStatus.value = norm(s);
    }

    function clearAll() {
      search.value = "";
      selectedStatus.value = "";
      selectedTags.value = [];
    }

    // filter creators
    const filteredCreators = computed(() => {
      const q = norm(search.value);
      const status = norm(selectedStatus.value);
      const tset = new Set(selectedTags.value);

      return creators.filter((c) => {
        const nameOk = !q || norm(c.name).includes(q);

        const statusOk =
          !status ||
          norm(c.status) === status ||
          (status === "live" && norm(c.status) === "active"); // treat ACTIVE as live

        const tags = new Set((c.tags || []).map(norm));
        const tagsOk =
          tset.size === 0 || Array.from(tset).every((t) => tags.has(t));

        return nameOk && statusOk && tagsOk;
      });
    });

    return {
      search,
      selectedStatus,
      selectedTags,
      selectedTagsSet,
      allTags,
      filteredCreators,
      toggleTag,
      setStatus,
      clearAll,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.community-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $sp-4 $sp-3;
}

/* Intro */
.intro {
  max-width: 900px;
  text-align: center;
  margin: 0 auto $sp-3;
  p {
    margin-bottom: $sp-2;
    line-height: 1.8;
  }
  .cta-row {
    display: inline-flex;
    gap: $sp-2;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* CTA section above grid */
.cta {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto $sp-3;
}
.cta-card {
  background: linear-gradient(#f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.28);
  border-radius: 1rem;
  padding: $sp-3;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  text-align: center;
  display: grid;
  place-content: center;
}
.cta-card h2 {
  margin: 0 0 $sp-2;
  letter-spacing: 0.02em;
}
.cta-card p {
  margin: 0 0 $sp-3;
}

/* Filters */
.filters {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto $sp-3;
}
.filters__row {
  display: flex;
  align-items: center;
  gap: $sp-2;
  flex-wrap: wrap;
  margin-bottom: $sp-2;
}
.filters__label {
  color: #3b2f25;
  font-weight: 700;
}

.filter-input {
  flex: 1 1 260px;
  padding: $sp-2 $sp-3;
  border-radius: 0.66rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
}

/* Chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-2;
}
.chips button {
  padding: $sp-1 $sp-2;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  cursor: pointer;
}
.chips button.active {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}

/* Buttons (match Home) */
.btn {
  display: inline-block;
  padding: $sp-2 $sp-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;
  position: relative;
  overflow: hidden;
}
.btn::after {
  content: "";
  position: absolute;
  inset: 0 -30%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.45s ease;
  pointer-events: none;
}
.btn:hover::after {
  transform: translateX(100%);
}
.btn--primary {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}
.btn--ghost {
  background: rgba(0, 0, 0, 0.06);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
}
.btn--sm {
  padding: $sp-1 $sp-2;
  box-shadow: none;
}

.list-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* a11y helpers */
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  word-wrap: normal !important;
}
</style>
