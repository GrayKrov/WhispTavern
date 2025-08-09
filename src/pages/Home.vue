<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero" :style="heroStyle">
      <div class="hero__overlay">
        <h1>Welcome to WhispTavern</h1>
        <p class="tagline">
          A cozy haven for games, stories, and creators—pull up a chair.
        </p>
        <div class="hero__ctas">
          <a
            class="btn btn--primary"
            href="https://discord.com/invite/JfMh3P57zh"
            target="_blank"
            rel="noopener"
            >Join the Tavern</a
          >
          <RouterLink class="btn btn--ghost" to="/community"
            >Meet the Creators</RouterLink
          >
        </div>
      </div>
      <!-- embers removed -->
    </section>

    <!-- ABOUT (parchment) -->
    <section class="about">
      <p>
        WhispTavern is a warm, low-pressure corner of the internet where play
        and creativity come first. Pull up a chair, meet a few friendly faces,
        and jump into whatever we’re spinning up that night—ranked queues, a
        spontaneous co-op run, or a silly party game that has us crying with
        laughter.
      </p>

      <p>
        We’re a community of players and creators who like things handcrafted:
        thoughtful conversations, small-group sessions that don’t feel like
        shouty lobbies, and creator pages built to fit each person’s aesthetic.
        Our regulars gather around REPO, League of Legends, Among Us, and a
        rotating mix of party/co-op titles—plus the occasional one-shot event
        when inspiration hits.
      </p>

      <p>
        What sets us apart isn’t just the games; it’s the way we show up. We
        keep it kind, inclusive, and genuinely cozy. New folks get welcomed,
        small victories get celebrated, and collaboration is the default.
        Whether you’re here to squad up, to build a personal creator space, or
        to test a weird idea with supportive people, there’s always a seat by
        the fire.
      </p>

      <p class="mission">
        <strong>Our mission:</strong> Foster lasting friendships through play
        and creation—keeping it cozy, kind, and real.
      </p>

      <h3 class="subhead">How we live it</h3>
      <ul class="values">
        <li>
          <strong>Create together:</strong> We build things—events, pages,
          projects—and give credit generously.
        </li>
        <li>
          <strong>Play kindly:</strong> Low drama, high respect. We protect the
          vibe and the people in it.
        </li>
        <li>
          <strong>Grow with care:</strong> Quality over noise; we’d rather know
          names than chase numbers.
        </li>
      </ul>
    </section>

    <!-- FEATURED (horizontal scroll) -->
    <section class="featured">
      <h2>Featured in the Tavern</h2>
      <div class="strip">
        <CommunityCard name="Krov" :avatarSrc="krovAvatar" routerLink="/krov" />
        <!-- Add more cards here as you grow -->
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import bannerImage from "@/assets/images/BannerTop.jpg";
import CommunityCard from "@/features/community/CommunityCard.vue";
import krovAvatar from "@/assets/avatars/Krov.jpg";

export default defineComponent({
  name: "HomePage",
  components: { RouterLink, CommunityCard },
  data() {
    return {
      krovAvatar,
      // CSS var powers blurred-cover + crisp-contain layering in CSS
      heroStyle: { "--hero-url": `url(${bannerImage})` },
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.home-page {
  /* space under fixed navbar */
  padding: calc(3.5rem + #{$sp-2}) 0 $sp-4;

  /* HERO — compact + small-image safe (blurred cover behind crisp contain) */
  .hero {
    position: relative;
    width: 100%;
    max-width: 1080px;
    height: clamp(160px, 26vw, 240px);
    margin: 0 auto ($sp-4 + $sp-2);
    border-radius: 0.9rem;
    overflow: hidden;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
    background: #f5f1ea;
  }

  /* blurred cover layer */
  .hero::before {
    content: "";
    position: absolute;
    inset: -8%;
    background-image: var(--hero-url);
    background-size: cover;
    background-position: center;
    filter: blur(14px) saturate(0.95) brightness(0.95);
    transform: scale(1.08);
  }

  /* crisp contain layer */
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--hero-url);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* overlay (full-bleed) with lantern glow */
  .hero__overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-content: center;
    text-align: center;
    padding: 0 $sp-3;
    background: linear-gradient(
      180deg,
      rgba(50, 35, 24, 0.28),
      rgba(50, 35, 24, 0.48)
    );
  }
  .hero__overlay h1 {
    color: $color-neutral;
    font-size: clamp(1.6rem, 2.2vw, 2rem);
    margin: 0 0 $sp-2;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.02em;
  }
  .hero__overlay .tagline {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 auto $sp-2;
    max-width: 720px;
    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  }
  .hero__overlay .hero__ctas {
    display: inline-flex;
    gap: $sp-2;
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero__overlay::before {
    /* lantern glow */
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
    z-index: -1;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: $sp-2 $sp-3;
    border-radius: 0.66rem;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid transparent;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
    transition: transform 0.12s ease, box-shadow 0.12s ease,
      background 0.12s ease, color 0.12s ease;
    will-change: transform;
  }

  /* Primary: warm amber gradient */
  .btn--primary {
    background: linear-gradient(140deg, #b98a5e, #d9b793);
    color: #2b241c; /* dark cocoa text */
    border-color: rgba(0, 0, 0, 0.06);
  }
  .btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
  }

  /* Ghost: glassy, on top of the hero overlay */
  .btn--ghost {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
  }
  .btn--ghost:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
  }

  /* Accessibility focus */
  .btn:focus-visible {
    outline: 2px solid rgba(255, 224, 173, 0.9);
    outline-offset: 2px;
  }

  /* ABOUT parchment */
  .about {
    --paper: #{color.adjust($color-neutral, $lightness: 2%)};
    max-width: 900px;
    margin: 0 auto ($sp-4 + $sp-3);
    padding: $sp-4 $sp-3;
    background: linear-gradient(var(--paper), var(--paper)) padding-box,
      linear-gradient(
          140deg,
          rgba(120, 93, 68, 0.35),
          rgba(180, 150, 120, 0.35)
        )
        border-box;
    border: 1px solid transparent;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12),
      0 1px 0 rgba(255, 255, 255, 0.35) inset;
    line-height: 1.8;
    text-align: left;
    color: #2b241c;

    p {
      margin-bottom: $sp-3;
    }

    p:first-of-type::first-letter {
      float: left;
      font-size: 3.2rem;
      line-height: 0.9;
      font-weight: 700;
      padding-right: $sp-2;
      color: color.adjust($color-secondary, $lightness: -4%);
      font-family: "Georgia", serif;
    }

    .mission {
      margin-top: $sp-2;
      font-size: $fs-lg;
      text-align: center;
      font-style: italic;
      padding: $sp-3 $sp-2;
      border-radius: 0.75rem;
      background: rgba(255, 228, 185, 0.28);
      box-shadow: inset 0 0 0 1px rgba(120, 93, 68, 0.25);
    }

    .subhead {
      margin: $sp-3 0 $sp-2;
      text-align: center;
    }
    .values {
      margin: 0 auto;
      padding-left: 1.1rem;
      max-width: 780px;
    }
  }

  /* FEATURED STRIP */
  .featured {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $sp-3;

    h2 {
      text-align: center;
      margin-bottom: $sp-3;
      letter-spacing: 0.02em;
    }

    .strip {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(220px, 260px);
      gap: $sp-3;
      overflow-x: auto;
      padding-bottom: $sp-2;
      scroll-snap-type: x mandatory;
    }
    .strip > * {
      scroll-snap-align: start;
    }
  }
}

/* small tweak */
@include respond(sm) {
  .home-page .hero {
    border-radius: 0.8rem;
  }
}
</style>
