<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: null,
      },
      id: "",
      caption: "",
      photo: "",
    };
  },
  mounted() {
    const name = localStorage.getItem("name");
    this.user.name = name;
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const jwt = localStorage.getItem("token");
      const res = await axios.get(
        `http://13.215.209.83/api/posts/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const {
        status,
        data: { id, caption, photo },
      } = res.data;
      // redirect if not the user resources
      if (status === 304) {
        this.$router.replace("/posts");
      }

      this.id = id;
      this.caption = caption;
      this.photo = photo;
    },
    async onUpdate() {
      const jwt = localStorage.getItem("token");
      console.log(jwt);

      const res = await axios.post(
        `http://13.215.209.83/api/posts/${this.id}`,
        {
          caption: this.caption,
          _method: "put",
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      this.$router.replace(`/user/posts`);
    },

    async onDelete() {
      const jwt = localStorage.getItem("token");
      console.log(jwt);
      const res = await axios.post(
        `http://13.215.209.83/api/posts/${this.id}`,
        {
          _method: "delete",
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(res);
      this.$router.replace("/user/posts");
    },
  },
};
</script>

<template>
  <main class="p-4 bg-black text-white h-[100vh]">
    <section class="py-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2 text-sm">
          <div class="w-8 h-8 bg-white rounded-full"></div>
          <p class="text-white font-bold">{{ user.name }}</p>
        </div>
        <div>
          <router-link to="/user/posts">Back</router-link>
        </div>
      </div>
      <div id="preview">
        <img
          class="rounded-lg w-full h-[340px] object-cover"
          :src="`http://13.215.209.83/storage/${photo}`"
        />
      </div>
      <div class="mt-4">
        <p class="text-gray-400">
          <span class="mr-2">✍️</span>*update your caption
        </p>
      </div>
      <div class="mt-2">
        <p class="text-white text-sm mb-2 flex gap-2 mt-4">
          <span class="font-bold">{{ user.name }}</span>
          <input
            class="bg-black text-white outline-none w-full"
            type="text"
            v-model="caption"
            placeholder="your caption..."
          />
        </p>
      </div>
    </section>

    <form class="mt-8" @submit.prevent="onUpdate">
      <button class="w-full bg-white text-black rounded-lg py-2">Update</button>
    </form>
    <form class="mt-8" @submit.prevent="onDelete">
      <button class="w-full bg-black text-red-500 rounded-lg py-2">
        Delete
      </button>
    </form>
  </main>
</template>
