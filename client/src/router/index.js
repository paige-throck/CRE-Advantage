import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Signup from '@/components/signup'
import PropertyMap from '@/components/PropertyMap'


Vue.use(Router)

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
      path: '/map',
      name: 'map',
      component: PropertyMap
    }

  ]
});
