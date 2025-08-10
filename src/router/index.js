import { createRouter, createWebHistory } from "vue-router";

// Use Vue CLI's BASE_URL when available
const base = process.env.BASE_URL || "/";

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: "/",
      name: "HomePage", // keep your existing names if they differ
      component: () =>
        import(/* webpackChunkName: "home" */ "@/pages/Home.vue"),
    },
    {
      path: "/community",
      name: "CommunityPage",
      component: () =>
        import(/* webpackChunkName: "community" */ "@/pages/Community.vue"),
    },
    {
      path: "/krov",
      name: "CreatorKrovPage",
      // If your file lives at "@/pages/creator/CreatorKrov.vue", keep this line.
      // If it's somewhere else (e.g. "@/features/creators/krov/CreatorKrov.vue"),
      // change the path below to match your actual file.
      component: () =>
        import(
          /* webpackChunkName: "creator-krov" */ "@/pages/creator/CreatorKrov.vue"
        ),
      // Keep any meta you already had here:
      meta: { creator: "krov" },
    },

    // If you’ve got other routes, repeat the same pattern:
    // { path: "/example", name: "Example", component: () => import("@/pages/Example.vue") },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

// Optional: simple per-route title (safe JS, no TS features)
// Add meta: { title: "Your Title" } to any route to customize.
router.afterEach((to) => {
  const title =
    (to && to.meta && to.meta.title && String(to.meta.title)) || "WhispTavern";
  if (typeof document !== "undefined") document.title = title;
});

export default router;
