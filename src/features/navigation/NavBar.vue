<!-- src/features/navigation/NavBar.vue -->
<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <nav :class="['navbar', `navbar--${theme}`]" aria-label="Primary">
    <div class="menu-wrapper" @mouseenter="onEnter" @mouseleave="onLeave">
      <button
        class="menu-icon"
        aria-label="Open menu"
        :aria-expanded="showMenu ? 'true' : 'false'"
        @click="toggleMenu"
      >
        ☰
      </button>

      <transition name="fade">
        <div v-if="showMenu" class="dropdown" role="menu">
          <RouterLink role="menuitem" to="/" @click="close">Home</RouterLink>
          <RouterLink role="menuitem" to="/community" @click="close">
            Community
          </RouterLink>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";

const showMenu = ref(false);
const route = useRoute();
const theme = computed(() => route.meta.creator || "default");

const supportsHover =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(hover: hover)").matches;

const onEnter = () => {
  if (supportsHover) showMenu.value = true;
};
const onLeave = () => {
  if (supportsHover) showMenu.value = false;
};
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const close = () => {
  showMenu.value = false;
};

watch(() => route.fullPath, close);
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;

$nav-h-desktop: 52px;
$nav-h-mobile: 46px;

/* Accessible skip link */
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 10000;
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

.navbar {
  --nav-h: #{$nav-h-desktop};

  position: fixed;
  inset: 0 0 auto 0;
  height: var(--nav-h);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 $sp-2;

  /* parchment gradient */
  $p1: $color-neutral;
  $p2: color.adjust($color-neutral, $lightness: -4%);
  background: linear-gradient(180deg, rgba($p1, 0.96), rgba($p2, 0.96));
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  .menu-icon {
    color: $color-dark;
    font-size: 1.6rem;
    line-height: 1;
    background: transparent;
    border: 0;
    padding: $sp-1 $sp-2;
    cursor: pointer;
  }
}

.menu-wrapper {
  position: relative;
}

/* Desktop dropdown (anchored to wrapper) */
.dropdown {
  $paper: color.adjust($color-neutral, $lightness: 2%);

  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 13rem;
  padding: $sp-2 $sp-3;
  z-index: 1100;

  background: linear-gradient($paper, $paper) padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.24), rgba(180, 150, 120, 0.24))
      border-box;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  a {
    display: block;
    margin: 0 calc(-1 * #{$sp-3}); /* full-width highlight on desktop */
    padding: $sp-2 $sp-3;
    font-weight: 700;
    text-decoration: none;
    color: $color-dark;
    border-radius: 0.6rem;
    outline: none;
  }
  a:hover {
    background: rgba(185, 138, 94, 0.12);
  }
  a:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.35) inset;
  }
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile layout: fixed, full-width dropdown below the bar */
@media (max-width: 600px) {
  .navbar {
    --nav-h: 46px;
    padding: 0 $sp-1;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: $color-neutral;
  }

  /* Compact dropdown card on mobile */
  .dropdown {
    position: fixed;
    top: calc(var(--nav-h) + #{$sp-1});
    /* anchor near the hamburger, not full width */
    left: calc(env(safe-area-inset-left, 0px) + #{$sp-2});
    right: auto;

    /* width never full-screen, but flexible */
    width: clamp(220px, 80vw, 130px);

    padding: $sp-2;
    border-radius: 0.75rem;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);

    /* handle tiny heights gracefully */
    max-height: min(60vh, 360px);
    overflow-y: auto;
  }

  .dropdown a {
    margin: 0; /* no negative margins on mobile */
    padding: $sp-2;
    border-radius: 0.6rem;
  }
}
</style>
