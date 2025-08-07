<template>
  <div class="community-banner" :style="bannerStyle">
    <div class="overlay">
      <span class="title">Our Community</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import bannerImage from "@/assets/images/BannerTop.jpg";

export default defineComponent({
  name: "CommunityBanner",
  data() {
    return {
      bannerStyle: {
        backgroundImage: `url(${bannerImage})`,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.community-banner {
  /* ensure overlay is bounded to this container */
  position: relative;

  /* unified banner size */
  width: 100%;
  max-width: 800px;
  height: 150px;

  /* center horizontally and give bottom gap */
  margin: 0 auto $sp-4;

  border-radius: 0.75rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(74, 47, 47, 0.6);

    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      font-family: "Georgia", serif;
      font-size: 1.8rem;
      color: $color-neutral;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

      @include respond(md) {
        font-size: 1.6rem;
      }
      @include respond(sm) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
