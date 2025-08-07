<template>
  <section class="community-list">
    <CommunityCard name="Krov" :avatarSrc="krovAvatar" routerLink="/krov" />
  </section>
</template>

<script setup>
import CommunityCard from "./CommunityCard.vue";
// Import the actual image so Webpack bundles it
import krovAvatar from "@/assets/avatars/Krov.jpg";
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.community-list {
  display: flex;
  justify-content: center;
  padding: $sp-4;
}
</style>
