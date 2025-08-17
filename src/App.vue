<!-- src/App.vue -->
<template>
  <!-- No route transitions = no flash/flicker -->
  <AppLayout v-if="!isStandalone">
    <RouterView />
  </AppLayout>

  <!-- Standalone creator pages (no site shell) -->
  <RouterView v-else />
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
/* Keep focus styles; no transitions to avoid flicker */
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

/* Standalone creator pages */
body.standalone {
  background: #0b0914;
}
</style>
