<template>
  <div class="bg-white p-8 rounded shadow-md max-w-md w-full">
    <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-6">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label :for="emailId" class="sr-only">Email address</label>
        <input :id="emailId" :name="emailName" type="email" v-model="email" required :placeholder="emailPlaceholder" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      </div>
      <div>
        <label :for="passwordId" class="sr-only">Password</label>
        <input :id="passwordId" :name="passwordName" type="password" v-model="password" required :placeholder="passwordPlaceholder" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      </div>
      <div>
        <button type="submit" :disabled="isSubmitting" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="mr-2">
            <svg class="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M6 9V7a5 5 0 0 1 10 0v2h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2z" clip-rule="evenodd" />
            </svg>
          </span>
          <span>{{ buttonText }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await onSubmit(email.value, password.value);
  } catch (error) {
    console.error('Action failed:', error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

