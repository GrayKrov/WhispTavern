<script setup>
/* eslint-disable no-console */
import { ref, onMounted, computed } from "vue";
import KrovNavBar from "@/features/creators/krov/KrovNavBar.vue";
import KrovFooter from "@/features/creators/krov/KrovFooter.vue";
import ProjectCard from "@/features/creators/krov/ProjectCard.vue";

const projects = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/graykrov/repos?sort=updated",
      { headers: { Accept: "application/vnd.github+json" } }
    );
    const data = await res.json();
    projects.value = (Array.isArray(data) ? data : [])
      .filter((r) => !r.fork)
      .slice(0, 6);
  } catch (err) {
    console.error("GitHub fetch error:", err);
  } finally {
    loading.value = false;
  }
});

const skeletons = computed(() => Array.from({ length: 6 }));
</script>

<template>
  <div class="krov-page">
    <KrovNavBar />

    <main class="krov-main" id="krov-main">
      <section class="hero">
        <p class="hero-sub">Systematic minimalism — engineered for impact</p>
      </section>

      <section
        class="projects"
        aria-live="polite"
        :aria-busy="loading ? 'true' : 'false'"
      >
        <h2 class="section-title">Recent Work</h2>

        <div class="project-grid">
          <template v-if="loading">
            <ProjectCard
              v-for="(_, i) in skeletons"
              :key="'sk' + i"
              :repo="{}"
              :loading="true"
            />
          </template>

          <template v-else>
            <ProjectCard
              v-for="project in projects"
              :key="project.id"
              :repo="project"
            />
          </template>
        </div>

        <p v-if="!loading && !projects.length" class="empty">
          No recent public work yet — check back soon.
        </p>
      </section>
    </main>

    <KrovFooter />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

/* Page wrapper = flex column so footer locks to bottom */
.krov-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7; /* neutral for Krov */
}

/* Main grows to fill; add top pad to clear fixed KrovNavBar (92px) */
.krov-main {
  flex: 1;
  padding: calc(92px + 2.25rem) $sp-2 $sp-4;
}

/* Simple hero */
.hero {
  max-width: 1024px;
  margin: 0 auto $sp-3;
  text-align: center;
}
.hero-sub {
  margin: 0;
  color: #4a4a4a;
  font-size: clamp(0.95rem, 0.9rem + 0.5vw, 1.15rem);
}

/* Projects section */
.projects {
  max-width: 1100px;
  margin: 0 auto;
}
.section-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin: 0 0 $sp-3 0;
  color: #222;
}

/* Grid that never lets a single card span full width */
.project-grid {
  display: grid;
  gap: $sp-3;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Cap every card and center it; no changes needed in ProjectCard.vue */
.project-grid > * {
  width: 100%;
  max-width: 560px; /* <- adjust to taste (520–600px works great) */
  justify-self: center; /* centers within the grid cell */
}

.empty {
  text-align: center;
  color: #666;
  margin: $sp-3 0;
}

@media (max-width: 640px) {
  .krov-main {
    padding-top: calc(92px + 1.75rem);
  }
}

/* Footer sits at the bottom because .krov-page is a flex column and .krov-main flexes */
</style>
