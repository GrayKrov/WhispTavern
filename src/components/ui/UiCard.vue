<template>
  <component
    :is="isLink ? (to ? RouterLink : 'a') : 'div'"
    class="ui-card"
    :class="[`pad--${pad}`]"
    v-bind="linkProps"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  pad: { type: String, default: "md" }, // md | lg
});

const isLink = computed(() => !!(props.to || props.href));
const linkProps = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href)
    return { href: props.href, target: "_blank", rel: "noopener" };
  return {};
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/tokens" as t;

.ui-card {
  @include t.parchment(2%);
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &.pad--md {
    padding: t.$space-3;
  }
  &.pad--lg {
    padding: t.$space-4;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: t.$shadow-lift;
  }
  &:focus-visible {
    @include t.focus-ring();
  }
}
</style>
