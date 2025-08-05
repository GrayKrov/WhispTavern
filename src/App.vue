<template>
  <div id="app">
    <Navbar :isCreatorPage="isCCPage" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="!isCCPage" :isTransparent="isCCPage" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Navbar from "@/components/NavBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "AppLayout",
  components: {
    Navbar,
    AppFooter,
  },
  setup() {
    const route = useRoute();

    const isCCPage = computed(() => /^\/(krov|cc-)/i.test(route.path));

    return {
      isCCPage,
    };
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
