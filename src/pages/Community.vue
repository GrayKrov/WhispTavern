<template>
  <div class="community-page">
    <h1>Our Community Creators</h1>
    <div class="card-grid">
      <CommunityCard
        name="Krov"
        avatar="/krov-avatar.png"
        link1="/krov"
        link2="#"
        link3="#"
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
