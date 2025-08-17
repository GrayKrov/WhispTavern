<!-- src/components/CrestBadge.vue -->
<template>
  <span class="crest" :style="sizeVars" aria-hidden="true">
    <svg viewBox="0 0 64 64" class="crest__svg" role="img">
      <defs>
        <radialGradient id="gold" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#f6d3a1" />
          <stop offset="60%" stop-color="#c69562" />
          <stop offset="100%" stop-color="#7b5536" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#gold)" />
      <!-- raven/wing mark -->
      <path
        d="M18 32c8-8 20-11 28-9-6 1-10 4-11 7 5-2 8-1 12 2-8 0-12 3-14 6-4-6-11-6-15-6z"
        fill="rgba(0,0,0,.78)"
      />
    </svg>
  </span>
</template>

<script setup>
const props = defineProps({
  size: { type: Number, default: 32 },
});
const sizeVars = { "--s": `${props.size}px` };
</script>

<style scoped>
.crest {
  display: inline-grid;
  place-items: center;
  width: var(--s);
  height: var(--s);
  border-radius: 50%;
  background: radial-gradient(
    70% 70% at 30% 28%,
    rgba(255, 255, 255, 0.7),
    transparent 60%
  );
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -8px 18px rgba(0, 0, 0, 0.25);
}
.crest__svg {
  width: 80%;
  height: 80%;
  display: block;
}
</style>
