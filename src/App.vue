<template>
  <div id="app" class="layout">
    <NavBar :isCreatorPage="isCreatorPage" />
    <router-view />
    <AppFooter v-if="!isCreatorPage" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "AppRoot",
  components: {
    NavBar,
    AppFooter,
  },
  computed: {
    isCreatorPage() {
      return (
        this.$route.path.startsWith("/creator") || this.$route.name === "Krov"
      );
    },
  },
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f1ea;
}

router-view {
  flex: 1;
}
</style>
