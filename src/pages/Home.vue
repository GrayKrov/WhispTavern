<template>
  <div class="home-page">
    <img :src="bannerImage" alt="Community Banner" class="banner" />
    <section class="about">
      <h1>About Us & Our Mission</h1>
      <p>
        WhispTavern is a cozy, all-in-one community built around friendship,
        creativity, and shared passions. From late-night gaming sessions and
        immersive roleplay worlds to collaborative storytelling and custom
        creations, we’re a home for those who thrive in good company and deep
        lore.
      </p>
      <p>
        Our community comes together around games like REPO, League of Legends,
        Among Us, and other party and co-op titles—whatever brings the most
        laughs and good times.
      </p>
      <p class="mission">
        <strong>Our mission is simple:</strong><br />
        Foster meaningful connections through games, stories, and shared
        imagination—while keeping it real, cozy, and fun.
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
    return {
      bannerImage,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.home-page {
  padding: calc(3rem + #{$sp-2}) $sp-2 $sp-3;

  .banner {
    /* unified banner size */
    width: 100%;
    max-width: 800px;
    height: 150px;
    display: block;
    margin: 0 auto $sp-3;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }

  .about {
    max-width: 700px;
    margin: 0 auto $sp-4;
    padding: $sp-3;
    background: color.adjust($color-neutral, $lightness: 2%);
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    line-height: 1.6;
    text-align: left;

    h1 {
      margin-bottom: $sp-2;
      font-size: 1.875rem;
      text-align: center;
    }

    p {
      margin-bottom: $sp-2;
      font-size: $fs-base;
    }

    .mission {
      margin-top: $sp-3;
      font-size: $fs-lg;
      text-align: center;
    }
  }
}

@include respond(md) {
  .home-page {
    padding: calc(3rem + #{$sp-2}) $sp-2 $sp-2;

    .banner {
      max-height: 130px;
    }

    .about {
      padding: $sp-2;

      p {
        font-size: 0.95rem;
      }

      .mission {
        font-size: 1.125rem;
      }
    }
  }
}

@include respond(sm) {
  .home-page {
    padding: calc(3rem + #{$sp-2}) $sp-2 $sp-2;

    .banner {
      max-height: 110px;
      border-radius: 0.5rem;
    }

    .about {
      margin-bottom: $sp-3;
      padding: $sp-2;

      h1 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.9rem;
      }

      .mission {
        font-size: 1rem;
      }
    }
  }
}
</style>
