<template>
  <footer :class="['app-footer', `app-footer--${theme}`]">
    <div class="app-footer__inner">
      <p>© 2025 WhispTavern. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AppFooter",
  setup() {
    const route = useRoute();
    const theme = computed(() => route.meta.creator || "default");
    return { theme };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

.app-footer {
  text-align: center;
  padding: $sp-3;
  font-size: $fs-base;
  font-family: "Georgia", serif;

  /* parchment top fade */
  background: linear-gradient(0deg, rgba(120, 93, 68, 0.12), transparent 60%) 0
      0/100% 100% no-repeat,
    $color-dark;
  color: $color-neutral;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.08);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.app-footer--krov {
  background: #f7f7f7;
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .app-footer {
    font-size: 0.9rem;
    padding: $sp-2;
  }
}
@media (max-width: 480px) {
  .app-footer {
    font-size: 0.85rem;
    padding: $sp-1;
  }
}
</style>
