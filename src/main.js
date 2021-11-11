import { createApp } from "vue";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
// C:\Users\Desarrollo\Desktop\isbc\isbc\node_modules\bootstrap\dist\css\bootstrap.min.css
import { createRouter, createWebHashHistory } from "vue-router";

import Principlal from "./components/principal.vue";
import Search from "./components/search.vue";

import App from "./App.vue";
// routes
const routes = [
  { path: "/", component: Principlal },
  { path: "/search/:id", component: Search },
  { path: "/search", component: Search },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
