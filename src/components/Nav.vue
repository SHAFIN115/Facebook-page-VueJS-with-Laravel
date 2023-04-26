<script setup>
import { firebaseAuth } from '../../firebase/config';
import { useStore } from "vuex";
import { watchEffect, computed } from "vue";

const store = useStore()
const userState = computed(() => store.state.auth.userDetails)

const firebaseUser = () => firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    store.commit('successRequestUser', user)
  } else {
    store.commit('failRequestUser', 'Fail to get user')
  }
});

watchEffect(firebaseUser)

</script>

<template>
  <div class="w-screen flex h-[70px] items-center bg-blue-500 shadow-lg inset-x-0 top-0 fixed justify-center z-40">
    <div class="flex container w-[100%]">
      <div class="flex items-center w-[80%]">
        <div>
          <h1 class="text-white text-2xl font-bold">
            Facebook
          </h1>
        </div>
      </div>
      <div class="md:flex items-center w-[20%] sm:hidden justify-center">
        <div v-if="userState.isSignIn">
          <router-link to="/home" class="text-primary mr-2 hover:text-[#FF9000] transition ease-in-out">
            Home
          </router-link>
          <router-link to="/profile" class="text-primary mr-2 hover:text-[#FF9000] transition ease-in-out">
            Profile
          </router-link>
          <a href="#" class="text-white text-lg mr-6 hover:text-gray-200">
            Friends
          </a>
          <a href="#" class="text-white text-lg mr-6 hover:text-gray-200">
            Messages
          </a>
        </div>
        <div v-else>
          <router-link to="/register" class="text-primary mr-2 hover:text-[#FF9000] transition ease-in-out">
            Register
          </router-link>
          <a href="#" class="text-white text-lg mr-6 hover:text-gray-200">
            Log In
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
