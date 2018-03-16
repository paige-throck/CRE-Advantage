import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/profile'
import Tasks from '@/components/Tasks'
import Property from '@/components/Property'
import PropMap from '@/components/PropMap'
import Nav from '@/components/Nav'
import App from '@/App'



Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  routes: [{
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
      path: '/map',
      name: 'PropMap',
      component: PropMap

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
      // children: [
      //
      //   {path:'tasks', component:Tasks},
      //
      //   {path:'map', name: 'PropMap', component:PropMap},
      //
      //   {path:'property/:id', component:Property}
      // ]
    },
    {
      path: '/property/:id',
      name: 'Property',
      component: Property
    },
    {
      path: '/map',
      name: 'PropMap',
      component: PropMap
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    }
  ]
});
