import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
Vue.use(Router);
const routes: RouteConfig[] = [
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "*",
    redirect: "/index"
  }
];
const router: Router = new Router({ routes });
export default router;
