<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: null,
      },
      caption: "",
      imageFile: null,
      imagePreviewURL: null,
    };
  },
  mounted() {
    const name = localStorage.getItem("name");
    this.user.name = name;
    console.log(this.user.name);
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageFile = file;
      this.imagePreviewURL = URL.createObjectURL(file);
    },
    async onSubmit() {
      const jwt = localStorage.getItem("token");
      console.log(jwt);

      const { data } = await axios.post(
        "http://13.215.209.83/api/posts",
        {
          caption: this.caption,
          photo: this.imageFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
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
          <p class="text-white">New Pics <span class="ml-2">❤️</span></p>
        </div>
        <div>
          <router-link to="/posts">Back</router-link>
        </div>
      </div>
      <div id="preview">
        <img
          class="rounded-lg w-full object-cover"
          v-if="imagePreviewURL"
          :src="imagePreviewURL"
        />
        <div v-else class="h-[320px] rounded-lg bg-pink-200"></div>
      </div>
      <div class="mt-2">
        <div class="cursor-pointer">
          <p class="text-white tex-sm font-bold mb-2 mt-4">
            <span class="mr-2">📸</span>
            <input
              class="rounded-full text-sm text-pink-100"
              type="file"
              @change="onFileChange"
            />
          </p>
        </div>
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

    <form class="mt-4" @submit.prevent="onSubmit">
      <button class="w-full bg-white text-black rounded-lg py-2">Upload</button>
    </form>
  </main>
</template>
