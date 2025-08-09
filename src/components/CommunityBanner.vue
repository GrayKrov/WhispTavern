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
      bannerStyle: { backgroundImage: `url(${bannerImage})` },
    };
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.community-banner {
  position: relative;
  width: 100%;
  max-width: 1080px; /* reduced size */
  height: clamp(150px, 24vw, 220px); /* reduced size */
  margin: 0 auto ($sp-4 + $sp-2);
  border-radius: 0.9rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(74, 47, 47, 0.28),
      rgba(74, 47, 47, 0.5)
    );
    display: grid;
    place-content: center;

    .title {
      font-family: "Georgia", serif;
      font-size: clamp(1.4rem, 2.2vw, 1.9rem);
      color: $color-neutral;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      padding-bottom: $sp-2;
      position: relative;
    }
  }

  /* Lantern glow at the base (no wave cut) */
  .overlay::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -6px;
    width: 78%;
    height: 86px;
    background: radial-gradient(
      60% 120% at 50% 0%,
      rgba(255, 222, 160, 0.6),
      rgba(255, 200, 120, 0.4) 40%,
      transparent 72%
    );
    filter: blur(16px);
    pointer-events: none;
  }
}
</style>
