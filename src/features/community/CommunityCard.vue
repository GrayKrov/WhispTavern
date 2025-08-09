<template>
  <RouterLink
    v-if="routerLink"
    :to="routerLink"
    class="community-card"
    :class="{ inactive: status !== 'active' }"
  >
    <div class="avatar-frame">
      <img :src="avatarSrc" :alt="name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div v-if="status !== 'active'" class="status-tag">{{ status }}</div>
  </RouterLink>

  <div v-else class="community-card" :class="{ inactive: status !== 'active' }">
    <div class="avatar-frame">
      <img :src="avatarSrc" :alt="name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div v-if="status !== 'active'" class="status-tag">{{ status }}</div>
  </div>
</template>

<script setup>
/* global defineProps */
import { RouterLink } from "vue-router";
defineProps({
  name: { type: String, required: true },
  avatarSrc: { type: String, required: true },
  routerLink: { type: String, default: null },
  status: { type: String, default: "active" },
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/vars" as *;

.community-card {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 180ms ease, box-shadow 180ms ease;
  transform-origin: center;
  will-change: transform;
  perspective: 800px;

  &.inactive {
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01) rotateX(2deg);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.2);
  }

  .avatar-frame {
    width: 140px;
    height: 140px;
    margin-bottom: $sp-3;
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

    /* shiny sweep on hover */
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

  .creator-info .creator-name {
    font-size: $fs-lg;
    font-family: "Cinzel", serif;
    letter-spacing: 0.02em;
    margin-bottom: $sp-1;
  }

  .status-tag {
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
