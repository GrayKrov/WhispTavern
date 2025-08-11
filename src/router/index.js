import { createRouter, createWebHistory } from "vue-router";

// pages
import Home from "@/pages/Home.vue";
import Community from "@/pages/Community.vue";
import CreatorKrov from "@/pages/creator/CreatorKrov.vue";
import CreatorPlaceholder from "@/pages/creator/CreatorPlaceholder.vue";

// data
import creators from "@/content/creators.json";

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "WhispTavern" } },
  {
    path: "/community",
    name: "community",
    component: Community,
    meta: { title: "Community – WhispTavern" },
  },

  // bespoke creator page(s)
  {
    path: "/krov",
    name: "krov",
    component: CreatorKrov,
    // mark as a "creator" page so App.vue can choose special layout if desired
    meta: { title: "Krov – WhispTavern", creator: "krov" },
  },

  // dynamic placeholder for other creators (keep this LAST so it doesn't swallow other routes)
  {
    path: "/:slug",
    name: "creator-placeholder",
    component: CreatorPlaceholder,
    meta: { title: "Creator – WhispTavern" },
    beforeEnter: (to) => {
      const slug = String(to.params.slug || "").toLowerCase();
      // allow only slugs defined in creators.json
      const exists = creators.some(
        (c) => String(c.slug || "").toLowerCase() === slug
      );
      if (!exists) return { path: "/community" };
      // for krov we already have a bespoke page
      if (slug === "krov") return { path: "/krov" };
      return true;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// simple document.title support
router.afterEach((to) => {
  const title = (to.meta && to.meta.title) || "WhispTavern";
  if (title) document.title = title;
});

export default router;
