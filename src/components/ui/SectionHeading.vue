<template>
  <component
    :is="tag"
    :id="id"
    class="section-heading"
    :class="{ 'section-heading--center': align === 'center' }"
  >
    <span v-if="lantern" class="lantern" aria-hidden="true"></span>
    {{ title }}
  </component>
</template>

<script setup>
defineProps({
  id: { type: String, default: null },
  tag: { type: String, default: "h2" },
  title: { type: String, required: true },
  align: { type: String, default: "left" },
  lantern: { type: Boolean, default: false },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.section-heading {
  position: relative;
  margin: 0 0 $sp-2;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.section-heading--center {
  text-align: center;
}

.lantern {
  position: absolute;
  left: -$sp-2;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: radial-gradient(
    60% 120% at 50% 30%,
    rgba(255, 222, 160, 0.9),
    rgba(255, 200, 120, 0.45) 60%,
    transparent 75%
  );
  filter: blur(6px);
  pointer-events: none;
}
</style>
