<template>
  <div class="community-page">
    <h1>Our Community Creators</h1>
    <div class="card-grid">
      <CommunityCard
        name="Krov"
        :avatar="require('@/assets/avatars/Krov.jpg')"
        routerLink="/krov"
      />
    </div>
  </div>
</template>

<script>
import CommunityCard from "@/components/CommunityCard.vue";

export default {
  name: "CommunityPage",
  components: { CommunityCard },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/community.scss";
</style>
