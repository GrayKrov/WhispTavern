<template>
  <div id="app-layout">
    <NavBar />
    <main class="content">
      <slot />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup>
import NavBar from "@/features/navigation/NavBar.vue";
import AppFooter from "@/features/layout/Footer.vue";
import BackToTop from "@/components/BackToTop.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

/* page scaffold */
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ensure content clears the fixed navbar (matches $nav-h) */
.content {
  flex: 1;
  padding: 3.5rem $sp-3 $sp-3;
  background: $color-neutral;
}

.app-footer {
  width: 100%;
}
</style>
