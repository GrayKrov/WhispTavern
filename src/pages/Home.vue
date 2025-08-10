<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero" :style="heroStyle">
      <div class="hero__overlay">
        <p class="kicker">A cozy corner of the internet</p>
        <h1>Welcome to WhispTavern</h1>
        <p class="tagline">
          Games, stories, and creator spaces—crafted by people who care about
          the vibe.
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

        <!-- trust chips -->
        <ul class="trust">
          <li>Kind & inclusive</li>
          <li>Creator-friendly</li>
          <li>Low pressure, high camaraderie</li>
        </ul>
      </div>
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

    <!-- INVITE PANEL -->
    <section class="invite">
      <div class="invite__card">
        <h3>Pull up a chair.</h3>
        <p>Jump in for game nights, creator collabs, and good company.</p>
        <a
          class="btn btn--primary btn--wide"
          href="https://discord.com/invite/JfMh3P57zh"
          target="_blank"
          rel="noopener"
          >Join the Tavern</a
        >
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import bannerImage from "@/assets/images/BannerTop.jpg";

export default defineComponent({
  name: "HomePage",
  components: { RouterLink },
  data() {
    return {
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
    height: clamp(170px, 28vw, 260px);
    margin: 0 auto ($sp-4 + $sp-2);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.16);
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
    filter: blur(16px) saturate(0.95) brightness(0.95);
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

  /* overlay (full-bleed) with lantern glow + silky sheen (no jump) */
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
  .hero__overlay .kicker {
    margin: 0 0 $sp-1;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  .hero__overlay h1 {
    color: $color-neutral;
    font-size: clamp(1.8rem, 2.6vw, 2.25rem);
    margin: 0 0 $sp-2;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.02em;
  }
  .hero__overlay .tagline {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 auto $sp-2;
    max-width: 760px;
    font-size: clamp(0.95rem, 1.2vw, 1.08rem);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  }
  .hero__overlay .hero__ctas {
    display: inline-flex;
    gap: $sp-2;
    flex-wrap: wrap;
    justify-content: center;
  }
  /* Lantern glow */
  .hero__overlay::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
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
  /* Super-soft drifting sheen (ping-pong, no jump) */
  .hero__overlay::after {
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
    will-change: transform, opacity;
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
    position: relative;
    overflow: hidden;
  }
  .btn::after {
    content: "";
    position: absolute;
    inset: 0 -30%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.45s ease;
    pointer-events: none;
  }
  .btn:hover::after {
    transform: translateX(100%);
  }

  /* Primary: warm amber gradient */
  .btn--primary {
    background: linear-gradient(140deg, #b98a5e, #d9b793);
    color: #2b241c;
    border-color: rgba(0, 0, 0, 0.06);
  }
  .btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
  }

  /* Ghost: glassy over the hero */
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
  .btn--wide {
    padding: $sp-2 ($sp-4 + $sp-2);
  }

  /* Trust chips */
  .trust {
    list-style: none;
    display: flex;
    gap: $sp-2;
    padding: 0;
    margin: $sp-3 0 0;
    justify-content: center;
    flex-wrap: wrap;
  }
  .trust li {
    padding: $sp-1 $sp-2;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.85rem;
    color: #2b241c;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
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

  /* INVITE PANEL */
  .invite {
    display: grid;
    place-items: center;
    padding: ($sp-4 + $sp-2) $sp-3 $sp-4;
  }
  .invite__card {
    width: 100%;
    max-width: 980px;
    text-align: center;
    padding: ($sp-4 + $sp-2) $sp-3;
    border-radius: 1rem;
    background: radial-gradient(
        120% 120% at 50% 0%,
        rgba(255, 220, 170, 0.25),
        transparent 60%
      ),
      linear-gradient(140deg, #f9f5ee, #f7f1e8);
    border: 1px solid rgba(120, 93, 68, 0.28);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
  }
  .invite__card h3 {
    margin: 0 0 $sp-2;
    font-size: clamp(1.4rem, 2.1vw, 1.8rem);
    letter-spacing: 0.02em;
  }
  .invite__card p {
    margin: 0 0 $sp-3;
    color: #4b3f33;
  }
}

/* small tweak */
@include respond(sm) {
  .home-page .hero {
    border-radius: 0.9rem;
  }
}
</style>
