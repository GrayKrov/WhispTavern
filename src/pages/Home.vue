<template>
  <div class="home-page">
    <img :src="bannerImage" alt="WhispTavern banner" class="banner" />

    <section class="about">
      <h1>Welcome to WhispTavern</h1>
      <p>
        WhispTavern is a cozy, all-in-one community built around friendship,
        creativity, and shared passions. From late-night gaming sessions and
        immersive roleplay worlds to collaborative storytelling and custom
        creations, we’re a home for those who thrive in good company and deep
        lore.
      </p>
      <p>
        We gather around games like REPO, League of Legends, Among Us, and a
        rotating mix of party/co-op titles—whatever brings the most laughs and
        shared moments.
      </p>
      <p class="mission">
        <strong>Our mission:</strong> Foster meaningful connections through
        games, stories, and shared imagination—while keeping it real, cozy, and
        fun.
      </p>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import bannerImage from "@/assets/images/BannerTop.jpg";

export default defineComponent({
  name: "HomePage",
  data() {
    return { bannerImage };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.home-page {
  /* leaves space under fixed navbar from AppLayout */
  padding: calc(3.25rem + #{$sp-2}) $sp-2 $sp-3;

  .banner {
    width: 100%;
    max-width: 800px;
    height: 150px; /* unified with Community banner */
    display: block;
    margin: 0 auto $sp-4;
    border-radius: 0.75rem;
    object-fit: cover;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .about {
    max-width: 740px;
    margin: 0 auto $sp-4;
    padding: $sp-4 $sp-3;
    background: color.adjust($color-neutral, $lightness: 2%);
    border-radius: 1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    line-height: 1.7;
    text-align: left;

    h1 {
      margin: 0 0 $sp-3;
      font-size: 1.875rem;
      text-align: center;
      letter-spacing: 0.02em;
    }

    p {
      margin-bottom: $sp-3;
      font-size: $fs-base;
    }

    .mission {
      margin-top: $sp-2;
      font-size: $fs-lg;
      text-align: center;
      font-style: italic;
    }
  }
}

@include respond(md) {
  .home-page {
    padding: calc(3rem + #{$sp-2}) $sp-2 $sp-2;

    .about {
      padding: $sp-3;
    }
  }
}

@include respond(sm) {
  .home-page {
    padding: calc(3rem + #{$sp-2}) $sp-2 $sp-2;

    .banner {
      height: 130px;
      border-radius: 0.6rem;
    }

    .about {
      padding: $sp-2;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 0.95rem;
      }
      .mission {
        font-size: 1rem;
      }
    }
  }
}
</style>
