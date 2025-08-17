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
@use "@/assets/styles/tokens" as t;

.btn {
  display: inline-block;
  padding: t.$space-2 t.$space-3;
  border-radius: 0.66rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
  transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
}
.btn--primary {
  background: linear-gradient(140deg, #b98a5e, #d9b793);
  color: #2b241c;
  border-color: rgba(0, 0, 0, 0.06);
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
  filter: brightness(1.03);
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
  padding: t.$space-2 (t.$space-4 + t.$space-2);
}

/* Responsiveness for stacked CTAs on tiny screens */
@media (max-width: 420px) {
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
