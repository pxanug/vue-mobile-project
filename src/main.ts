import "amfe-flexible";
import Component from "vue-class-component";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
//引入mock接口的文件
import "@/common/productList";
Vue.use(ElementUI);
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
