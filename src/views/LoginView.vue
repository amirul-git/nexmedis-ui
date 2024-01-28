<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    const jwt = localStorage.getItem("token");
    console.log(jwt);
    if (jwt) {
      this.$router.replace("/posts");
    }
  },
  methods: {
    async onSubmit() {
      const res = await axios.post("http://13.215.209.83/api/login", {
        email: this.email,
        password: this.password,
      });
      const { data } = res;
      const { token, name } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      console.log(name);
      this.$router.push("/posts");
    },
  },
};
</script>

<template>
  <main
    class="m-10 flex flex-col gap-6 h-[100vh] items-center justify-center text-white"
  >
    <section
      class="p-10 border rounded-md border-gray-700 w-full max-w-[420px]"
    >
      <h1 class="italic text-center uppercase text-2xl font-light">Social</h1>
      <form class="flex flex-col gap-2 mt-6" @submit.prevent="onSubmit">
        <input
          class="p-2 border-[1px] bg-black border-gray-700 rounded-md w-full"
          type="text"
          v-model="email"
          placeholder="email"
        />
        <input
          class="p-2 border-[1px] bg-black rounded-md w-full border-gray-700"
          type="password"
          v-model="password"
          placeholder="password"
        />
        <div>
          <button
            class="bg-blue-400 text-white p-[6px] rounded-lg font-medium w-full mt-2"
          >
            Log In
          </button>
        </div>
      </form>
    </section>
    <section
      class="px-10 py-7 border border-gray-700 rounded-md w-full max-w-[420px]"
    >
      <p class="text-center">
        Don't have account?

        <router-link class="font-bold text-blue-400" to="/register"
          >Sign Up</router-link
        >
      </p>
    </section>
  </main>
</template>
