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
          <LinkButton
            variant="primary"
            href="https://discord.com/invite/JfMh3P57zh"
          >
            Join the Tavern
          </LinkButton>
          <LinkButton variant="ghost" :to="'/community'"
            >Meet the Creators</LinkButton
          >
        </div>

        <ul class="trust">
          <li>Kind & inclusive</li>
          <li>Creator-friendly</li>
          <li>Low pressure, high camaraderie</li>
        </ul>
      </div>
    </section>

    <!-- ABOUT -->
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
      </p>
      <p>
        What sets us apart isn’t just the games; it’s the way we show up. We
        keep it kind, inclusive, and genuinely cozy. New folks get welcomed,
        small victories get celebrated, and collaboration is the default.
      </p>
      <p class="mission">
        <strong>Our mission:</strong> Foster lasting friendships through play
        and creation—keeping it cozy, kind, and real.
      </p>
      <h3 class="subhead">How we live it</h3>
      <ul class="values">
        <li>
          <strong>Create together:</strong> We build things and give credit
          generously.
        </li>
        <li>
          <strong>Play kindly:</strong> Low drama, high respect. We protect the
          vibe.
        </li>
        <li>
          <strong>Grow with care:</strong> Quality over noise; we’d rather know
          names than chase numbers.
        </li>
      </ul>
    </section>

    <AnnouncementsList />

    <!-- INVITE -->
    <section class="invite">
      <div class="invite__card">
        <h3>Pull up a chair.</h3>
        <p>Jump in for game nights, creator collabs, and good company.</p>
        <LinkButton
          variant="primary"
          wide
          href="https://discord.com/invite/JfMh3P57zh"
        >
          Join the Tavern
        </LinkButton>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import bannerJpg from "@/assets/images/BannerTop.webp";
import bannerWebp from "@/assets/images/BannerTop.webp";
import bannerAvif from "@/assets/images/BannerTop.avif";
import AnnouncementsList from "@/components/AnnouncementsList.vue";
import LinkButton from "@/components/ui/LinkButton.vue";

export default defineComponent({
  name: "HomePage",
  components: { AnnouncementsList, LinkButton },
  data() {
    return {
      heroStyle: {
        "--hero-jpg": `url(${bannerJpg})`,
        "--hero-webp": `url(${bannerWebp})`,
        "--hero-avif": `url(${bannerAvif})`,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;

.home-page {
  padding: calc(3.5rem + #{$sp-2}) 0 $sp-4;
}

/* HERO */
.hero {
  position: relative;
  width: 100%;
  max-width: 1080px;
  height: clamp(170px, 28vw, 300px);
  margin: 0 auto ($sp-4 + $sp-2);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.14);
  background: #f5f1ea;
}
.hero::before {
  content: "";
  position: absolute;
  inset: -8%;
  background-image: var(--hero-jpg);
  background-image: image-set(
    var(--hero-avif) type("image/avif"),
    var(--hero-webp) type("image/webp"),
    var(--hero-jpg) type("image/jpeg")
  );
  background-size: cover;
  background-position: center;
  filter: blur(16px) saturate(0.95) brightness(0.95);
  transform: scale(1.08);
}
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--hero-jpg);
  background-image: image-set(
    var(--hero-avif) type("image/avif"),
    var(--hero-webp) type("image/webp"),
    var(--hero-jpg) type("image/jpeg")
  );
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
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
    rgba(50, 35, 24, 0.26),
    rgba(50, 35, 24, 0.46)
  );
}
.kicker {
  margin: 0 0 $sp-1;
  color: rgba(255, 255, 255, 0.88);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.82rem;
}
.hero__overlay h1 {
  color: $color-neutral;
  font-size: clamp(1.8rem, 2.6vw, 2.25rem);
  margin: 0 0 $sp-2;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}
.tagline {
  color: rgba(255, 255, 255, 0.92);
  margin: 0 auto $sp-2;
  max-width: 760px;
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.hero__ctas {
  display: inline-flex;
  gap: $sp-2;
  flex-wrap: wrap;
  justify-content: center;
}

/* trust chips */
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
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* ABOUT */
.about {
  --paper: #{color.adjust($color-neutral, $lightness: 2%)};
  max-width: 900px;
  margin: 0 auto ($sp-4 + $sp-3);
  padding: $sp-4 $sp-3;
  background: linear-gradient(var(--paper), var(--paper)) padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.28), rgba(180, 150, 120, 0.28))
      border-box;
  border: 1px solid transparent;
  border-radius: 1rem;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.35) inset;
  line-height: 1.8;
  color: #2b241c;
  text-align: left;
}
.about p {
  margin-bottom: $sp-3;
}
.about .mission {
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

/* INVITE */
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
      rgba(255, 220, 170, 0.22),
      transparent 60%
    ),
    linear-gradient(140deg, #f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.26);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
}
.invite__card p {
  margin: 0 0 $sp-3;
  color: #4b3f33;
}

/* ——— Mobile: drop blur layer, smaller paddings, lighter shadows ——— */
@media (max-width: 600px) {
  .home-page {
    padding: 3rem 0 $sp-3;
  }
  .hero {
    height: 190px;
    box-shadow: 0 12px 22px rgba(0, 0, 0, 0.12);
  }
  .hero::before {
    display: none;
  }
  .hero::after {
    background-size: cover;
  }
  .hero__overlay {
    padding: 0 $sp-2;
    background: linear-gradient(
      180deg,
      rgba(50, 35, 24, 0.22),
      rgba(50, 35, 24, 0.38)
    );
  }
  .invite {
    padding: $sp-4 $sp-2;
  }
  .invite__card {
    padding: $sp-4 $sp-2;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.1);
  }
  .about {
    padding: $sp-3 $sp-2;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.3) inset;
  }
}
@media (max-width: 520px) {
  .trust {
    display: none;
  }
}
</style>
