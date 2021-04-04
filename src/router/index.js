import Vue from "vue";
import VueRouter from "vue-router";
import Users from "@/views/UsersPage";
import News from "@/views/NewsPage";
import Page404 from "@/views/Page404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/",
    redirect: "users",
  },
  {
    path: "/404",
    name: "404",
    component: Page404,
  },
  {
    path: "*",
    redirect: "404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
