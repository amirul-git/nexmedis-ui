<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      isUserCreated: false,
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
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      const { data } = res;
      console.log(data);

      if (data.status === 200) {
        this.isUserCreated = true;
      }
    },
  },
};
</script>

<template>
  <main
    class="p-10 flex flex-col gap-6 h-[100vh] items-center justify-center text-white"
    @submit.prevent="onSubmit"
  >
    <section
      class="p-10 border rounded-md border-gray-700 w-full max-w-[420px]"
      v-if="!isUserCreated"
    >
      <h1 class="italic text-center uppercase text-2xl font-light mb-4">
        Social
      </h1>

      <form class="flex flex-col gap-2">
        <input
          v-model="name"
          class="p-2 border-[1px] bg-black border-gray-700 rounded-md w-full"
          type="text"
          placeholder="Name"
        />
        <input
          v-model="email"
          class="p-2 border-[1px] bg-black border-gray-700 rounded-md w-full"
          type="text"
          placeholder="Email"
        />
        <input
          v-model="password"
          class="p-2 border-[1px] bg-black border-gray-700 rounded-md w-full"
          type="text"
          placeholder="Password"
        />
        <button
          class="bg-blue-400 text-white p-[6px] rounded-lg font-medium w-full mt-2"
        >
          Register
        </button>
      </form>
    </section>
    <section
      v-if="isUserCreated"
      class="px-10 py-7 border rounded-md w-full max-w-[420px]"
    >
      <p class="text-center">
        Register Success.
        <router-link to="/login" class="font-bold text-blue-400"
          >Go to Login</router-link
        >
      </p>
    </section>

    <section
      class="px-10 py-7 border-gray-700 border rounded-md w-full max-w-[420px]"
    >
      <p class="text-center">
        Have an account?

        <router-link class="font-bold text-blue-400" to="/login"
          >Log in</router-link
        >
      </p>
    </section>
  </main>
</template>
