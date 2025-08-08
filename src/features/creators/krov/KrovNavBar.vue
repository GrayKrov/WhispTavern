<!-- src/features/creators/krov/KrovNavBar.vue -->
<template>
  <nav class="krov-navbar" :class="{ 'is-open': open }">
    <!-- Menu on the LEFT -->
    <div
      class="menu-wrapper"
      @mouseenter="open = true"
      @mouseleave="open = false"
    >
      <button
        class="menu-icon"
        :aria-expanded="open ? 'true' : 'false'"
        aria-haspopup="true"
        @click="toggle"
        @keydown.down.prevent="open = true"
      >
        ☰
      </button>

      <transition name="fade-slide">
        <ul
          v-if="open"
          class="links"
          role="menu"
          ref="menuEl"
          @keyup.esc.prevent="open = false"
        >
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
      </transition>
    </div>

    <!-- Brand on the RIGHT of the menu (NOT a link anymore) -->
    <div class="brand" aria-label="Krov">
      <img src="@/assets/logos/krov-logo.png" alt="Krov Sigil" class="sigil" />
      <span class="title" aria-hidden="true">KROV</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";

const open = ref(false);
const menuEl = ref(null);

function toggle() {
  open.value = !open.value;
}

function onDocClick(e) {
  if (!open.value) return;
  // close if clicking outside the menu wrapper
  const wrapper = e.target.closest(".menu-wrapper");
  if (!wrapper) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

/* ------- NAV WRAPPER ------- */
.krov-navbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* menu then brand left-to-right */
  gap: $sp-3;
  padding: 0 $sp-3;
  z-index: 1000;

  background: #111;
  color: #e8e8e8;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background: repeating-linear-gradient(
        to right,
        #fff 0,
        #fff 1px,
        transparent 1px,
        transparent 12px
      ),
      repeating-linear-gradient(
        to bottom,
        #fff 0,
        #fff 1px,
        transparent 1px,
        transparent 12px
      );
    pointer-events: none;
  }
}

/* ------- BRAND ------- */
.brand {
  display: inline-flex;
  align-items: center;
  gap: $sp-2;
  text-decoration: none;
  color: inherit;

  .sigil {
    height: 2rem;
    width: auto;
    display: block;
    filter: grayscale(1) contrast(1.1) brightness(1.1);
  }

  .title {
    font-family: "Playfair Display", serif;
    letter-spacing: 0.15rem;
    font-size: 1.15rem;
    color: #efefef;
  }
}

/* ------- MENU ------- */
.menu-wrapper {
  position: relative;

  /* Invisible hover bridge to prevent “gap drop” while moving cursor down */
  &::after {
    content: "";
    position: absolute;
    left: -6px;
    right: -6px;
    top: 100%;
    height: 12px; /* the bridge thickness */
    background: transparent;
    z-index: 1; /* behind the dropdown; still inside wrapper */
  }
}

.menu-icon {
  position: relative;
  display: inline-block;
  background: transparent;
  border: 0;
  color: #efefef;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  padding: $sp-1 $sp-2;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    left: $sp-2;
    right: $sp-2;
    bottom: $sp-1 - 0.125rem;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 180ms ease-out;
    opacity: 0.55;
  }

  .is-open &::after,
  &:hover::after {
    transform: scaleX(1);
  }
}

.links {
  list-style: none;
  margin: 0;
  padding: 0;

  position: absolute;
  top: calc(100% + 12px); /* sits right below the 12px hover bridge */
  left: 0; /* align under the icon on the LEFT */
  right: auto;

  background: rgba(17, 17, 17, 0.9);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;

  min-width: 12rem;
  padding: $sp-2 $sp-3;

  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.02);

  z-index: 2; /* above the hover bridge */

  li + li {
    margin-top: $sp-1;
    padding-top: $sp-1;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  a,
  .router-link,
  .router-link-active {
    display: block;
    text-decoration: none;
    color: #f0f0f0;
    padding: $sp-2 0;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 0.975rem;
    position: relative;
    @include transition(color);

    &:before {
      content: "";
      position: absolute;
      left: -$sp-2;
      top: 50%;
      transform: translateY(-50%) scaleY(0);
      width: 2px;
      height: 70%;
      background: linear-gradient(#fff, #bbb);
      transition: transform 160ms ease-out;
      border-radius: 1px;
      opacity: 0.9;
    }
    &:hover,
    &:focus-visible {
      color: #ffffff;
    }
    &:hover:before,
    &:focus-visible:before {
      transform: translateY(-50%) scaleY(1);
    }
  }
}

/* transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 140ms ease, transform 140ms ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* responsive tweak */
@include respond(sm) {
  .krov-navbar {
    padding: 0 $sp-2;
    gap: $sp-2;
    .title {
      display: none;
    }
  }
}
</style>
