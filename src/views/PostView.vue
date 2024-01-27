<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: "",
      },
      posts: [],
      comment: [],
      selectedPostComment: [],
    };
  },
  mounted() {
    this.user.name = localStorage.getItem("name");
    console.log(this.user);
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const res = await axios.get("http://127.0.0.1:8000/api/posts");
      const { data } = res;
      console.log(data);
      this.posts = data.data;
    },
    async onLikes(postID) {
      const jwt = localStorage.getItem("token");
      if (jwt === null) {
        this.$router.replace("/login");
      }
      const res = await axios.post(
        `http://127.0.0.1:8000/api/posts/${postID}/likes`,
        {
          post_id: postID,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      this.$router.go("/posts");
    },
    async onComments(postID) {
      const jwt = localStorage.getItem("token");
      const res = await axios.post(
        `http://127.0.0.1:8000/api/posts/${postID}/comments`,
        {
          post_id: postID,
          text: this.comment[postID],
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      this.$router.go("/posts");
    },
    onViewPostComment(postID) {
      const selectedComment = [];
      selectedComment[postID] = true;
      this.selectedPostComment = selectedComment;
      console.log(this.popup, selectedComment);
    },
  },
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-16 bg-black text-white border border-black border-b-gray-600"
  >
    <div class="flex items-center h-full px-4 justify-between">
      <router-link to="/user/posts">
        <div v-if="user.name" class="flex items-center cursor-pointer">
          <div class="w-8 h-8 bg-white rounded-full mr-2"></div>
          <p class="text-sm font-bold">{{ user.name }}</p>
        </div>
      </router-link>
      <router-link
        to="/posts"
        class="py-[4px] px-[20px] bg-white rounded-full text-black"
      >
        <span class="mr-2">⚕️</span> Social
      </router-link>
      <router-link
        to="/posts/create"
        v-if="user.name"
        class="py-[4px] px-[20px] bg-white rounded-full text-black"
      >
        <span class="mr-2">📸</span> + Post
      </router-link>
      <router-link
        to="/login"
        v-else
        class="py-[4px] px-[20px] bg-white rounded-full text-black"
      >
        <span class="mr-2">📸</span> + Post
      </router-link>
    </div>
  </header>
  <main class="p-10 bg-black mt-10">
    <p v-if="posts.length === 0">No post yet</p>
    <div v-else>
      <div
        v-for="{
          caption,
          comments,
          likes,
          photo,
          user,
          created_at,
          id,
        } in posts"
        :key="id"
      >
        <section class="py-4">
          <div class="flex items-center gap-2 text-sm mb-4">
            <div class="w-8 h-8 bg-white rounded-full"></div>
            <p class="text-white font-bold">{{ user.name }}</p>
            <p class="text-white">{{ created_at }}</p>
          </div>
          <div>
            <img
              @dblclick="onLikes(id)"
              class="w-full cursor-pointer rounded-lg"
              :src="`${photo ? 'http://localhost:8000/storage/' + photo : ''}`"
              alt=""
            />
          </div>
          <div class="mt-2">
            <p class="text-white tex-sm font-bold mb-2 mt-4">
              <span class="mr-2">❤️</span>{{ likes.length }} likes
            </p>
            <p class="text-white text-sm mb-2">
              <span class="font-bold">{{ user.name }}</span>
              {{ caption }}
            </p>
            <div class="cursor-pointer">
              <p
                @click="onViewPostComment(id)"
                class="text-sm text-gray-400 mb-2"
              >
                View all {{ comments.length }} comment
              </p>
              <div
                v-if="comments.length > 0 && selectedPostComment[id] === true"
              >
                <section class="text-white" v-for="comment in comments">
                  <div class="flex gap-2 mb-2 items-center">
                    <div class="w-4 h-4 bg-white rounded-full"></div>
                    <p class="text-sm">{{ comment.user.name }}</p>
                    <div class="w-1 h-1 bg-white rounded-full"></div>
                    <p>{{ comment.text }}</p>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <form class="flex" @submit.prevent="onComments(id)">
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment.."
                  class="bg-black outline-none text-white text-s w-full"
                  v-model="comment[id]"
                />
                <button class="text-sm p-2 text-gray-400">Send</button>
              </form>
            </div>
          </div>
          <div class="h-[1px] w-full bg-gray-700 mt-6"></div>
        </section>
      </div>
    </div>
  </main>
</template>
