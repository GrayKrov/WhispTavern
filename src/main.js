import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/styles/main.scss"; // this file should import your vars/mixins/functions

createApp(App).use(router).mount("#app");
