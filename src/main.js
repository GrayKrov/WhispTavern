import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/styles/main.scss";

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");

  // Warm up Community on idle to improve perceived nav speed
  const prefetchCommunity = () =>
    import(/* webpackPrefetch: true */ "@/pages/Community.vue");

  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => prefetchCommunity());
  } else {
    setTimeout(() => prefetchCommunity(), 1200);
  }
});
