<!-- src/components/AnnouncementsList.vue -->
<template>
  <section class="announcements" aria-labelledby="ann-title">
    <h2 id="ann-title">Announcements</h2>
    <ul class="list">
      <li v-for="a in latest" :key="a.date + a.title" class="item">
        <time class="date" :datetime="a.date">{{ format(a.date) }}</time>
        <h3 class="title">{{ a.title }}</h3>
        <p class="body">{{ a.body }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue";
import announcements from "@/content/announcements.json";

const latest = computed(() =>
  [...announcements].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)
);

function format(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/tokens" as t;

.announcements {
  width: 100%;
  max-width: 900px; /* match About section width */
  margin: t.$space-4 auto 0;
  padding: t.$space-3;
  @include t.parchment(2%);
  @include t.noise(0.015, 0.008);

  > h2 {
    @include t.lantern(66%);
    margin: 0 0 t.$space-2;
    letter-spacing: 0.02em;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: t.$space-2;
  }

  .item {
    padding: t.$space-2;
    border-radius: t.$radius-md;
    background: rgba(255, 255, 255, 0.72);
  }

  .date {
    display: inline-block;
    opacity: 0.75;
    margin-bottom: 0.25rem;
  }
  .title {
    margin: 0 0 0.25rem;
    font-size: 1.05rem;
  }
  .body {
    margin: 0;
    line-height: 1.7;
  }
}
</style>
