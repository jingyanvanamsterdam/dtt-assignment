import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=> import("../views/AboutView.vue"),
  },
  {
    path: "/house-details/:id", 
    name: "house-details", 
    component: ()=> import("../views/HouseDetail.vue"),
  },
  {
    path: "/edit-my-house/:id", 
    name: "edit-page", 
    component: () => import ("../views/EditView.vue")
  },
  {
    path:"/create-new-listing",
    name: "create-new-listing", 
    component: ()=> import("../views/CreateView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
