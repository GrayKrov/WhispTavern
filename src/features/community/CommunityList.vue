<template>
  <section class="community-list">
    <CommunityCard name="Krov" :avatarSrc="krovAvatar" routerLink="/krov" />
    <!-- Add more creators as you like -->
  </section>
</template>

<script setup>
import CommunityCard from "./CommunityCard.vue";
import krovAvatar from "@/assets/avatars/Krov.jpg";
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.community-list {
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $sp-4;
  padding: 0 $sp-2 $sp-4;
}
</style>
