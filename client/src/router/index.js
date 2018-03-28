import Vue from 'vue';
import Router from 'vue-router';
import VueSession from 'vue-session';
import VueSweetalert2 from 'vue-sweetalert2';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

import App from '@/App'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/profile'
import Tasks from '@/components/Tasks'
import Property from '@/components/Property'
import PropMap from '@/components/PropMap'
import UpdateUser from '@/components/UpdateUser'
import SmallMap from '@/components/SmallMap'
import AllProp from '@/components/AllProp'
import DatePicker from '@/components/DatePicker'
import ProTasks from '@/components/profileTasks'
import NewProperty from '@/components/NewProperty.vue'
import mobileProfile from '@/components/mobileProfile.vue'
import mobileTasks from '@/components/mobileTasks.vue'
import mobileMap from '@/components/mobileMap.vue'
import mobileAccount from '@/components/mobileAccount.vue'

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
      path: '/account-settings',
      name: 'UpdateUser',
      component: UpdateUser
    },
    {
      path: '/properties',
      name: 'AllProp',
      component: AllProp
    },
    {
    path: '/new-property',
    name: 'NewProperty',
    component: NewProperty
  },
  {  path: '/mobile-profile',
  name: 'mobileProfile',
  component: mobileProfile
  },
  {  path: '/mobile-tasks',
  name: 'mobileTasks',
  component: mobileTasks
  },
  {  path: '/mobile-map',
  name: 'mobileMap',
  component: mobileMap
},
{  path: '/mobile-account-settings',
name: 'mobileAccount',
component: mobileAccount
}

  ]
});
