<script setup>
import { useStore } from 'vuex';
import {ref, reactive } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import LoadingSpinner from './LoadingSpinner.vue';
import router from "../router";

const store = useStore()
const signInState = store.state.auth.signIn

const passwordModel = ref('')
const emailModel= ref('')
const localState = reactive({
  disableSignIn: true,
  emailError: false,
  passwordError: false,
})

const signIn = () => {
  store.dispatch('signInAction', {email: emailModel.value, password: passwordModel.value}).then(() => {
    if (!signInState.isError) {
      store.dispatch('getUserAction')
      router.push('/home')
    }
  })
}

const validateEmail = () => {
  const mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  localState.emailError = emailModel.value.length < 1 || !emailModel.value.match(mail_format);
}

const validatePassword = () => {
  localState.passwordError = passwordModel.value.length < 1;
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  localState.disableSignIn = (localState.emailError || localState.passwordError);
}

</script>

<template>
  <form class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full p-5 relative" @submit.prevent="signIn" @change="validateForm">
    <LoadingSpinner v-if="signInState.isLoading" />
    <div class="flex justify-center items-center mb-8">
          <div class="flex items-center justify-center">
            <img src="src/fb-logo.png" alt="Facebook Logo" class="h-14 mr-20" />
          </div>
      <h1 class="text-white text-left text-2xl">Log in to Facebook</h1>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="EmailInputText" type="email" v-model="emailModel" class="w-full" required :class="{'p-invalid': localState.emailError}"/>
        <label for="EmailInputText" class="text-white">Email or Phone Number</label>
      </span>
      <p v-if="localState.emailError" class="text-red-500 text-xs italic text-left">Email or phone number is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="PasswordInputText" type="password" v-model="passwordModel" class="w-full" required :class="{'p-invalid': localState.passwordError}"/>
        <label for="PasswordInputText" class="text-white">Password</label>
      </span>
      <p v-if="localState.passwordError" class="text-red-500 text-xs italic text-left">Password is required</p>
    </div>
    <button class="bg-[#1877f2] rounded-full drop-shadow-lg text-white text-md h-9 w-[200px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <div class="flex items-center justify-center">
        <i class="fab fa-facebook-square mr-2"></i>
      <span>Login with Facebook</span>
      </div>
    </button>
</form>
</template>
<style scoped lang="postcss">
.ableSignIn {
  @apply hover:bg-[#FF9000] transition ease-in-out opacity-100
}
</style>
