<template>
  <!-- Skip link: first focusable element -->
  <a class="skip-link" href="#main">Skip to content</a>

  <nav :class="['navbar', `navbar--${theme}`]">
    <div
      class="menu-wrapper"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <!-- button = keyboard + screen reader friendly -->
      <button
        class="menu-icon"
        type="button"
        :aria-expanded="showMenu ? 'true' : 'false'"
        aria-controls="primary-menu"
        @click="showMenu = !showMenu"
      >
        ☰
      </button>

      <transition name="fade">
        <div v-if="showMenu" id="primary-menu" class="dropdown">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/community">Community</RouterLink>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
const showMenu = ref(false);
const route = useRoute();
const theme = computed(() => route.meta.creator || "default");
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

$nav-h: 52px;

/* Accessible skip link — hidden until keyboard focus */
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 9999;
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
  position: fixed;
  inset: 0 0 auto 0;
  height: $nav-h;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 0 $sp-2;
  background: rgba(245, 241, 234, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .menu-icon {
    /* reset button defaults; keep your look */
    background: none;
    border: 0;
    padding: 0;
    color: $color-dark;
    font-size: 1.6rem;
  }
}

.menu-wrapper {
  position: relative;
  margin-left: $sp-2;
  padding: $sp-1 $sp-2;
  cursor: pointer;
}
.menu-wrapper::before {
  content: "";
  position: absolute;
  top: 100%;
  left: -$sp-1;
  width: calc(100% + #{$sp-2});
  height: $sp-3;
}

.dropdown {
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  min-width: 13rem;
  padding: $sp-3;
  border-radius: 0.7rem;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  background: linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.6)
      )
      padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.35), rgba(180, 150, 120, 0.35))
      border-box;
  border: 1px solid transparent;
  backdrop-filter: blur(12px);

  a {
    display: block;
    font-weight: 700;
    text-decoration: none;
    color: $color-dark;
    padding: $sp-2 0;
    position: relative;
    transition: color 0.18s ease;
  }
  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 6px;
    height: 2px;
    width: 0;
    background: linear-gradient(
      90deg,
      rgba(120, 93, 68, 1),
      rgba(180, 150, 120, 1)
    );
    transition: width 0.18s ease;
  }
  a:hover {
    color: $color-primary;
  }
  a:hover::after {
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
