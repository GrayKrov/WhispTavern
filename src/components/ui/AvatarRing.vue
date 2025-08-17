<template>
  <div class="avatar" :style="styleVars">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  size: { type: Number, default: 96 },
  ring: { type: String, default: "#b98a5e" },
});
const styleVars = { "--size": `${props.size}px`, "--ring": props.ring };
</script>

<style scoped lang="scss">
.avatar {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 6px var(--ring) inset, 0 8px 20px rgba(0, 0, 0, 0.16);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
