<template>
  <!-- Loading / Skeleton -->
  <article
    v-if="loading"
    class="krov-card is-loading"
    aria-busy="true"
    aria-label="Loading project"
  >
    <div class="sk-line sk-title"></div>
    <div class="sk-line sk-sub"></div>
    <div class="sk-line sk-sub short"></div>
    <div class="sk-tags">
      <span class="sk-pill"></span>
      <span class="sk-pill"></span>
      <span class="sk-pill"></span>
    </div>
    <div class="sk-meta">
      <span class="sk-dot"></span>
      <span class="sk-dot"></span>
      <span class="sk-dot"></span>
    </div>
  </article>

  <!-- Real Card -->
  <a
    v-else
    class="krov-card"
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Open ${safeName} on GitHub`"
  >
    <header class="head">
      <h3 class="title">{{ safeName }}</h3>
      <span v-if="repo.private" class="badge">Private</span>
    </header>

    <p v-if="safeDesc" class="desc">{{ safeDesc }}</p>

    <ul v-if="pills.length" class="pills" aria-label="Technologies">
      <li v-for="t in pills" :key="t">{{ t }}</li>
    </ul>

    <div class="meta" aria-label="Repository stats">
      <span v-if="repo.stargazers_count != null" class="m"
        >★ {{ repo.stargazers_count }}</span
      >
      <span v-if="repo.forks_count != null" class="m"
        >⑂ {{ repo.forks_count }}</span
      >
      <span v-if="repo.updated_at" class="m dim"
        >Updated {{ formattedUpdated }}</span
      >
    </div>
  </a>
</template>

<script setup>
import { computed } from "vue";

/* eslint-disable-next-line no-undef */
const props = defineProps({
  repo: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
});

const safeName = computed(() => props.repo?.name ?? "Untitled");
const safeDesc = computed(() => props.repo?.description ?? "");

const pills = computed(() => {
  const topics = Array.isArray(props.repo?.topics) ? props.repo.topics : [];
  if (topics.length) return topics.slice(0, 5);
  const lang = props.repo?.language;
  return lang ? [lang] : [];
});

const formattedUpdated = computed(() => {
  if (!props.repo?.updated_at) return "";
  const d = new Date(props.repo.updated_at);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vars" as *;

/* ====== Card Shell ====== */
.krov-card {
  display: block;
  text-decoration: none;
  border-radius: 14px;
  padding: $sp-3;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(180deg, #fcfcfc, #f7f7f7);
  color: #111;

  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35) inset,
    0 6px 16px rgba(0, 0, 0, 0.06);

  transition: transform 160ms ease, border-color 160ms ease,
    box-shadow 160ms ease, background 160ms ease;

  &:hover,
  &:focus-visible {
    will-change: transform;
    outline: none;
    transform: translateY(-2px);
    border-color: rgba(0, 0, 0, 0.16);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6) inset,
      0 12px 28px rgba(0, 0, 0, 0.12);
    background: linear-gradient(180deg, #fdfdfd, #f6f6f6);
  }
}

/* ====== Header ====== */
.head {
  display: flex;
  align-items: center;
  gap: $sp-2;
  margin-bottom: $sp-1;

  .title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.005em;
    color: #111;
  }

  .badge {
    margin-left: auto;
    font-size: 0.725rem;
    letter-spacing: 0.04em;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.18);
    background: rgba(0, 0, 0, 0.06);
    color: #222;
  }
}

/* ====== Body ====== */
.desc {
  margin: 0 0 $sp-2 0;
  color: #3b3b3b;
  line-height: 1.5;
  font-size: 0.98rem;
}

/* Pills (topics / language) */
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-1;
  margin: 0 0 $sp-2 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 0.8rem;
    padding: 0.25rem 0.55rem;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    background: linear-gradient(180deg, #f9f9f9, #f1f1f1);
    color: #222;
    letter-spacing: 0.01em;
  }
}

/* Meta row */
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-2;
  align-items: center;
  color: #2a2a2a;

  .m {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.01em;

    &.dim {
      font-weight: 600;
      color: #606060;
    }
  }
}

/* ====== Skeleton State ====== */
.is-loading {
  position: relative;
  overflow: hidden;
  background: #f7f7f7;
}

.sk-line {
  height: 0.9rem;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.08),
    rgba(0, 0, 0, 0.14),
    rgba(0, 0, 0, 0.08)
  );
  background-size: 220% 100%;
  animation: shimmer 1400ms ease-in-out infinite;

  & + & {
    margin-top: 0.55rem;
  }
}

.sk-title {
  width: 62%;
  height: 1.05rem;
  margin-bottom: 0.35rem;
}
.sk-sub {
  width: 92%;
}
.sk-sub.short {
  width: 70%;
}

.sk-tags {
  display: flex;
  gap: $sp-1;
  margin-top: $sp-2;
  .sk-pill {
    width: 64px;
    height: 22px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.14),
      rgba(0, 0, 0, 0.08)
    );
    background-size: 220% 100%;
    animation: shimmer 1400ms ease-in-out infinite;
  }
}

.sk-meta {
  display: flex;
  gap: $sp-2;
  margin-top: $sp-2;
  .sk-dot {
    width: 80px;
    height: 0.8rem;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.14),
      rgba(0, 0, 0, 0.08)
    );
    background-size: 220% 100%;
    animation: shimmer 1400ms ease-in-out infinite;
  }
}

@keyframes shimmer {
  0% {
    background-position: -120% 0;
  }
  100% {
    background-position: 120% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-loading .sk-line,
  .is-loading .sk-pill,
  .is-loading .sk-dot {
    animation: none;
    background: rgba(0, 0, 0, 0.12);
  }
}

/* ====== Compact on small screens ====== */
@media (max-width: 640px) {
  .krov-card {
    padding: $sp-2;
    border-radius: 12px;
  }
  .desc {
    font-size: 0.95rem;
  }
  .meta .m {
    font-size: 0.82rem;
  }
}
</style>
