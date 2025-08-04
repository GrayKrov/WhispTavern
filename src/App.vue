<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import Navbar from "/src/components/NavBar.vue";
import AppFooter from "/src/components/AppFooter.vue";

export default {
  name: "AppLayout",
  components: {
    Navbar,
    AppFooter,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
