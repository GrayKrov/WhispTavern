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
  max-width: t.$container-max;
  margin: t.$space-6 auto 0;
  padding: t.$space-4;
  background: linear-gradient(#fbf8f2, #f7efe6) padding-box;
  border: 1px solid rgba(120, 93, 68, 0.22);
  border-radius: t.$radius-lg;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.14);
}
h2 {
  margin: 0 0 t.$space-3;
  letter-spacing: 0.02em;
  color: #3b2f25;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: t.$space-3;
}
.item {
  padding: t.$space-3;
  border-radius: t.$radius-md;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.date {
  display: inline-block;
  opacity: 0.75;
  margin-bottom: 0.25rem;
}
.title {
  margin: 0.1rem 0 0.25rem;
  font-size: 1.08rem;
}
.body {
  margin: 0;
  line-height: 1.7;
}

@media (max-width: 560px) {
  .announcements {
    padding: t.$space-3;
  }
  .item {
    padding: t.$space-2;
  }
}
@media (max-width: 360px) {
  h2 {
    font-size: 1.05rem;
  }
  .title {
    font-size: 1rem;
  }
}
</style>
