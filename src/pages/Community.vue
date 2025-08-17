<template>
  <div class="community-page">
    <CommunityBanner />

    <!-- Intro -->
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

    <!-- Standalone CTA -->
    <section class="cta" aria-labelledby="cta-title">
      <div class="cta-card">
        <h2 id="cta-title">Become a Creator</h2>
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
    </section>

    <!-- Grid -->
    <section class="list-wrap">
      <CommunityList />
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import CommunityBanner from "@/components/CommunityBanner.vue";
import CommunityList from "@/features/community/CommunityList.vue";

export default defineComponent({
  name: "CommunityPage",
  components: { CommunityBanner, CommunityList, RouterLink },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/tokens" as t;

.community-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: t.$space-6 t.$space-3;
}

/* Intro */
.intro {
  max-width: t.$container-max;
  text-align: center;
  margin: 0 auto t.$space-4;

  p {
    margin-bottom: t.$space-2;
    line-height: 1.8;
  }

  .cta-row {
    display: inline-flex;
    gap: t.$space-2;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* CTA above grid */
.cta {
  width: 100%;
  max-width: t.$container-max;
  margin: 0 auto t.$space-4;
}
.cta-card {
  background: linear-gradient(#f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.28);
  border-radius: t.$radius-lg;
  padding: t.$space-4;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  text-align: center;
  display: grid;
  place-content: center;
}
.cta-card h2 {
  margin: 0 0 t.$space-2;
  letter-spacing: 0.02em;
}
.cta-card p {
  margin: 0 0 t.$space-3;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: t.$space-2 t.$space-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;
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
.btn--sm {
  padding: t.$space-1 t.$space-2;
  box-shadow: none;
}

/* Grid wrapper */
.list-wrap {
  width: 100%;
  max-width: t.$container-max;
  margin: 0 auto;
}

/* ---------- RESPONSIVE CUTS ---------- */
@media (max-width: 600px) {
  .intro p {
    font-size: 0.98rem;
  }
  .cta-card {
    padding: t.$space-3;
  }
}
@media (max-width: 520px) {
  .intro .cta-row {
    width: 100%;
    max-width: 360px;
    flex-direction: column;
  }
  .btn {
    width: 100%;
    text-align: center;
  }
}
@media (max-width: 380px) {
  .community-page {
    padding: t.$space-4 t.$space-2;
  }
  .cta {
    margin-bottom: t.$space-3;
  }
}
</style>
