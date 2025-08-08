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
@use "@/assets/styles/vars" as *;
@use "@/assets/styles/mixins" as *;

.community-card {
  background: $color-neutral;
  border: 2px solid $color-secondary;
  border-radius: 1rem;
  padding: $sp-3;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &.inactive {
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  }

  .avatar-frame {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid $color-secondary;
    margin-bottom: $sp-3;

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .creator-info .creator-name {
    font-size: $fs-lg;
    font-family: "Cinzel", serif;
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

@include respond(md) {
  .community-card {
    max-width: 300px;
  }
}
</style>
