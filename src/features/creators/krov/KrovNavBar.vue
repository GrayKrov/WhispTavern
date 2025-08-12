<template>
  <!-- skip to Krov main content -->
  <a class="skip-link" href="#krov-main">Skip to content</a>

  <nav class="krov-navbar" :class="{ scrolled }">
    <div class="inner">
      <div class="brand">
        <!-- Decorative since the word KROV is visible -->
        <img
          class="sigil"
          :src="krovLogo"
          alt="Krov Sigil"
          width="128"
          height="128"
          decoding="async"
          fetchpriority="low"
        />
        <span class="title" aria-hidden="false">KROV</span>
      </div>

      <ul class="nav-links" role="menubar">
        <li role="none">
          <RouterLink role="menuitem" to="/">Home</RouterLink>
        </li>
        <li role="none">
          <RouterLink role="menuitem" to="/community">Community</RouterLink>
        </li>
        <li role="none">
          <a
            role="menuitem"
            href="https://github.com/graykrov"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
/* ✅ use WebP for the sigil */
import krovLogo from "@/assets/logos/krov-logo.webp";

const scrolled = ref(false);
const onScroll = () => {
  scrolled.value = window.scrollY > 4;
};
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

/* Skip link (same pattern) */
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 1001;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
  background: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  outline: 2px solid #000;
}

/* (rest unchanged) */
$krov-nav-h: 92px;

.krov-navbar {
  box-shadow: none;
  position: fixed;
  inset: 0 0 auto 0;
  height: $krov-nav-h;
  z-index: 1000;
  background: #111;
  color: #eee;
  transition: box-shadow 180ms ease;

  &.scrolled {
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: $sp-3;
    padding: 0 $sp-3;
  }
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: $sp-2;
  color: inherit;
  pointer-events: none;
  user-select: none;

  .sigil {
    height: 64px;
    width: auto;
    display: block;
    filter: grayscale(1) contrast(1.05);
  }
  .title {
    font-weight: 800;
    letter-spacing: 0.16rem;
    font-size: 1.1rem;
    color: #f3f3f3;
  }
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  gap: $sp-3;
  align-items: center;

  a {
    position: relative;
    text-decoration: none;
    color: #f1f1f1;
    font-weight: 700;
    letter-spacing: 0.02em;
    font-size: 0.98rem;
    padding: 0.25rem 0;
    transition: color 140ms ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.55),
        transparent
      );
      transform: scaleX(0);
      transform-origin: 50% 50%;
      transition: transform 160ms ease;
      opacity: 0.6;
    }
    &:hover,
    &:focus-visible {
      color: #fff;
      outline: none;
    }
    &:hover::after,
    &:focus-visible::after {
      transform: scaleX(1);
    }
  }
}

@media (max-width: 768px) {
  .krov-navbar .inner {
    padding: 0 $sp-2;
    gap: $sp-2;
  }
  .brand .title {
    display: none;
  }
  .nav-links {
    gap: $sp-2;
    a {
      font-size: 0.95rem;
    }
  }
  .brand .sigil {
    height: 56px;
  }
}

@media (max-width: 480px) {
  .krov-navbar.scrolled {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  }
  .nav-links {
    gap: $sp-1;
    a {
      font-weight: 600;
      font-size: 0.9rem;
    }
  }
  .brand .sigil {
    height: 50px;
  }
}
</style>
