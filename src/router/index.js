import { STORAGE_KEY } from "@/constants";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

export const RouteEnum = Object.freeze({
  LOGIN: { path: "/login", name: "Login" },
  HOME: { path: "/", name: "Home" },
});

const routes = [
  {
    ...RouteEnum.HOME,
    component: Home,
    beforeEnter(to, from, next) {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && accessToken !== "undefined") {
        next();
      } else {
        next(RouteEnum.LOGIN);
      }
    },
  },
  {
    ...RouteEnum.LOGIN,
    component: Login,
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
