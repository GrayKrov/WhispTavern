<template>
  <button
    v-show="visible"
    @click="scrollTop"
    class="back-to-top"
    aria-label="Back to top"
  >
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

function handleScroll() {
  visible.value = window.scrollY > 300;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: $sp-3;
  right: $sp-3;
  padding: $sp-2;
  border: none;
  border-radius: 50%;
  background: $color-primary;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  @include transition(all);

  &:hover {
    opacity: 0.8;
  }
}
</style>
