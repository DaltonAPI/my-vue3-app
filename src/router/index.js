import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import RegisterPage from '../views/UserRegistrationForm.vue'
import Splash from '../views/SplashScreen.vue'
import Login from '../views/Login.vue'
import { auth } from '@/firebaseConfig';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // User is signed in, allow access to Home page
        next();
      } else {
        // User is not signed in, redirect to login page
        next('/login');
      }
    }
  },
  {
    path: '/profile/:userId',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'), // Assuming your profile page component is named Profile.vue
    props: true
  },
  {
    path: '/splash',
    name: 'Splash',
    component: Splash
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
