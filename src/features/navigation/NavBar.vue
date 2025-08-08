<template>
  <nav :class="['navbar', `navbar--${theme}`]">
    <div
      class="menu-wrapper"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <div class="menu-icon" aria-label="Open menu" role="button">☰</div>
      <transition name="fade">
        <div v-if="showMenu" class="dropdown">
          <RouterLink to="/">Home</RouterLink>
          <a href="https://discord.gg/YOURSERVER" target="_blank" rel="noopener"
            >Discord</a
          >
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
@use "@/assets/styles/mixins" as *;

$nav-h: 52px;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-h;
  padding: 0 $sp-2;
  display: flex;
  align-items: center;
  z-index: 9999;

  background: $color-neutral; /* default theme */
  box-shadow: none;
  border-bottom: none;

  .menu-icon {
    color: $color-dark;
  }
  .dropdown {
    background: $color-neutral;
    a,
    RouterLink {
      color: $color-dark;
    }
  }
}

/* menu hover bridge to remove hitching */
.menu-wrapper {
  position: relative;
  margin-left: $sp-2;
  padding: $sp-1 $sp-2;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: -$sp-1;
    width: calc(100% + #{$sp-2});
    height: $sp-3;
  }
}

.menu-icon {
  font-size: 1.5rem;
  user-select: none;
}

.dropdown {
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  border-radius: 0.5rem;
  padding: $sp-3;
  min-width: 12rem;
  white-space: nowrap;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);

  > * + * {
    margin-top: $sp-2;
  }

  a,
  RouterLink {
    display: block;
    font-size: $fs-base;
    font-weight: 600;
    text-decoration: none;
    padding: $sp-2 0;
    @include transition(color);

    &:hover {
      color: $color-primary;
    }
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
