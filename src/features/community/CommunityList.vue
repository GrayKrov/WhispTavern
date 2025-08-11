<template>
  <div class="grid" role="list">
    <CommunityCard
      v-for="c in cards"
      :key="c.slug || c.name"
      role="listitem"
      :name="c.name"
      :avatar-src="c.avatarSrc"
      :router-link="c.slug ? '/' + c.slug : null"
      :status="c.status || 'COMING-SOON'"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import CommunityCard from "./CommunityCard.vue";
import creators from "@/content/creators.json";

/** import a hard fallback */
import placeholder from "@/assets/avatars/Placeholder.png";

/** load avatars that physically exist in /assets/avatars */
const ctx = require.context(
  "@/assets/avatars",
  false,
  /\.(png|jpe?g|webp|avif)$/i
);

function fromAvatars(file) {
  if (!file) return null;
  try {
    return ctx("./" + file);
  } catch {
    return null;
  }
}

/** robust resolution:
 *  - use exact filename in JSON if present
 *  - try common extensions if JSON gave a bare stem
 *  - otherwise use placeholder
 */
function resolveAvatar(entry) {
  const val = entry.avatar && String(entry.avatar).trim();
  if (!val) return placeholder;

  // exact match
  const exact = fromAvatars(val);
  if (exact) return exact;

  // try stem + common extensions
  const stem = val.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  return (
    fromAvatars(stem + ".webp") ||
    fromAvatars(stem + ".avif") ||
    fromAvatars(stem + ".png") ||
    fromAvatars(stem + ".jpg") ||
    fromAvatars(stem + ".jpeg") ||
    placeholder
  );
}

export default defineComponent({
  name: "CommunityList",
  components: { CommunityCard },
  setup() {
    const cards = computed(() =>
      creators.map((c) => ({
        ...c,
        avatarSrc: resolveAvatar(c),
      }))
    );
    return { cards };
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $sp-3;
}
</style>
