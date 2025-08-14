// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { updateHead } from "@/utils/meta";
import { isAuthed } from "@/utils/auth";

// pages
import Home from "@/pages/Home.vue";
import Community from "@/pages/Community.vue";
import CreatorKrov from "@/pages/creator/CreatorKrov.vue";
import CreatorPlaceholder from "@/pages/creator/CreatorPlaceholder.vue";
import NotFound from "@/pages/NotFound.vue";
import InternalLogin from "@/pages/internal/InternalLogin.vue"; // <-- updated path
import InternalIntake from "@/pages/internal/InternalIntake.vue"; // already multi-word

// data
import creators from "@/content/creators.json";

const BASE_TITLE = "WhispTavern";
const DEFAULT_DESC =
  "A cozy, creator-friendly community—games, stories, and custom creator spaces crafted with care.";
const OG_IMAGE = "/og-default.jpg";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "WhispTavern",
      description: DEFAULT_DESC,
      ogImage: OG_IMAGE,
    },
  },
  {
    path: "/community",
    name: "community",
    component: Community,
    meta: {
      title: "Community – WhispTavern",
      description:
        "Meet the creators, collaborators, and friends of the Tavern. Browse creator cards and say hello.",
      ogImage: OG_IMAGE,
    },
  },
  {
    path: "/krov",
    name: "krov",
    component: CreatorKrov,
    meta: {
      title: "Krov – WhispTavern",
      description:
        "Krov’s space—systematic minimalism, recent work, and projects from the WhispTavern community.",
      ogImage: OG_IMAGE,
      creator: "krov",
    },
  },

  // Internal tools: login + intake (guarded)
  {
    path: "/internal/login",
    name: "internal-login",
    component: InternalLogin,
    meta: {
      title: "Internal Login – WhispTavern",
      description: "Sign in to view the internal intake dashboard.",
      ogImage: OG_IMAGE,
      robots: "noindex, nofollow",
    },
  },
  {
    path: "/internal/intake",
    name: "internal-intake",
    component: InternalIntake,
    meta: {
      title: "Creator Intake – WhispTavern",
      description: "Overview of creator statuses, tags, and missing assets.",
      ogImage: OG_IMAGE,
      robots: "noindex, nofollow",
    },
    beforeEnter: (to) => {
      if (!isAuthed()) {
        return {
          path: "/internal/login",
          query: { redirect: to.fullPath },
        };
      }
      return true;
    },
  },

  // Dynamic creator placeholder
  {
    path: "/:slug",
    name: "creator-placeholder",
    component: CreatorPlaceholder,
    meta: {
      title: "Creator – WhispTavern",
      description:
        "Creator page coming soon—pull up a chair while we get the space ready.",
      ogImage: OG_IMAGE,
    },
    beforeEnter: (to) => {
      const slug = String(to.params.slug || "").toLowerCase();
      const exists = creators.some(
        (c) => String(c.slug || "").toLowerCase() === slug
      );
      if (!exists) return { path: "/community" };
      if (slug === "krov") return { path: "/krov" };
      return true;
    },
  },

  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      title: "Not Found – WhispTavern",
      description: "You took a wrong turn past the mossy signpost.",
      ogImage: OG_IMAGE,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// meta + analytics on nav
router.afterEach((to) => {
  const meta = to.meta || {};
  const title = meta.title || BASE_TITLE;
  const description = meta.description || DEFAULT_DESC;
  const image = meta.ogImage || OG_IMAGE;
  const url = window.location.origin + to.fullPath;

  // Apply robots override if provided
  updateHead({ title, description, image, url, robots: meta.robots });

  // Optional: Plausible pageview (safe if absent)
  if (window.plausible) {
    window.plausible("pageview", { u: url });
  }
});

export default router;
