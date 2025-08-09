<script setup>
/* eslint-disable no-console */
import { ref, onMounted, computed } from "vue";
import KrovNavBar from "@/features/creators/krov/KrovNavBar.vue";
import KrovFooter from "@/features/creators/krov/KrovFooter.vue";
import ProjectCard from "@/features/creators/krov/ProjectCard.vue";

const projects = ref([]);
const loading = ref(true);
/* tiny counter to replay the evolution */
const evoKey = ref(0);
function replayEvolution() {
  evoKey.value += 1;
}

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
  <KrovNavBar />
  <a class="sr-only" href="#krov-main">Skip to content</a>

  <main id="krov-main" class="cc-krov-root" :key="evoKey">
    <!-- CONTAINED CHAOS → MINIMAL (layered) -->
    <div class="bg-layer bg-vignette" aria-hidden="true"></div>
    <div class="bg-layer bg-mesh" aria-hidden="true"></div>
    <div class="bg-layer bg-orbits" aria-hidden="true"></div>
    <div class="bg-layer bg-guides" aria-hidden="true"></div>
    <div class="bg-layer bg-dots" aria-hidden="true"></div>
    <div class="bg-layer bg-noise" aria-hidden="true"></div>

    <section class="hero">
      <p class="hero-sub">Complex roots. Minimal outcomes.</p>
      <button
        class="replay"
        type="button"
        @click="replayEvolution"
        aria-label="Replay background evolution"
      >
        Replay Evolution
      </button>
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
</template>

<style
  lang="scss"
  scoped
  src="@/assets/styles/creators/krov/creatorkrov.scss"
/>

<style scoped>
.sr-only {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.sr-only:focus {
  position: fixed;
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  padding: 0.5rem 0.75rem;
  background: #111;
  color: #fff;
  z-index: 9999;
}
</style>
