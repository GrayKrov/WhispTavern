<template>
  <div class="community-banner" :style="styleVars">
    <div class="overlay">
      <CrestBadge class="crest" :size="62" />
      <h1>Our Community</h1>
      <p class="subtitle">Creators, collaborators, and friends of the Tavern</p>
      <ul class="chips">
        <li>Creator pages</li>
        <li>Events</li>
        <li>Projects</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import CrestBadge from "@/components/CrestBadge.vue";
import bannerJpg from "@/assets/images/BannerTop.jpg";
import bannerWebp from "@/assets/images/BannerTop.webp";
import bannerAvif from "@/assets/images/BannerTop.avif";

export default defineComponent({
  name: "CommunityBanner",
  components: { CrestBadge },
  setup() {
    const styleVars = computed(() => ({
      "--img-jpg": `url(${bannerJpg})`,
      "--img-webp": `url(${bannerWebp})`,
      "--img-avif": `url(${bannerAvif})`,
    }));
    return { styleVars };
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/tokens" as t;

.community-banner {
  position: relative;
  width: 100%;
  max-width: t.$container-max;
  height: clamp(230px, 34vw, 380px);
  margin: 0 auto t.$space-6;
  border-radius: t.$radius-lg;
  overflow: hidden;
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.22);
  background: #f5f1ea;
}
.community-banner::before {
  content: "";
  position: absolute;
  inset: -8%;
  background-image: var(--img-jpg);
  background-image: image-set(
    var(--img-avif) type("image/avif"),
    var(--img-webp) type("image/webp"),
    var(--img-jpg) type("image/jpeg")
  );
  background-size: cover;
  background-position: center;
  filter: blur(16px) saturate(0.95) brightness(0.95);
  transform: scale(1.06);
}
.community-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--img-jpg);
  background-image: image-set(
    var(--img-avif) type("image/avif"),
    var(--img-webp) type("image/webp"),
    var(--img-jpg) type("image/jpeg")
  );
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-content: center;
  text-align: center;
  padding: 0 t.$space-3;
  background: linear-gradient(
    180deg,
    rgba(35, 28, 23, 0.32),
    rgba(35, 28, 23, 0.55)
  );
}
.crest {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
}

h1 {
  color: #fff;
  font-size: clamp(1.8rem, 3.6vw, 2.4rem);
  margin: 60px 0 t.$space-1 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}
.subtitle {
  color: rgba(255, 255, 255, 0.95);
  margin: 0 auto t.$space-2;
  max-width: 760px;
  font-size: clamp(0.95rem, 1.2vw, 1.06rem);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.chips {
  list-style: none;
  display: inline-flex;
  gap: t.$space-2;
  padding: 0;
  margin: t.$space-1 0 0;
  justify-content: center;
  flex-wrap: wrap;
}
.chips li {
  padding: t.$space-1 t.$space-2;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  color: #2b241c;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* --- responsiveness --- */
@media (max-width: 700px) {
  h1 {
    margin-top: 52px;
  }
  .crest {
    transform: translateX(-50%) scale(0.9);
    top: 18px;
  }
}
@media (max-width: 560px) {
  .community-banner {
    height: 220px;
  }
  .chips {
    display: none;
  }
}
@media (max-width: 420px) {
  .crest {
    display: none;
  }
  .subtitle {
    display: none;
  }
  h1 {
    margin-top: 0;
    font-size: clamp(1.6rem, 6.2vw, 2rem);
  }
}
</style>
