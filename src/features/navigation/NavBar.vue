<template>
  <nav :class="['navbar', `navbar--${theme}`]">
    <div
      class="menu-wrapper"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <div class="menu-icon">☰</div>
      <transition name="fade">
        <div v-if="showMenu" class="dropdown">
          <RouterLink to="/">Home</RouterLink>
          <a
            href="https://discord.gg/YOURSERVER"
            target="_blank"
            rel="noopener"
          >
            Discord
          </a>
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

/* Base navbar styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: $sp-1 $sp-2;
  display: flex;
  align-items: center;
  z-index: 9999;

  /* default colors */
  background: $color-neutral;
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

/* Krov page: light gray background, dark text */
.navbar--krov {
  background: #f7f7f7;

  .menu-icon {
    color: #1a1a1a;
  }
  .dropdown {
    background: #f7f7f7;
    a,
    RouterLink {
      color: #1a1a1a;
    }
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.menu-wrapper {
  position: relative;
  margin-left: $sp-2;
  padding: $sp-1 $sp-2;
  cursor: pointer;
}

.menu-icon {
  font-size: 1.5rem;
  user-select: none;
}

/* Roomier dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: -1px;
  border-radius: 0.5rem;
  padding: $sp-3;
  min-width: 12rem;
  white-space: nowrap;

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
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
