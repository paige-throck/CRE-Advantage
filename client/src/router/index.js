import Vue from 'vue';
import Router from 'vue-router';
import VueSession from 'vue-session';
import VueSweetalert2 from 'vue-sweetalert2';
import datepicker from 'vue-date-picker';


import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/profile'
import Tasks from '@/components/Tasks'
import Property from '@/components/Property'
import PropMap from '@/components/PropMap'
import UpdateUser from '@/components/UpdateUser'
import SmallMap from '@/components/SmallMap'
import DatePicker from '@/components/DatePicker'
import Nav from '@/components/Nav'
import App from '@/App'





Vue.use(Router)
Vue.use(VueSession)


export default new Router({
  mode: 'history',
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
    },
    {
      path: '/property/:id',
      name: 'Property',
      component: Property
    },

    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/update-account',
      name: 'UpdateUser',
      component: UpdateUser
    }
  ]
});
