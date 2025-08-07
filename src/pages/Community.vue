<!-- src/pages/Community.vue -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="community-page">
    <CommunityBanner />
    <CommunityList />
  </div>
</template>

<script>
import CommunityBanner from "@/components/CommunityBanner.vue";
import CommunityList from "@/features/community/CommunityList.vue";

export default {
  name: "CommunityPage",
  components: {
    CommunityBanner,
    CommunityList,
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.community-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $sp-4 $sp-3;
}

.community-banner {
  /* push the card down by 1.5rem */
  margin-bottom: $sp-4;
}

.community-list {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
