<!-- src/App.vue -->
<template>
  <!-- Overlapping, ultra-short crossfade -->
  <Transition name="route-xfade">
    <!-- Default site shell -->
    <AppLayout v-if="!isStandalone">
      <RouterView />
    </AppLayout>

    <!-- Standalone creator pages (no site shell) -->
    <RouterView v-else />
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
/* ---- Ultra-short overlap fade (no blank frame) ---- */
.route-xfade-enter-active,
.route-xfade-leave-active {
  transition: opacity 80ms linear;
  /* Stack so leaving view sits over entering view briefly (no flash) */
  position: relative;
  display: block;
}
.route-xfade-leave-active {
  position: absolute;
  inset: 0;
}
.route-xfade-enter-from,
.route-xfade-leave-to {
  opacity: 0;
}

/* Respect reduced motion: zero animation */
@media (prefers-reduced-motion: reduce) {
  .route-xfade-enter-active,
  .route-xfade-leave-active {
    transition: none;
  }
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

/* ---- Background stabilization (prevents white blink) ---- */
/* Default site pages background (match your site’s light bg) */
html,
body,
#app {
  background: #f7f7f7;
}

/* Standalone creator pages */
body.standalone {
  background: #0b0914;
}
</style>
