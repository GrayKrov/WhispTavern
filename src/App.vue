<!-- src/App.vue -->
<template>
  <Transition name="fade" mode="out-in">
    <!-- Default site shell -->
    <AppLayout v-if="!isStandalone" :key="`shell:${route.fullPath}`">
      <RouterView />
    </AppLayout>

    <!-- Standalone creator pages (no site shell) -->
    <RouterView v-else :key="`standalone:${route.fullPath}`" />
  </Transition>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "@/features/layout/AppLayout.vue";

const route = useRoute();
const isStandalone = computed(() => route.meta.layout === "standalone");

const applyBodyClass = () => {
  document.body.classList.toggle("standalone", isStandalone.value);
};

onMounted(applyBodyClass);
watch(isStandalone, applyBodyClass);
</script>

<style lang="scss">
/* optional fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.16s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus defaults */
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.85);
  outline-offset: 2px;
}
:focus {
  outline: none;
}

/* Screen-reader-only helper */
.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Example: global style hook for standalone creator pages */
body.standalone {
  background: #0b0914; /* customize per creator if you like */
}
</style>
