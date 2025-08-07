<!-- src/features/creators/krov/KrovFooter.vue -->
<template>
  <footer class="krov-footer">
    <p>© 2025 Krov. All rights reserved.</p>
  </footer>
</template>

<script setup>
// no props
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.krov-footer {
  background: #111;
  color: #ccc;
  text-align: center;
  padding: $sp-3 $sp-2;
  font-family: "Georgia", serif;

  p {
    margin: 0;
    font-size: $fs-base;
  }
}

@include respond(sm) {
  .krov-footer {
    font-size: 0.9rem;
    padding: $sp-2 $sp-1;
  }
}
</style>
