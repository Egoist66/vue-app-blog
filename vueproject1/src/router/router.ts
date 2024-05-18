import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";



const routes = [
  {
    path: "/",
    meta: { title: "Home" },
    component: () => import("../components/Pages/Home.vue"),
  },
  {
    path: "/about",
    meta: { title: "About" },
    component: () => import("../components/Pages/About.vue"),
  },
  {
    path: "/posts",
    meta: { title: "Posts" },
    component: () => import("../components/Pages/Posts.vue"),
  },
  {
    path: "/posts/:id",
    exact: true,
    meta: { title: "Post" },
    component: () => import("../components/Pages/Sub/Post.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "font-bold",
  linkExactActiveClass: "font-bold",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title as string} | ${
    to.params.id ? to.params.id : "Page"
  }`;
  next();
});

export default router;
