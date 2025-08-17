<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero" :style="heroStyle">
      <div class="hero__overlay">
        <CrestBadge class="hero__crest" :size="74" />
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
        We like things handcrafted: thoughtful conversations, small-group
        sessions that don’t feel like shouty lobbies, and creator pages built to
        fit each person’s aesthetic.
      </p>
      <p>
        What sets us apart isn’t just the games; it’s the way we show up—kind,
        inclusive, and genuinely cozy. New folks get welcomed, small victories
        get celebrated, and collaboration is the default.
      </p>
      <p class="mission">
        <strong>Our mission:</strong> Friendships through play & creation—kept
        real.
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
import CrestBadge from "@/components/CrestBadge.vue";
import AnnouncementsList from "@/components/AnnouncementsList.vue";
import LinkButton from "@/components/ui/LinkButton.vue";

export default defineComponent({
  name: "HomePage",
  components: { CrestBadge, AnnouncementsList, LinkButton },
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
@use "@/assets/styles/tokens" as t;

.home {
  padding: calc(3.5rem + #{t.$space-2}) 0 t.$space-6;
}

/* ---------- HERO ---------- */
.hero {
  --crest-top: 22px;

  position: relative;
  width: 100%;
  max-width: t.$container-max;
  height: clamp(240px, 34vw, 480px);
  margin: 0 auto t.$space-6;
  border-radius: t.$radius-lg;
  overflow: hidden;
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.22);
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
  transform: scale(1.06);
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
  background-size: cover;
  background-position: center;
}

.hero__overlay {
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

.hero__crest {
  position: absolute;
  top: var(--crest-top);
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
}

.kicker {
  margin: calc(var(--crest-top) + 48px) 0 t.$space-1 0;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.92rem;
}
.hero__overlay h1 {
  color: #fff;
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  margin: 0 0 t.$space-2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}
.tagline {
  color: rgba(255, 255, 255, 0.96);
  margin: 0 auto t.$space-2;
  max-width: 860px;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.hero__ctas {
  display: inline-flex;
  gap: t.$space-2;
  flex-wrap: wrap;
  justify-content: center;
}

/* trust chips */
.trust {
  list-style: none;
  display: flex;
  gap: t.$space-2;
  padding: 0;
  margin: t.$space-3 0 0;
  justify-content: center;
  flex-wrap: wrap;
}
.trust li {
  padding: t.$space-1 t.$space-2;
  border-radius: t.$radius-pill;
  font-weight: 700;
  font-size: 0.9rem;
  color: #2b241c;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* ---------- ABOUT ---------- */
.about {
  --paper: #{color.adjust(t.$c-parchment, $lightness: 2%)};
  max-width: t.$container-max;
  margin: 0 auto t.$space-6;
  padding: t.$space-6 t.$space-4;
  background: linear-gradient(var(--paper), var(--paper)) padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.28), rgba(180, 150, 120, 0.28))
      border-box;
  border: 1px solid transparent;
  border-radius: t.$radius-lg;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16),
    0 1px 0 rgba(255, 255, 255, 0.35) inset;
  line-height: 1.85;
  color: #2b241c;
  text-align: left;
}
.about p {
  margin-bottom: t.$space-3;
}
.mission {
  margin-top: t.$space-2;
  font-size: t.$fs-lg;
  text-align: center;
  font-style: italic;
  padding: t.$space-3 t.$space-2;
  border-radius: 0.75rem;
  background: rgba(255, 228, 185, 0.28);
  box-shadow: inset 0 0 0 1px rgba(120, 93, 68, 0.25);
}
.subhead {
  margin: t.$space-3 0 t.$space-2;
  text-align: center;
}
.values {
  margin: 0 auto;
  padding-left: 1.1rem;
  max-width: 820px;
}

/* ---------- INVITE (container controls width, card fills it) ---------- */
.invite {
  width: 100%;
  max-width: t.$container-max; /* same container width as About/Hero */
  margin: 0 auto; /* center like the others */
  padding: t.$space-6 t.$space-3 t.$space-6;
  display: grid;
  place-items: center;
}
.invite__card {
  width: 100%; /* fill the section width */
  max-width: none; /* no self-constraining */
  text-align: center;
  padding: t.$space-6 t.$space-4;

  /* identical visual language */
  @include t.parchment(2%);
  @include t.noise(0.012, 0.008);
  border-radius: t.$radius-lg;
  box-shadow: t.$shadow-soft;
}
.invite__card p {
  margin: 0 0 t.$space-3;
  color: #4b3f33;
}

/* ---------- RESPONSIVE CUTS ---------- */
@media (max-width: 980px) {
  .hero__crest {
    display: none;
  } /* no overlap */
  .kicker {
    margin: t.$space-1 0;
  }
}
@media (max-width: 960px) {
  .hero {
    height: clamp(220px, 42vw, 420px);
  }
}
@media (max-width: 720px) {
  .hero {
    height: clamp(210px, 48vw, 360px);
  }
  .kicker {
    font-size: 0.85rem;
    letter-spacing: 0.1em;
  }
  .hero__overlay h1 {
    font-size: clamp(1.8rem, 6vw, 2.4rem);
  }
  .tagline {
    font-size: 0.98rem;
    max-width: 640px;
  }
}
@media (max-width: 560px) {
  .hero {
    height: 220px;
  }
  .tagline {
    font-size: 0.94rem;
  }
  .trust {
    display: none;
  }
  .invite__card {
    padding: t.$space-4 t.$space-3;
  } /* compact on small screens */
}
@media (max-width: 420px) {
  .hero {
    height: 200px;
  }
  .kicker {
    display: none;
  }
  .hero__overlay h1 {
    font-size: clamp(1.6rem, 7vw, 2rem);
    margin-bottom: 0.6rem;
  }
  .tagline {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
  .hero__ctas {
    flex-direction: column;
    width: min(100%, 320px);
    margin: 0 auto;
  }
}
@media (max-width: 360px) {
  .hero {
    height: 190px;
  }
  .tagline {
    display: none;
  }
}
</style>
