<template>
  <router-view v-slot="{ Component }">
    <component v-if="$route.meta.creator" :is="Component" />
    <AppLayout v-else>
      <component :is="Component" />
    </AppLayout>
  </router-view>
</template>
<script setup>
import AppLayout from "@/features/layout/AppLayout.vue";
</script>

<style lang="scss">
/* Clear keyboard focus across the app */
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.85);
  outline-offset: 2px;
}
/* Keep mouse focus clean */
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
</style>
