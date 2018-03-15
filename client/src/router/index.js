import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/Profile'
import Tasks from '@/components/Tasks'
import Property from '@/components/Property'
import map from '@/components/Map'



Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
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
      path: '/profile',
      name:'Profile',
      component: Profile,
      children: [
        {path:'tasks', component:Tasks},
        {path:'map', component:map},
        {path:'property', component:Property}
      ]
    }
  ]
});
