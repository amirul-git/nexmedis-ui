<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: null,
      },
      posts: [],
      comment: [],
      selectedPostComment: [],
    };
  },
  mounted() {
    this.user.name = localStorage.getItem("name");
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const jwt = localStorage.getItem("token");
      console.log(jwt);
      const res = await axios.get("https://jetset.dev/api/user/posts", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const { data } = res;
      const { data: resPosts } = data[0];
      this.posts = resPosts;
    },
    async onLikes(postID) {
      const jwt = localStorage.getItem("token");
      if (jwt === null) {
        this.$router.replace("/login");
      }
      const res = await axios.post(
        `https://jetset.dev/api/posts/${postID}/likes`,
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
    onViewPostComment(postID) {
      const selectedComment = [];
      selectedComment[postID] = true;
      this.selectedPostComment = selectedComment;
      console.log(this.popup, selectedComment);
    },
    async onComments(postID) {
      const jwt = localStorage.getItem("token");
      const res = await axios.post(
        `https://jetset.dev/api/posts/${postID}/comments`,
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

      this.$router.go("/user/posts");
    },
    onLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.$router.replace("/login");
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
      <button
        @click="onLogout"
        class="py-[4px] px-[20px] bg-white rounded-full text-black"
      >
        <span class="mr-2">🏃</span> Log out
      </button>
    </div>
  </header>
  <main class="p-10 bg-black mt-10 text-white">
    <p v-if="posts.length === 0">
      No post yet.
      <router-link
        class="py-2 px-4 bg-white rounded-full text-black"
        to="/posts/create"
        ><span class="mr-2">📸</span> Create one</router-link
      >
    </p>
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
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-sm">
              <div class="w-8 h-8 bg-white rounded-full"></div>
              <p class="text-white font-bold">{{ user.name }}</p>
              <p class="text-white">{{ created_at }}</p>
            </div>
            <router-link :to="{ name: 'show post', params: { id: id } }"
              >More</router-link
            >
          </div>
          <div>
            <img
              @dblclick="onLikes(id)"
              class="w-full cursor-pointer rounded-lg"
              :src="`${photo ? 'https://jetset.dev/storage/' + photo : ''}`"
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
