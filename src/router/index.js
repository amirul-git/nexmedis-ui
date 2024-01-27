import { createRouter, createWebHistory } from "vue-router";
import RegisterViewVue from "@/views/RegisterView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import PostViewVue from "@/views/PostView.vue";
import CreatePostViewVue from "@/views/CreatePostView.vue";
import ShowPostViewVue from "@/views/ShowPostView.vue";
import ProfileViewVue from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterViewVue,
    },
    {
      path: "/login",
      name: "login",
      component: LoginViewVue,
    },
    {
      path: "/",
      redirect: { name: "posts" },
    },
    {
      path: "/posts",
      name: "posts",
      component: PostViewVue,
    },
    {
      path: "/posts/create",
      name: "create post",
      component: CreatePostViewVue,
    },
    {
      path: "/posts/:id",
      name: "show post",
      component: ShowPostViewVue,
    },
    {
      path: "/user/posts",
      name: "show profile",
      component: ProfileViewVue,
    },
  ],
});

export default router;
