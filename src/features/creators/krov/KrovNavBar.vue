<!-- src/features/creators/krov/KrovNavBar.vue -->
<template>
  <nav class="krov-navbar" :class="{ scrolled }">
    <div class="inner">
      <div class="brand">
        <img class="sigil" :src="krovLogo" alt="Krov Sigil" />
        <span class="title" aria-hidden="true">KROV</span>
      </div>

      <!-- Links -->
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
/* ✅ import the asset so bundler resolves it deterministically */
import krovLogo from "@/assets/logos/krov-logo.png";

const scrolled = ref(false);
const onScroll = () => {
  scrolled.value = window.scrollY > 4;
};
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

/* Taller navbar for a larger sigil */
$krov-nav-h: 92px;

.krov-navbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: $krov-nav-h;
  z-index: 1000;
  background: #111;
  color: #eee;
  transition: box-shadow 180ms ease;

  &.scrolled {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 8px 22px rgba(0, 0, 0, 0.22);
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

/* Brand */
.brand {
  display: inline-flex;
  align-items: center;
  gap: $sp-2;
  color: inherit;
  pointer-events: none; /* ensures no accidental click behavior */
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

/* Links */
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
