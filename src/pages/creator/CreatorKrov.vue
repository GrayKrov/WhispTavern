<!-- src/pages/creator/CreatorKrov.vue -->
<script setup>
/* eslint-disable no-console */
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { defineAsyncComponent } from "vue";

// Lazy-load below-the-fold components to shrink initial work
const KrovNavBar = defineAsyncComponent(() =>
  import("@/features/creators/krov/KrovNavBar.vue")
);
const KrovFooter = defineAsyncComponent(() =>
  import("@/features/creators/krov/KrovFooter.vue")
);
const ProjectCard = defineAsyncComponent(() =>
  import("@/features/creators/krov/ProjectCard.vue")
);

const projects = ref([]);
const loading = ref(false);
const projectsReady = ref(false); // we won't render the big grid until near viewport
const projectsHost = ref(null);

// Fewer skeletons on small screens to cut initial DOM/paint cost
const skeletonCount = computed(() => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(max-width: 520px)").matches ? 3 : 6;
  }
  return 6;
});

let io = null;

async function fetchRepos() {
  loading.value = true;
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
}

function setupObserver() {
  if (!projectsHost.value) return;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          projectsReady.value = true; // allow grid to render
          fetchRepos(); // start network only when near
          if (io) io.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // start a bit early
    );
    io.observe(projectsHost.value);
  } else {
    // Fallback: just render/fetch immediately
    projectsReady.value = true;
    fetchRepos();
  }
}

onMounted(setupObserver);
onBeforeUnmount(() => {
  if (io) io.disconnect();
});
</script>

<template>
  <div class="krov-page">
    <KrovNavBar />

    <main class="krov-main" id="krov-main">
      <!-- Keep hero simple/light so it paints fast -->
      <section class="hero">
        <p class="hero-sub">Systematic minimalism — engineered for impact</p>
      </section>

      <!-- Projects -->
      <section
        ref="projectsHost"
        class="projects"
        aria-live="polite"
        :aria-busy="loading ? 'true' : 'false'"
      >
        <h2 class="section-title">Recent Work</h2>

        <!-- Only render the big grid when we're near it -->
        <div v-if="projectsReady" class="project-grid">
          <template v-if="loading">
            <ProjectCard
              v-for="i in skeletonCount"
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

        <p v-if="projectsReady && !loading && !projects.length" class="empty">
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
  background: #f7f7f7;
}

/* Main grows to fill; add top pad to clear fixed KrovNavBar (92px) */
.krov-main {
  flex: 1;
  padding: calc(92px + 2.25rem) $sp-2 $sp-4;
}

/* Simple hero (keep effects minimal to speed paint) */
.hero {
  max-width: 1024px;
  margin: 0 auto $sp-3;
  text-align: center;
}
.hero-sub {
  margin: 0;
  color: #333;
  font-size: clamp(0.95rem, 0.9rem + 0.5vw, 1.15rem);
}

/* Projects section: tell the browser this block can wait */
.projects {
  max-width: 1100px;
  margin: 0 auto;

  /* 🚀 Defers layout/paint until scrolled near it (big LCP win on mobile) */
  content-visibility: auto;
  contain-intrinsic-size: 1200px; /* reserve space to avoid layout jump */
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
.project-grid > * {
  width: 100%;
  max-width: 560px;
  justify-self: center;
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
  .section-title {
    font-size: 1.25rem;
  }
}
</style>
