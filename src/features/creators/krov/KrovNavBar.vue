<!-- src/features/creators/krov/KrovNavBar.vue -->
<template>
  <nav class="krov-navbar">
    <div class="brand">
      <img src="@/assets/logos/krov-logo.png" alt="Krov Sigil" class="sigil" />
      <span class="title">KROV</span>
    </div>

    <div
      class="menu-wrapper"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <div class="menu-icon">☰</div>
      <transition name="fade">
        <ul v-if="showMenu" class="links">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/community">Community</RouterLink></li>
          <li>
            <a
              href="https://github.com/graykrov"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const showMenu = ref(false);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.krov-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $color-dark;
  padding: $sp-2 $sp-3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  .brand {
    display: flex;
    align-items: center;

    .sigil {
      height: 2.5rem;
      margin-right: $sp-2;
    }

    .title {
      font-family: "Playfair Display", serif;
      font-size: 1.5rem;
      color: $color-neutral;
      letter-spacing: 0.1rem;
    }
  }

  .menu-wrapper {
    position: relative;
    cursor: pointer;
  }

  .menu-icon {
    font-size: 1.75rem;
    color: $color-neutral;
    user-select: none;
  }

  .links {
    /* remove default bullets and indent */
    list-style: none;
    margin: 0;
    padding: 0;

    position: absolute;
    top: 100%;
    right: 0;
    margin-top: -1px;
    background: $color-dark;
    border-radius: 0.5rem;
    padding: $sp-3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    min-width: 10rem;

    li + li {
      margin-top: $sp-2;
    }

    a,
    RouterLink {
      display: block;
      color: $color-neutral;
      font-weight: 500;
      text-decoration: none;
      padding: $sp-1 0;
      font-size: $fs-base;
      @include transition(color);

      &:hover {
        color: $color-primary;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
