<!-- src/pages/creator/CreatorPlaceholder.vue -->
<template>
  <div class="placeholder-page">
    <!-- HERO -->
    <section class="hero" :style="bannerVars">
      <div class="hero__overlay">
        <h1 class="hero__title">
          {{ creator?.name || "Creator" }}
          <span class="chip">{{ statusLabel }}</span>
        </h1>
        <p class="hero__sub">
          This page is being handcrafted. Check back soon!
        </p>

        <div class="hero__ctas">
          <LinkButton variant="ghost" :to="'/community'">
            Back to Community
          </LinkButton>
          <LinkButton
            variant="primary"
            href="https://discord.com/invite/JfMh3P57zh"
            target="_blank"
            rel="noopener"
          >
            Join the Discord
          </LinkButton>
        </div>
      </div>
    </section>

    <!-- HEADER: avatar + blurb -->
    <header class="header">
      <div class="avatar-ring">
        <!-- Single <img> for simplicity; resolver prefers webp/avif -->
        <img
          :src="avatarSrc"
          :alt="creator?.name || 'Creator avatar placeholder'"
        />
      </div>

      <p class="blurb" v-if="creator?.blurb">
        {{ creator.blurb }}
      </p>
      <p class="blurb" v-else>
        We’re putting together a custom space with links, highlights, and
        events. In the meantime, hop into Discord to say hi and see what we’re
        building.
      </p>
    </header>

    <!-- COMING SECTION -->
    <section class="coming">
      <h2>What to expect</h2>
      <ul>
        <li>Custom banner & avatar</li>
        <li>Quick links to streams, socials, and projects</li>
        <li>Recent highlights and upcoming events</li>
      </ul>

      <div class="quick-links" v-if="creator?.links?.length">
        <h3>Quick Links</h3>
        <ul>
          <li v-for="(link, i) in creator.links" :key="i">
            <a
              :href="link.url"
              rel="noopener"
              target="_blank"
              aria-disabled="true"
              tabindex="-1"
            >
              {{ link.title || link.url }}
            </a>
            <span class="badge">coming soon</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import creators from "@/content/creators.json";
import LinkButton from "@/components/ui/LinkButton.vue";

/* ✅ Prefer modern placeholder (keeps code simple) */
import placeholder from "@/assets/avatars/Placeholder.webp";

/* Default banner (already optimized via image-set in CSS) */
import bannerJpg from "@/assets/images/BannerTop.jpg";
import bannerWebp from "@/assets/images/BannerTop.webp";
import bannerAvif from "@/assets/images/BannerTop.avif";

/* Optional per-creator banners */
let bannersCtx;
try {
  bannersCtx = require.context(
    "@/assets/banners",
    false,
    /\.(png|jpe?g|webp|avif)$/i
  );
} catch {
  bannersCtx = null;
}
function fromBanners(file) {
  if (!file || !bannersCtx) return null;
  try {
    return bannersCtx("./" + file);
  } catch {
    return null;
  }
}

/* Avatars — prefer webp/avif, then png/jpg, else placeholder */
const avatarsCtx = require.context(
  "@/assets/avatars",
  false,
  /\.(png|jpe?g|webp|avif)$/i
);
function fromAvatars(file) {
  if (!file) return null;
  try {
    return avatarsCtx("./" + file);
  } catch {
    return null;
  }
}
function resolveAvatar(entry) {
  const val = entry?.avatar && String(entry.avatar).trim();
  if (!val) return placeholder;
  const exact = fromAvatars(val);
  if (exact) return exact;
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

/* Banner resolver mirrors Home/Community style */
function resolveBanner(entry) {
  const val = entry?.banner && String(entry.banner).trim();
  if (!val) {
    return { jpg: bannerJpg, webp: bannerWebp, avif: bannerAvif };
  }
  const exact = fromBanners(val);
  if (exact) return { jpg: exact, webp: exact, avif: exact };
  const stem = val.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  const webp = fromBanners(stem + ".webp");
  const avif = fromBanners(stem + ".avif");
  const png = fromBanners(stem + ".png");
  const jpg = fromBanners(stem + ".jpg") || fromBanners(stem + ".jpeg");
  return {
    avif: avif || bannerAvif,
    webp: webp || bannerWebp,
    jpg: jpg || png || bannerJpg,
  };
}

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug || ""));
const creator = computed(() =>
  creators.find(
    (c) => String(c.slug || "").toLowerCase() === slug.value.toLowerCase()
  )
);

onMounted(() => {
  if (!creator.value) {
    router.replace("/community");
  } else {
    document.title = `${creator.value.name} – WhispTavern`;
  }
});

const statusNorm = computed(() =>
  String(creator.value?.status || "COMING-SOON")
    .trim()
    .toLowerCase()
);
const statusLabel = computed(() =>
  statusNorm.value === "live" || statusNorm.value === "active"
    ? "LIVE"
    : "COMING SOON"
);

const avatarSrc = computed(() => resolveAvatar(creator.value));
const banner = computed(() => resolveBanner(creator.value));
const bannerVars = computed(() => ({
  "--banner-jpg": `url(${banner.value.jpg})`,
  "--banner-webp": `url(${banner.value.webp})`,
  "--banner-avif": `url(${banner.value.avif})`,
}));
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars" as *;
@use "sass:color";

.placeholder-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: ($sp-4 + $sp-2) $sp-3 $sp-4;
}

/* HERO (small-image safe) */
.hero {
  position: relative;
  width: 100%;
  height: clamp(160px, 26vw, 260px);
  margin: 0 auto ($sp-4 + $sp-2);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.16);
  background: #f5f1ea;
}
.hero::before {
  content: "";
  position: absolute;
  inset: -8%;
  background-image: var(--banner-jpg);
  background-image: image-set(
    var(--banner-avif) type("image/avif"),
    var(--banner-webp) type("image/webp"),
    var(--banner-jpg) type("image/jpeg")
  );
  background-size: cover;
  background-position: center;
  filter: blur(16px) saturate(0.95) brightness(0.95);
  transform: scale(1.06);
}
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--banner-jpg);
  background-image: image-set(
    var(--banner-avif) type("image/avif"),
    var(--banner-webp) type("image/webp"),
    var(--banner-jpg) type("image/jpeg")
  );
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-content: center;
  text-align: center;
  padding: 0 $sp-3;
  background: linear-gradient(
    180deg,
    rgba(50, 35, 24, 0.28),
    rgba(50, 35, 24, 0.48)
  );
}
.hero__title {
  margin: 0 0 $sp-1;
  color: $color-neutral;
  font-size: clamp(1.4rem, 2vw, 1.9rem);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);

  .chip {
    display: inline-block;
    margin-left: $sp-2;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: #2b241c;
    background: #eed7bd;
    border: 1px solid rgba(0, 0, 0, 0.08);
    vertical-align: middle;
  }
}
.hero__sub {
  color: rgba(255, 255, 255, 0.92);
  margin: 0 auto $sp-2;
  max-width: 760px;
  font-size: clamp(0.95rem, 1.2vw, 1.06rem);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.hero__ctas {
  display: inline-flex;
  gap: $sp-2;
  flex-wrap: wrap;
  justify-content: center;
}

/* HEADER block */
.header {
  text-align: center;
  background: linear-gradient(#f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.28);
  border-radius: 1rem;
  padding: $sp-4 $sp-3;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
  margin-bottom: $sp-4;
}

.avatar-ring {
  width: 160px;
  height: 160px;
  border-radius: 999px;
  margin: 0 auto $sp-2;
  background: #f5efe6;
  box-shadow: 0 0 0 6px rgba(120, 93, 68, 0.25) inset,
    0 6px 18px rgba(0, 0, 0, 0.12);
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.blurb {
  margin: 0 auto $sp-1;
  max-width: 720px;
  color: #4a3f33;
  line-height: 1.7;
}

/* COMING section */
.coming {
  background: linear-gradient(#f9f5ee, #f7f1e8);
  border: 1px solid rgba(120, 93, 68, 0.28);
  border-radius: 1rem;
  padding: $sp-3;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);

  h2 {
    margin: 0 0 $sp-2;
  }

  ul {
    margin: 0 0 $sp-3 1.1rem;
    line-height: 1.8;
  }

  .quick-links ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      gap: $sp-2;
      padding: $sp-1 0;
    }

    a {
      pointer-events: none; /* visually present, not active */
      color: #6b5a49;
      text-decoration: none;
    }

    .badge {
      padding: 0.2rem 0.5rem;
      border-radius: 0.4rem;
      font-size: 0.7rem;
      background: rgba(0, 0, 0, 0.08);
      color: #2b241c;
    }
  }
}

/* 📱 mobile: prevent overlay text from clipping the banner */
@media (max-width: 520px) {
  .hero {
    height: 190px;
  }
  .hero__sub {
    display: none;
  }
}
</style>
