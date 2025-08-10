<template>
  <div class="community-page">
    <CommunityBanner />

    <!-- Intro + CTA -->
    <section class="intro">
      <p>
        Meet the creators, collaborators, and friends who make our tavern
        special. Pull up a chair, browse the cards, and say hello.
      </p>
      <div class="cta-row">
        <a
          class="btn btn--primary"
          href="https://discord.com/invite/JfMh3P57zh"
          target="_blank"
          rel="noopener"
          >Join the Discord</a
        >
        <RouterLink class="btn btn--ghost" to="/">Back to Home</RouterLink>
      </div>
    </section>

    <!-- Grid -->
    <section class="list-wrap">
      <!-- Pinned CTA tile -->
      <div class="cta-card">
        <h3>Become a Creator</h3>
        <p>
          Want a custom page that matches your vibe? We’ll build it with you.
        </p>
        <a
          class="btn btn--primary"
          href="https://discord.com/invite/JfMh3P57zh"
          target="_blank"
          rel="noopener"
          >Start Here</a
        >
      </div>

      <CommunityList />
    </section>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import CommunityBanner from "@/components/CommunityBanner.vue";
import CommunityList from "@/features/community/CommunityList.vue";

export default {
  name: "CommunityPage",
  components: { CommunityBanner, CommunityList, RouterLink },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.community-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $sp-4 $sp-3;
}

/* Intro */
.intro {
  max-width: 900px;
  text-align: center;
  margin: 0 auto ($sp-4 + $sp-2);
  p {
    margin-bottom: $sp-2;
    line-height: 1.8;
  }
  .cta-row {
    display: inline-flex;
    gap: $sp-2;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Buttons (match Home) */
.btn {
  display: inline-block;
  padding: $sp-2 $sp-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;
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

.btn--primary {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
}
.btn--ghost {
  background: rgba(0, 0, 0, 0.06);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
}
.btn--ghost:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
}

/* Grid */
.list-wrap {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $sp-3;
}

/* CTA tile */
.cta-card {
  background: linear-gradient(#f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.28);
  border-radius: 1rem;
  padding: $sp-3;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  text-align: center;
  display: grid;
  place-content: center;
}
.cta-card h3 {
  margin: 0 0 $sp-2;
  letter-spacing: 0.02em;
}
.cta-card p {
  margin: 0 0 $sp-3;
}
</style>
