// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/Home.vue";
import CommunityPage from "@/pages/Community.vue";
import CreatorKrovPage from "@/pages/creator/CreatorKrov.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/community",
    name: "CommunityPage",
    component: CommunityPage,
  },
  {
    path: "/krov",
    name: "CreatorKrovPage",
    component: CreatorKrovPage,
    meta: { creator: "krov" },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
