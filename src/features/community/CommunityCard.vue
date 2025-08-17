<template>
  <!-- LIVE cards are links -->
  <RouterLink
    v-if="routerLink && isLive"
    :to="routerLink"
    class="community-card"
  >
    <div class="avatar-frame">
      <img
        :src="avatarSrc"
        :alt="name"
        class="avatar"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
  </RouterLink>

  <!-- Not live: static card with status tag -->
  <div v-else class="community-card">
    <div class="avatar-frame">
      <img
        :src="avatarSrc"
        :alt="name"
        class="avatar"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div class="status-tag">{{ statusLabel }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  avatarSrc: { type: String, required: true },
  routerLink: { type: String, default: null },
  status: { type: String, default: "coming-soon" }, // 'live' | 'coming-soon' | 'in-progress'
});
const statusNorm = computed(() =>
  (props.status || "").toString().trim().toLowerCase()
);
const isLive = computed(() => statusNorm.value === "live");
const statusLabel = computed(() => {
  if (statusNorm.value === "in-progress") return "IN PROGRESS";
  if (statusNorm.value === "coming-soon") return "COMING SOON";
  return "COMING SOON";
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/tokens" as t;

.community-card {
  background: linear-gradient(
        color.adjust(t.$c-parchment, $lightness: 2%),
        color.adjust(t.$c-parchment, $lightness: 2%)
      )
      padding-box,
    linear-gradient(140deg, rgba(120, 93, 68, 0.28), rgba(180, 150, 120, 0.28))
      border-box;
  border: 1px solid transparent;
  border-radius: t.$radius-lg;
  padding: t.$space-3;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 160ms ease, box-shadow 160ms ease;
  will-change: transform;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.16);
  }

  .avatar-frame {
    width: 140px;
    height: 140px;
    margin-bottom: t.$space-3;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 0 5px rgba(185, 138, 94, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.1);

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .creator-info .creator-name {
    font-size: t.$fs-lg;
    font-family: "Cinzel", serif;
    letter-spacing: 0.015em;
    margin-bottom: t.$space-1;
    text-align: center;
  }

  .status-tag {
    background: #d8c8bb;
    color: #2b241c;
    padding: t.$space-1 t.$space-2;
    border-radius: 0.4rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-top: t.$space-1;
    letter-spacing: 0.02em;
  }
}

/* Mobile tweaks */
@media (max-width: 600px) {
  .community-card {
    padding: t.$space-2;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }
  .community-card .avatar-frame {
    width: 112px;
    height: 112px;
    margin-bottom: t.$space-2;
    box-shadow: inset 0 0 0 4px rgba(185, 138, 94, 0.22),
      0 3px 8px rgba(0, 0, 0, 0.08);
  }
  .community-card .creator-info .creator-name {
    font-size: 1.02rem;
  }
}

@media (max-width: 420px) {
  .community-card .avatar-frame {
    width: 96px;
    height: 96px;
  }
  .community-card .creator-info .creator-name {
    font-size: 0.98rem;
  }
}
</style>
