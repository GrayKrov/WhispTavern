<template>
  <article class="proj" :class="{ loading }">
    <header class="head">
      <a
        v-if="!loading"
        :href="repo.html_url"
        target="_blank"
        rel="noopener"
        class="name"
      >
        {{ repo.name }}
      </a>
      <p v-if="!loading && repo.description" class="desc">
        {{ repo.description }}
      </p>
    </header>

    <ul class="meta" v-if="!loading" aria-label="Repository stats">
      <li><span aria-hidden="true">★</span> {{ repo.stargazers_count }}</li>
      <li><span aria-hidden="true">⑂</span> {{ repo.forks_count }}</li>
      <li v-if="repo.language">{{ repo.language }}</li>
    </ul>

    <ul v-if="!loading && repo.topics?.length" class="topics">
      <li v-for="t in repo.topics" :key="t">{{ t }}</li>
    </ul>

    <!-- skeleton -->
    <div v-if="loading" class="skeleton">
      <div class="bar w60"></div>
      <div class="bar w90"></div>
      <div class="bar w40"></div>
    </div>
  </article>
</template>

<script setup>
/* eslint-disable no-undef */ // <-- Add this to suppress the defineProps rule
defineProps({
  repo: { type: Object, required: true },
  loading: { type: Boolean, default: false },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;

.proj {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: $sp-3;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #cfcfcf;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.1);
  }

  .head .name {
    font-weight: 700;
    color: #222;
    text-decoration: none;
    letter-spacing: 0.01em;
  }
  .head .desc {
    margin-top: $sp-1;
    color: #444;
  }

  .meta,
  .topics {
    display: flex;
    gap: $sp-2;
    flex-wrap: wrap;
    margin-top: $sp-2;
    padding: 0;
    list-style: none;
  }

  .meta li {
    font-size: 0.9rem;
    padding: $sp-1 $sp-2;
    border: 1px solid #e1e1e1;
    border-radius: 999px;
    background: #fafafa;
  }

  .topics li {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: #efefef;
    border: 1px solid #e3e3e3;
    letter-spacing: 0.02em;
    text-transform: lowercase;
  }

  /* skeleton loading */
  &.loading {
    .skeleton {
      display: grid;
      gap: 0.5rem;
    }
    .bar {
      height: 10px;
      border-radius: 6px;
      background: linear-gradient(90deg, #ececec, #f6f6f6, #ececec);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite linear;
    }
    .w60 {
      width: 60%;
    }
    .w90 {
      width: 90%;
    }
    .w40 {
      width: 40%;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
