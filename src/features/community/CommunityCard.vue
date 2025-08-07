<template>
  <RouterLink
    v-if="props.routerLink"
    :to="props.routerLink"
    class="community-card"
    :class="{ inactive: props.status !== 'active' }"
  >
    <div class="avatar-frame">
      <img :src="props.avatarSrc" :alt="props.name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ props.name }}</h3>
    </div>
    <div v-if="props.status !== 'active'" class="status-tag">
      {{ props.status }}
    </div>
  </RouterLink>
  <div
    v-else
    class="community-card"
    :class="{ inactive: props.status !== 'active' }"
  >
    <div class="avatar-frame">
      <img :src="props.avatarSrc" :alt="props.name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ props.name }}</h3>
    </div>
    <div v-if="props.status !== 'active'" class="status-tag">
      {{ props.status }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
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
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;

  &.inactive {
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
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
    margin-bottom: $sp-2;
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
