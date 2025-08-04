<template>
  <nav :class="['navbar', { 'creator-style': isCreatorPage }]">
    <div
      class="menu-wrapper"
      @mouseover="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <div class="menu-icon">☰</div>
      <transition name="fade">
        <div v-if="showMenu" class="dropdown">
          <router-link to="/">Home</router-link>
          <a href="https://discord.gg/YOURSERVER" target="_blank">Discord</a>
          <router-link to="/community">Community Creators</router-link>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarComponent",
  props: {
    isCreatorPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style scoped lang="scss">
.navbar {
  font-family: "Inter", sans-serif;
  padding: 1rem;
  background-color: transparent;
}

.creator-style {
  background-color: #1f1c1a;
  color: #f5f1ea;
}

.menu-wrapper {
  display: inline-block;
  position: relative;
  padding: 0.5rem 1rem;
}

.menu-icon {
  font-size: 1.25rem;
  cursor: pointer;
  user-select: none;
}

.dropdown {
  position: absolute;
  top: 2.2rem;
  left: 0;
  background-color: #f5f1ea;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  white-space: nowrap;
}

.dropdown a,
.dropdown router-link {
  color: #2e2b28;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  margin: 0.4rem 0;
  transition: color 0.2s ease-in-out;
}

.dropdown a:hover,
.dropdown router-link:hover {
  color: #6b4e35;
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
