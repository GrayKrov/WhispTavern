<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="community-page">
    <CommunityBanner />
    <section class="list-wrap">
      <CommunityList />
    </section>
  </div>
</template>

<script>
import CommunityBanner from "@/components/CommunityBanner.vue";
import CommunityList from "@/features/community/CommunityList.vue";

export default {
  name: "CommunityPage",
  components: { CommunityBanner, CommunityList },
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

/* A simple wrapper so the banner and cards breathe nicely */
.list-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: $sp-2; /* space below banner */
}
</style>
