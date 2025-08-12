<template>
  <div class="community-banner" :style="styleVars">
    <div class="overlay">
      <div class="crest" aria-hidden="true">
        <svg viewBox="0 0 64 64" class="crest__svg">
          <defs>
            <radialGradient id="glow" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stop-color="rgba(255,222,160,0.75)" />
              <stop offset="100%" stop-color="rgba(255,222,160,0)" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="40" r="20" fill="url(#glow)" />
          <g transform="translate(32,32) scale(1.22) translate(-32,-32)">
            <path
              d="M12 38c10-8 24-12 36-10-7 1-11 5-12 8 6-2 9-1 13 2-9 0-14 3-16 7-5-7-12-7-21-7z"
              fill="rgba(43,36,28,0.92)"
            />
          </g>
        </svg>
      </div>

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
import bannerJpg from "@/assets/images/BannerTop.jpg";
import bannerWebp from "@/assets/images/BannerTop.webp";
import bannerAvif from "@/assets/images/BannerTop.avif";

export default defineComponent({
  name: "CommunityBanner",
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
@use "@/assets/styles/vars" as *;

/* Container with small-image safety (no parallax) */
.community-banner {
  position: relative;
  width: 100%;
  max-width: 1080px;
  height: clamp(170px, 28vw, 260px);
  margin: 0 auto ($sp-4 + $sp-2);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.16);
  background: #f5f1ea;

  /* blurred cover fill */
  &::before {
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
    transition: filter 200ms ease;
  }

  /* crisp contain layer */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--img-jpg);
    background-image: image-set(
      var(--img-avif) type("image/avif"),
      var(--img-webp) type("image/webp"),
      var(--img-jpg) type("image/jpeg")
    );
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-content: center;
    text-align: center;
    padding: 0 $sp-3;
    background: linear-gradient(
      180deg,
      rgba(74, 47, 47, 0.28),
      rgba(74, 47, 47, 0.5)
    );
  }
}

/* Crest */
.crest {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto $sp-2;
  border-radius: 999px;
  background: linear-gradient(140deg, #d9b793, #b98a5e);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: grid;
  place-items: center;
}
.crest__svg {
  width: 74%;
  height: 74%;
  display: block;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35));
}

h1 {
  color: $color-neutral;
  font-size: clamp(1.6rem, 2.4vw, 2.1rem);
  margin: 0 0 $sp-1;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.02em;
}
.subtitle {
  color: rgba(255, 255, 255, 0.92);
  margin: 0 auto $sp-2;
  max-width: 760px;
  font-size: clamp(0.95rem, 1.2vw, 1.06rem);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.chips {
  list-style: none;
  display: inline-flex;
  gap: $sp-2;
  padding: 0;
  margin: $sp-1 0 0;
  justify-content: center;
  flex-wrap: wrap;
}
.chips li {
  padding: $sp-1 $sp-2;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  color: #2b241c;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* ——— Mobile: drop the heavy filters for faster paint ——— */
@media (max-width: 600px) {
  .community-banner {
    height: 180px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  }
  .community-banner::before {
    display: none;
  }
  .community-banner::after {
    background-size: cover; /* single layer, cheaper to paint */
  }
  .overlay {
    background: linear-gradient(
      180deg,
      rgba(50, 35, 24, 0.22),
      rgba(50, 35, 24, 0.38)
    );
  }
}
/* 🔻 Hide chips on narrow screens to prevent clipping */
@media (max-width: 520px) {
  .chips {
    display: none;
  }
}
</style>
