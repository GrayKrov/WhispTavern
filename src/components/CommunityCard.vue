<template>
  <div class="creator-card">
    <img :src="avatar" alt="Avatar" />
    <h2>{{ name }}</h2>
    <div class="links">
      <a :href="link1">Page</a>
      <a :href="link2">Link 2</a>
      <a :href="link3">Link 3</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "avatar", "link1", "link2", "link3"],
};
</script>

<style scoped>
.creator-card {
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 200px;
  background-color: #fff;
}
img {
  width: 100%;
  border-radius: 1rem;
}
.links a {
  display: block;
  margin-top: 0.25rem;
  color: #2e2b28;
}
</style>
