<template>
  <div class="cc-krov-root">
    <section class="intro">
      <h1 class="logo-name">KROV</h1>
      <p class="tagline">Architect of Gray. Builder in Silence.</p>
      <a href="https://github.com/graykrov" target="_blank" class="github-link">
        View the Code →
      </a>
    </section>

    <section class="projects" v-if="projects.length">
      <h2>Recent Work</h2>
      <ul class="project-list">
        <li v-for="project in projects" :key="project.id" class="project-item">
          <a :href="project.html_url" target="_blank">{{ project.name }}</a>
          <p v-if="project.description">{{ project.description }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "CCKrovPage",
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    fetch("https://api.github.com/users/graykrov/repos?sort=updated")
      .then((res) => res.json())
      .then((data) => {
        this.projects = data.slice(0, 5);
      })
      .catch((err) => console.error("GitHub fetch error:", err));
  },
};
</script>

<style lang="scss" src="@/assets/styles/cc-krov.scss"></style>
