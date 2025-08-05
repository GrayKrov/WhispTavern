<template>
  <component
    :is="routerLink ? 'router-link' : 'div'"
    :to="routerLink"
    class="community-card"
    :class="{ inactive: status !== 'active' }"
  >
    <div class="avatar-frame">
      <img :src="avatar" :alt="name" class="avatar" />
    </div>
    <div class="creator-info">
      <h3 class="creator-name">{{ name }}</h3>
    </div>
    <div class="status-tag" v-if="status !== 'active'">{{ status }}</div>
  </component>
</template>

<script>
export default {
  name: "CommunityCard",
  props: {
    name: String,
    avatar: String,
    routerLink: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "active", // or 'coming soon'
    },
  },
};
</script>

<style scoped lang="scss">
.community-card {
  background: #f5e8d8;
  border: 2px solid #8b5e3c;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &.inactive {
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(139, 94, 60, 0.6);
  }

  .avatar-frame {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #8b5e3c;
    margin-bottom: 1rem;

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .creator-info {
    text-align: center;

    .creator-name {
      font-family: "Cinzel", serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }

  .status-tag {
    background-color: #b3936f;
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 0.4rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-top: 0.5rem;
    text-align: center;
  }
}
</style>
