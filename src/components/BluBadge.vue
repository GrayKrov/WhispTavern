<template>
  <div
    class="blu-badge"
    :style="styleVars"
    aria-label="Blu (WhispTavern mascot)"
  >
    <img
      class="blu-img"
      :src="bluBadge"
      alt="Blu, WhispTavern mascot"
      decoding="async"
    />
    <!-- soft light ring -->
    <span class="ring" aria-hidden="true"></span>
    <!-- inner highlight -->
    <span class="shine" aria-hidden="true"></span>
  </div>
</template>

<script setup>
import bluBadge from "@/assets/branding/blu/badge/blu-badge.webp";

const props = defineProps({
  size: { type: Number, default: 60 }, // px
});

const styleVars = {
  "--size": `${props.size}px`,
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.blu-badge {
  --size: 60px;
  position: relative;
  inline-size: var(--size);
  block-size: var(--size);
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  isolation: isolate; /* keep glows inside */
}

.blu-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: translateZ(0); /* crisper on some GPUs */
  filter: saturate(1.05) contrast(1.05);
}

/* outer ring with warm rim light so Blu pops on dark bars */
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55) inset,
    0 0 0 6px rgba(255, 215, 170, 0.28) inset, 0 6px 14px rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

/* subtle top-left specular to sell the glassy pin vibe */
.shine {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    140% 100% at 20% 10%,
    rgba(255, 255, 255, 0.3),
    transparent 50%
  );
  mix-blend-mode: screen;
  pointer-events: none;
}
</style>
