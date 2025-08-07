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
@use "@/assets/styles/mixins" as *;

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ensure main content sits below the fixed navbar */
.content {
  flex: 1;
  padding: 4rem $sp-3 $sp-3; /* top padding >= navbar height */
  background: $color-neutral;
}

/* footer spans full width */
.app-footer {
  width: 100%;
}
</style>
