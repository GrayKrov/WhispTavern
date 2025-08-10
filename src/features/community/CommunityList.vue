<template>
  <section class="community-list">
    <CommunityCard name="Krov" :avatarSrc="krovAvatar" routerLink="/krov" />
    <!-- Add more CommunityCard entries as you grow -->
  </section>
</template>

<script setup>
import CommunityCard from "./CommunityCard.vue";
import krovAvatar from "@/assets/avatars/Krov.jpg"; // ✅ correct
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.community-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $sp-3;
  padding: $sp-2;
}
</style>
