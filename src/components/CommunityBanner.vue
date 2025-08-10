<template>
  <div class="community-banner" :style="styleVars">
    <div class="overlay">
      <!-- Crest (mark enlarged) -->
      <div class="crest" aria-hidden="true">
        <svg viewBox="0 0 64 64" class="crest__svg">
          <defs>
            <radialGradient id="glow" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stop-color="rgba(255,222,160,0.75)" />
              <stop offset="100%" stop-color="rgba(255,222,160,0)" />
            </radialGradient>
          </defs>
          <!-- soft halo behind the mark -->
          <circle cx="32" cy="40" r="20" fill="url(#glow)" />
          <!-- crow mark scaled up around center -->
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
import bannerImage from "@/assets/images/BannerTop.jpg";

export default defineComponent({
  name: "CommunityBanner",
  setup() {
    // Static image only (no parallax)
    const styleVars = computed(() => ({
      "--img": `url(${bannerImage})`,
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

  /* Layer 1: blurred cover fill (guarantees full bleed) */
  &::before {
    content: "";
    position: absolute;
    inset: -8%;
    background-image: var(--img);
    background-size: cover;
    background-position: center;
    filter: blur(16px) saturate(0.95) brightness(0.95);
    transform: scale(1.06);
    transition: filter 200ms ease;
  }

  /* Layer 2: crisp contain layer (keeps smaller images sharp) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--img);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Sheen: ultra-soft band ping-ponging (no visible seam) */
  .overlay::after {
    content: "";
    position: absolute;
    left: -25%;
    top: 0;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 230, 180, 0.06) 46%,
      rgba(255, 230, 180, 0.13) 50%,
      rgba(255, 230, 180, 0.06) 54%,
      transparent 100%
    );
    filter: blur(10px);
    transform: translateX(-10%) skewX(-2deg);
    animation: sweepAlt 16s ease-in-out infinite alternate;
    pointer-events: none;
  }

  /* Subtle bokeh orbs (very gentle, not "embers") */
  .overlay::before {
    content: "";
    position: absolute;
    inset: -10% -6% -10% -6%;
    background-repeat: no-repeat;
    background-image: radial-gradient(
        18px 18px at 12% 80%,
        rgba(255, 240, 200, 0.18) 40%,
        transparent 41%
      ),
      radial-gradient(
        24px 24px at 28% 88%,
        rgba(255, 230, 180, 0.14) 40%,
        transparent 41%
      ),
      radial-gradient(
        20px 20px at 78% 76%,
        rgba(255, 230, 180, 0.16) 40%,
        transparent 41%
      ),
      radial-gradient(
        16px 16px at 62% 88%,
        rgba(255, 220, 160, 0.14) 40%,
        transparent 41%
      );
    animation: float 20s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes sweepAlt {
    from {
      transform: translateX(-10%) skewX(-2deg);
      opacity: 0.9;
    }
    to {
      transform: translateX(10%) skewX(-2deg);
      opacity: 0.9;
    }
  }
  @keyframes float {
    from {
      transform: translate(-1%, 1%);
    }
    to {
      transform: translate(1%, -1%);
    }
  }
}

/* Overlay with lantern glow and content */
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

/* Lantern glow (base) */
.overlay .crest::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  width: 78%;
  height: 90px;
  background: radial-gradient(
    60% 120% at 50% 0%,
    rgba(255, 222, 160, 0.6),
    rgba(255, 200, 120, 0.42) 40%,
    transparent 72%
  );
  filter: blur(16px);
  pointer-events: none;
  z-index: -1;
}

/* Crest (coin slightly larger) */
.crest {
  position: relative;
  width: 72px; /* was 68px */
  height: 72px; /* was 68px */
  margin: 0 auto $sp-2;
  border-radius: 999px;
  background: linear-gradient(140deg, #d9b793, #b98a5e);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: grid;
  place-items: center;
}
.crest__svg {
  width: 74%; /* gives the bigger mark some breathing room */
  height: 74%;
  display: block;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35));
}

/* Title + subtitle + chips */
h1 {
  color: $color-neutral;
  font-size: clamp(1.6rem, 2.4vw, 2.1rem);
  margin: 0 0 $sp-1;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.02em;
}
.subtitle {
  color: rgba(255, 255, 255, 0.9);
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
</style>
