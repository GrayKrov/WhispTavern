<!-- src/pages/creator/CreatorKrov.vue -->
<script setup>
/* eslint-disable vue/multi-word-component-names */
import KrovNavBar from "@/features/creators/krov/KrovNavBar.vue";
import KrovFooter from "@/features/creators/krov/KrovFooter.vue";
import { ref, onMounted } from "vue";

const projects = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/graykrov/repos?sort=updated"
    );
    const data = await res.json();
    projects.value = data.slice(0, 5);
  } catch (err) {
    console.error("GitHub fetch error:", err);
  }
});
</script>

<template>
  <KrovNavBar />

  <main class="cc-krov-root">
    <section class="intro-container">
      <p class="sigil-caption">The Architect’s Mark</p>
      <div class="sigil-meaning">
        <p>
          Forged in grayscale, the sigil embodies duality — wisdom and silence,
          logic and chaos, creation and solitude…
        </p>
      </div>
    </section>

    <section v-if="projects.length" class="projects">
      <h2>Recent Work</h2>
      <ul class="project-list">
        <li v-for="project in projects" :key="project.id" class="project-item">
          <a :href="project.html_url" target="_blank" rel="noopener">
            {{ project.name }}
          </a>
          <p v-if="project.description">{{ project.description }}</p>
        </li>
      </ul>
    </section>
  </main>

  <KrovFooter />
</template>

<style
  lang="scss"
  scoped
  src="@/assets/styles/creators/krov/creatorkrov.scss"
/>
