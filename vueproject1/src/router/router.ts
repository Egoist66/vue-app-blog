import {
  createRouter,
  createWebHistory,
} from "vue-router";


const Home = () => import('../components/Pages/Home.vue');
const About = () => import('../components/Pages/About.vue');
const Posts = () => import('../components/Pages/Posts.vue');
const Post = () => import('../components/Pages/Sub/Post.vue');

const routes = [
  {
    path: "/",
    meta: { title: "Home" },
    component: Home,
  },
  {
    path: "/about",
    meta: { title: "About" },
    component: About,
  },
  {
    path: "/posts",
    meta: { title: "Posts" },
    component: Posts,
  },
  {
    path: "/posts/:id",
    exact: true,
    meta: { title: "Post" },
    component: Post,
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
