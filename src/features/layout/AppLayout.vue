<template>
  <div id="app-layout">
    <NavBar />
    <main id="main" class="content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import NavBar from "@/features/navigation/NavBar.vue";
import AppFooter from "@/features/layout/Footer.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

#app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
  padding: 3.5rem $sp-3 $sp-3;
}
</style>
