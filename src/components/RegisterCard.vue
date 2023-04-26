<script setup>
import { useStore } from 'vuex';
import {ref, reactive } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import LoadingSpinner from './LoadingSpinner.vue';
import router from "../router";

const store = useStore()
const registerState = store.state.auth.register

const firstNameModel = ref('')
const lastNameModel = ref('')
const ageModel = ref('')
const dobModel = ref('')



const passwordModel = ref('')
const emailModel= ref('')
const c_passwordModel = ref('')
const localState = reactive({
  disableRegister: true,
  emailError: false,
  passwordError: false,
  c_passwordError: false,
})

const register = () => {
  store.dispatch('registerAction', {
    email: emailModel.value,
    password: passwordModel.value,
    firstName: firstNameModel.value,
    lastName: lastNameModel.value,
    email: emailModel.value,
    password: passwordModel.value,
    age: ageModel.value,
    dob: dobModel.value
  }).then(() => {
    store.dispatch('getUserAction')
    router.push('/home')
  })
}


const validateFirstName = () => {
  localState.firstNameError = firstNameModel.value.length < 1;
}

const validateLastName = () => {
  localState.lastNameError = lastNameModel.value.length < 1;
}

const validateAge = () => {
  localState.ageError = isNaN(ageModel.value) || ageModel.value < 1;
}

const validateDOB = () => {
  localState.dobError = dobModel.value.length < 1;
}





const validateEmail = () => {
  const mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  localState.emailError = emailModel.value.length < 1 || !emailModel.value.match(mail_format);
}

const validatePassword = () => {
  localState.passwordError = passwordModel.value.length < 8;
}

const validateC_Password = () => {
  localState.c_passwordError = c_passwordModel.value !== passwordModel.value;
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  validateC_Password()
  validateEmail()
  validatePassword()
  validateC_Password()
  validateFirstName()
  validateLastName()
  validateAge()
  validateDOB()
  localState.disableRegister = (
    localState.emailError || localState.passwordError || localState.c_passwordError || 
    localState.firstNameError || localState.lastNameError || localState.ageError || localState.dobError
  )
}

</script>

<template>
  <form class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full p-5 relative" @submit.prevent="register" @change="validateForm">
    <LoadingSpinner v-if="registerState.isLoading" />
    <h1 class="text-left text-2xl mb-10 ml-3">Registration</h1>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="FirstNameInputText" type="text" v-model="firstNameModel" class="w-full" required :class="{'p-invalid': localState.firstNameError}"/>
        <label for="FirstNameInputText">First Name</label>
      </span>
      <p v-if="localState.firstNameError" class="text-red-500 text-xs italic text-left">First Name is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="LastNameInputText" type="text" v-model="lastNameModel" class="w-full" required :class="{'p-invalid': localState.lastNameError}"/>
        <label for="LastNameInputText">Last Name</label>
      </span>
      <p v-if="localState.lastNameError" class="text-red-500 text-xs italic text-left">Last Name is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="EmailInputText" type="email" v-model="emailModel" class="w-full" required :class="{'p-invalid': localState.emailError}"/>
        <label for="EmailInputText">Email</label>
      </span>
      <p v-if="localState.emailError" class="text-red-500 text-xs italic text-left">Email is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="AgeInputText" type="number" v-model="ageModel" class="w-full" required :class="{'p-invalid': localState.ageError}"/>
        <label for="AgeInputText">Age</label>
      </span>
      <p v-if="localState.ageError" class="text-red-500 text-xs italic text-left">Age is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="DOBInputText" type="date" v-model="dobModel" class="w-full" required :class="{'p-invalid': localState.dobError}"/>
        <label for="DOBInputText">Date of Birth</label>
      </span>
      <p v-if="localState.dobError" class="text-red-500 text-xs italic text-left">Date of Birth is required</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="PasswordInputText" type="password" v-model="passwordModel" class="w-full" required :class="{'p-invalid': localState.passwordError}"/>
        <label for="PasswordInputText">Password</label>
      </span>
      <p v-if="localState.passwordError" class="text-red-500 text-xs italic text-left">Password at least 8 characters</p>
    </div>
    <div class="md:w-[65%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="CPasswordInputText" type="password" v-model="c_passwordModel" class="w-full" required :class="{'p-invalid': localState.c_passwordError}"/>
        <label for="CPasswordInputText">Confirm Password</label>
      </span>
      <p v-if="localState.c_passwordError" class="text-red-500 text-xs italic text-left">Confirm password is not equal</p>
    </div>
    <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[85px] opacity-40" :class="{ 'ableRegister': !localState.disableRegister }" :disabled="localState.disableRegister">Register</button>
  </form>
</template>

<style scoped lang="postcss">
.ableRegister {
  @apply hover:bg-[#FF9000] transition ease-in-out opacity-100
}
</style>
