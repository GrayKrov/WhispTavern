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
