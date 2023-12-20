import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: ()=> import("./views/AboutView.vue"),
  },
  {
    path: "/house-details/:id", 
    name: "house-details", 
    component: ()=> import("./views/HouseDetail.vue"),
  },
  {
    path: "/edit-my-house/:id", 
    name: "edit-page", 
    component: () => import ("./views/EditView.vue")
  },
  {
    path:"/create-new-listing",
    name: "create-new-listing", 
    component: ()=> import("./views/CreateView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {top: 0}
  }
});

export default router;
