<!-- src/features/layout/AppLayout.vue -->
<template>
  <div class="app-shell">
    <NavBar />
    <main class="main">
      <slot />
    </main>
    <TavernFooter />
  </div>
</template>

<script setup>
import NavBar from "@/features/navigation/NavBar.vue";
import TavernFooter from "@/features/layout/TavernFooter.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.main {
  /* subtle center gutter to match hero/banner width exactly */
  padding: $sp-4 $sp-2 $sp-6;
}
</style>
