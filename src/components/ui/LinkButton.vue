<template>
  <component
    :is="to ? RouterLink : 'a'"
    class="btn"
    :class="{
      'btn--primary': variant === 'primary',
      'btn--ghost': variant === 'ghost',
      'btn--wide': !!wide,
    }"
    v-bind="linkAttrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: "primary" },
  wide: { type: Boolean, default: false },
});

const linkAttrs = props.to
  ? { to: props.to }
  : { href: props.href, target: "_blank", rel: "noopener" };
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.btn {
  display: inline-block;
  padding: $sp-2 $sp-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;
  position: relative;
  overflow: hidden;
}
.btn::after {
  content: "";
  position: absolute;
  inset: 0 -30%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.45s ease;
  pointer-events: none;
}
.btn:hover::after {
  transform: translateX(100%);
}

.btn--primary {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
}
.btn--ghost:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
}

.btn--wide {
  padding: $sp-2 ($sp-4 + $sp-2);
}
</style>
