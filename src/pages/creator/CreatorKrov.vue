<script setup>
import KrovNavBar from "@/features/creators/krov/KrovNavBar.vue";
import KrovFooter from "@/features/creators/krov/KrovFooter.vue";
import ProjectCard from "@/features/creators/krov/ProjectCard.vue";
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

const projects = ref([]);
const loading = ref(true);
const rootRef = ref(null);

onMounted(async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/graykrov/repos?sort=updated",
      { headers: { Accept: "application/vnd.github+json" } }
    );
    const data = await res.json();
    projects.value = data
      .filter((r) => !r.fork)
      .slice(0, 6)
      .map((r) => ({ ...r, topics: r.topics || [] }));
  } catch (err) {
    console.error("GitHub fetch error:", err);
  } finally {
    loading.value = false;
  }

  // Halo micro-interaction
  const el = document.querySelector(".sigil-caption");
  if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const onScroll = () => {
      const y = Math.min(1, window.scrollY / 400);
      el.style.setProperty("--haloScale", String(1 + y * 0.06));
      el.style.setProperty("--haloOpacity", String(0.8 - y * 0.25));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
  }

  // Crow mode toggle
  const onKey = (e) => {
    if (e.key.toLowerCase() === "k" && !e.metaKey && !e.ctrlKey) {
      rootRef.value?.classList.toggle("crow-mode");
    }
  };
  window.addEventListener("keydown", onKey);
  onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
});

const skeletons = computed(() => Array.from({ length: 6 }));
</script>

<template>
  <KrovNavBar />
  <a class="visually-sr" href="#krov-main">Skip to content</a>

  <main ref="rootRef" id="krov-main" class="cc-krov-root">
    <div class="grain" aria-hidden="true"></div>

    <section class="intro-container">
      <p class="sigil-caption">The Architect’s Mark</p>
      <div class="sigil-meaning">
        <p>
          Forged in grayscale, the sigil embodies duality — wisdom and silence,
          logic and chaos, creation and solitude…
        </p>
      </div>
    </section>

    <section
      class="projects"
      aria-live="polite"
      :aria-busy="loading ? 'true' : 'false'"
    >
      <h2>Recent Work</h2>
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
.visually-sr {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.visually-sr:focus {
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
