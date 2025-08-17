<template>
  <component
    :is="tag"
    :id="id"
    class="section-heading"
    :class="{ 'section-heading--center': align === 'center' }"
  >
    <CrestBadge
      v-if="lantern"
      :size="align === 'center' ? 44 : 38"
      class="crest-inline"
    />
    <slot>{{ title }}</slot>
  </component>
</template>

<script setup>
import CrestBadge from "@/components/art/CrestBadge.vue";

defineProps({
  id: { type: String, default: null },
  tag: { type: String, default: "h2" },
  title: { type: String, required: false },
  align: { type: String, default: "left" },
  /* keep prop name for compatibility, but render crest */
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
  display: flex;
  align-items: center;
  gap: $sp-2;
}
.section-heading--center {
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
.crest-inline {
  flex: 0 0 auto;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.12));
  margin-bottom: 0;
}
.section-heading--center .crest-inline {
  margin-bottom: $sp-1;
}
</style>
