<!-- src/features/creators/krov/KrovFooter.vue -->
<template>
  <footer class="krov-footer">
    <blockquote class="quote">
      “Imagination builds worlds; code gives them life.”<br />
      — Krov
    </blockquote>
  </footer>
</template>

<script setup>
// nothing needed here
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.krov-footer {
  background: $color-dark;
  color: $color-neutral;
  text-align: center;
  padding: $sp-4 $sp-2;
  font-style: italic;
  font-family: serif;
  position: relative;
  margin-top: $sp-4;

  .quote {
    max-width: 800px;
    margin: 0 auto;
    font-size: $fs-lg;
    line-height: 1.4;
  }
}
</style>
