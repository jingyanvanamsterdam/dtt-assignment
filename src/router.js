import { createRouter, createWebHistory } from "vue-router";

import MainContainer from "./views/MainContainer"

const routes = [
  {
    path: "/",
    name: "main",
    component: MainContainer,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("./views/HomeView.vue"),
      },
      {
        path: "/house-details/:id",
        name: "house-details",
        component: () => import("./views/HouseDetail.vue"),
      },
      {
        path: "/edit-my-house/:id",
        name: "edit-page",
        component: () => import("./views/EditView.vue")
      },
      {
        path: "/create-new-listing",
        name: "create-new-listing",
        component: () => import("./views/CreateView.vue")
      },
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/AboutView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});

export default router;
