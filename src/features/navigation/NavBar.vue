<template>
  <header class="nav">
    <a class="skip-link" href="#main">Skip to content</a>

    <div class="nav__inner">
      <!-- Left nav -->
      <nav class="nav__side nav__side--left" aria-label="Primary">
        <RouterLink class="pill" to="/">Home</RouterLink>
      </nav>

      <!-- Blu centerpiece (non-clickable) -->
      <div class="nav__center" aria-hidden="true">
        <div class="badge">
          <picture>
            <source
              srcset="@/assets/branding/blu/badge/blu-badge.webp"
              type="image/webp"
            />
            <img src="@/assets/branding/blu/badge/blu-badge.png" alt="" />
          </picture>
        </div>
      </div>

      <!-- Right nav -->
      <nav class="nav__side nav__side--right" aria-label="Primary">
        <RouterLink class="pill" to="/community">Community</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
@use "@/assets/styles/tokens" as t;

.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(#1e1813, #17120e);
  border-bottom: 1px solid rgba(0, 0, 0, 0.35);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

/* keeps everything aligned to your site width */
.nav__inner {
  max-width: t.$container-max;
  margin: 0 auto;
  padding: t.$space-2 t.$space-3;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: t.$space-2;
}

/* sides align text toward Blu for symmetry */
.nav__side {
  display: flex;
  gap: t.$space-2;
}
.nav__side--left {
  justify-content: flex-end;
}
.nav__side--right {
  justify-content: flex-start;
}

/* center badge */
.nav__center {
  display: grid;
  place-items: center;
}
.badge {
  width: clamp(48px, 7vw, 72px);
  height: clamp(48px, 7vw, 72px);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5),
    inset 0 2px 6px rgba(255, 255, 255, 0.25);
  isolation: isolate;
}
.badge img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* your art is framed nicely */
}

/* rounded “pill” links that don’t flash */
.pill {
  display: inline-block;
  padding: t.$space-2 t.$space-3;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.pill:hover {
  background: rgba(255, 255, 255, 0.14);
}
.pill.router-link-active {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.08);
}

/* a11y helper */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
}
.skip-link:focus {
  left: t.$space-3;
  top: t.$space-2;
  background: #fff;
  color: #000;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
}

/* mobile: keep Blu visible, tuck pills closer */
@media (max-width: 640px) {
  .nav__inner {
    gap: t.$space-1;
  }
  .pill {
    padding: t.$space-1 t.$space-2;
  }
}
</style>
