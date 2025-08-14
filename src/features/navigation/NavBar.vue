<!-- src/features/navigation/NavBar.vue -->
<template>
  <!-- Accessible skip link -->
  <a class="skip-link" href="#main">Skip to content</a>

  <nav :class="['navbar', `navbar--${theme}`]">
    <div
      ref="wrapper"
      class="menu-wrapper"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
      @focusin="onEnter"
      @focusout="onFocusOut"
    >
      <button
        class="menu-trigger"
        type="button"
        aria-haspopup="menu"
        :aria-expanded="showMenu ? 'true' : 'false'"
        @click="onToggle"
      >
        <span aria-hidden="true">☰</span>
        <span class="sr-only">Open menu</span>
      </button>

      <transition name="fade">
        <div v-if="showMenu" class="dropdown" role="menu">
          <RouterLink role="menuitem" to="/">Home</RouterLink>
          <RouterLink role="menuitem" to="/community">Community</RouterLink>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const theme = computed(() => route.meta.creator || "default");

const wrapper = ref(null);
const showMenu = ref(false);
const pinnedByClick = ref(false); // when true, stays open until click outside/toggle

function onEnter() {
  showMenu.value = true; // open as soon as pointer/focus is within wrapper (button or dropdown)
}
function onLeave() {
  if (!pinnedByClick.value) showMenu.value = false; // close only when leaving both, unless pinned
}
function onToggle() {
  pinnedByClick.value = !pinnedByClick.value;
  showMenu.value = pinnedByClick.value ? true : false;
}
function onFocusOut() {
  // Close if focus leaves the wrapper entirely (not pinned)
  setTimeout(() => {
    if (
      !pinnedByClick.value &&
      wrapper.value &&
      !wrapper.value.contains(document.activeElement)
    ) {
      showMenu.value = false;
    }
  }, 0);
}
function onDocClick(e) {
  if (!wrapper.value) return;
  if (!wrapper.value.contains(e.target)) {
    pinnedByClick.value = false;
    showMenu.value = false;
  }
}
onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

$nav-h: 52px;

/* Screen-reader-only helper */
.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip link */
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 10001;
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

/* Navbar */
.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: $nav-h;
  z-index: 10000;
  display: flex;
  align-items: center;
  padding: 0 $sp-2;
  background: rgba(245, 241, 234, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

/* Wrapper encloses trigger + dropdown so hover stays continuous */
.menu-wrapper {
  position: relative;
  margin-left: $sp-2;
  padding: $sp-1 $sp-2;
}

/* Trigger */
.menu-trigger {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.35rem 0.6rem;
  font-size: 1.15rem;
  line-height: 1;
  color: $color-dark;
  cursor: pointer;
}
.menu-trigger:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.8);
  outline-offset: 2px;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: calc(100% + 6px);
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
  z-index: 10002;

  /* invisible bridge to avoid any hover gap */
  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: -$sp-1;
    right: -$sp-1;
    height: 8px;
  }

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

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.16s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Small screens: keep panel fully visible */
@media (max-width: 600px) {
  .dropdown {
    left: 0;
    right: auto;
    transform: translateX(0);
  }
}
</style>
