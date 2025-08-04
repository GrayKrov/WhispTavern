import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Community from "@/pages/Community.vue";
import Creator from "@/pages/Creator.vue";
import Krov from "@/pages/Krov.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/community", name: "Community", component: Community },
  { path: "/creator", name: "Creator", component: Creator },
  { path: "/krov", name: "Krov", component: Krov },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
