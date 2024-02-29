<template>
  <!-- Navigation Bar -->
  <nav class="p-4 border-b bg-gray-100 flex justify-between items-center">
    <div>
      <router-link to="/"> <span class="text-2xl font-semibold text-blue-500">ClingNote</span></router-link>
    </div>
    <div class="flex  ">
      <!-- Check if user is authenticated -->
      <div v-if="user">
        <div>
          <router-link :to="'/Profile/' + userID"> <!-- Update this line -->
            <img src="https://cdn.pixabay.com/photo/2024/02/17/15/02/bird-8579496_640.jpg" class="rounded-full w-8 h-8 inline-block mr-2">
          </router-link>

          <!-- <span>{{ user.email }}</span> -->
          <button @click="logout" class="text-gray-600 hover:text-gray-800 inline-block"><i class="fa fa-sign-out"></i></button>
        </div>
      </div>

      <template v-else>
        <!-- Display "Login" link only if the route path matches its name -->
        <router-link v-if="!isRoute('Login')" to="/login" class="text-gray-600 hover:text-gray-800 flex items-center space-x-2">
          <i class="fa fa-sign-in"></i>
        </router-link>
        <!-- Display "Register" link only if the route path matches its name -->
        <router-link v-if="!isRoute('Register')" to="/register" class="text-gray-600 hover:text-gray-800 flex items-center space-x-2">
          <i class="fa fa-user-plus"></i>
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/firebaseConfig'; // Import your firebase authentication instance
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

const router = useRouter(); // Initialize router

// State to hold user information
const user = ref(null);
const userID = ref(null); // Initialize userID as a reactive variable

// Function to handle user logout
const logout = async () => {
  try {
    await auth.signOut(); // Firebase sign out function
    router.push('/login'); // Redirect to login page after logout
  } catch (error) {
    console.error(error.message);
  }
};

// Function to check if the current route matches the provided route name
const isRoute = (routeName) => {
  return router.currentRoute.value.name === routeName;
};

// Check if user is authenticated
auth.onAuthStateChanged((currentUser) => {
  user.value = currentUser;
  if (currentUser) {
    userID.value = currentUser.uid; // Set userID if user is authenticated
  }
});
</script>
