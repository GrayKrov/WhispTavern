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

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

#app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1 0 auto;
  padding: 3.5rem $sp-3 $sp-3;
  background: radial-gradient(
      1200px 380px at 50% -200px,
      rgba(255, 210, 120, 0.08),
      transparent 70%
    ),
    radial-gradient(
      900px 260px at 50% 100%,
      rgba(0, 0, 0, 0.04),
      transparent 70%
    );
  background-attachment: fixed, scroll;
}

/* Mobile: leaner background + tighter padding */
@media (max-width: 600px) {
  .content {
    padding: 3rem $sp-2 $sp-2;
    background: #faf8f4;
  }
}
</style>
