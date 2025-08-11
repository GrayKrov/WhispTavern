<template>
  <!-- Clickable when live/active and a route is present -->
  <RouterLink
    v-if="isActive && routerLink"
    :to="routerLink"
    class="community-card"
    :aria-label="`Open ${name}`"
  >
    <div class="avatar-frame">
      <img :src="avatarSrc" :alt="name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div v-if="!isActive" class="status-tag">{{ status }}</div>
  </RouterLink>

  <!-- Non-clickable when coming soon, etc. -->
  <div v-else class="community-card inactive">
    <div class="avatar-frame">
      <img :src="avatarSrc" :alt="name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div class="status-tag">{{ status }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  name: { type: String, required: true },
  avatarSrc: { type: String, required: true },
  routerLink: { type: String, default: null }, // e.g. "/krov"
  status: { type: String, default: "active" }, // e.g. "LIVE", "COMING-SOON"
});

/** Treat these as interactive */
const LIVE_STATUSES = ["active", "live", "published", "open"];

/** normalize and decide */
const statusNorm = computed(() =>
  String(props.status || "")
    .trim()
    .toLowerCase()
);
const isActive = computed(() => LIVE_STATUSES.includes(statusNorm.value));
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/vars" as *;

.community-card {
  display: block;
  position: relative;
  z-index: 10; /* keep above any decorative layers */
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  background: linear-gradient(
        color.adjust($color-neutral, $lightness: 2%),
        color.adjust($color-neutral, $lightness: 2%)
      )
      padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.35), rgba(180, 150, 120, 0.35))
      border-box;
  border: 1px solid transparent;
  border-radius: 1rem;
  padding: $sp-3;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.2);
  }

  &.inactive {
    cursor: default;
    pointer-events: none; /* <- only applied on the non-clickable branch */
    opacity: 0.9;
  }

  .avatar-frame {
    width: 140px;
    height: 140px;
    margin: 0 auto $sp-3;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 5px color.adjust($color-secondary, $lightness: 6%) inset,
      0 4px 14px rgba(0, 0, 0, 0.12);

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* glossy sweep */
    &::after {
      content: "";
      position: absolute;
      inset: -20%;
      background: linear-gradient(
        60deg,
        transparent 40%,
        rgba(255, 255, 255, 0.9) 50%,
        transparent 60%
      );
      transform: translateX(-120%);
      transition: transform 600ms ease;
      mix-blend-mode: screen;
      pointer-events: none;
    }
  }
  &:hover .avatar-frame::after {
    transform: translateX(120%);
  }

  .creator-info {
    text-align: center;
  }
  .creator-name {
    font-size: $fs-lg;
    font-family: "Cinzel", serif;
    letter-spacing: 0.02em;
    margin-bottom: $sp-1;
  }

  .status-tag {
    display: inline-block;
    background: $color-secondary;
    color: $color-neutral;
    padding: $sp-1 $sp-2;
    border-radius: 0.4rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-top: $sp-1;
  }
}
</style>
