import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'

import Login from '@/components/login'
import Signup from '@/components/signup'
import Profile from '@/components/profile'
import PropertyMap from '@/components/PropertyMap'



Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup

    },
    {
      path: '/',
      name:'Profile',
      component: Profile
    },
    {
      path: '/map',
      name: 'map',
      component: PropertyMap
    }
  ]
});
