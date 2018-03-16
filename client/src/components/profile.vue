<template>
<div class="profile">

  <Nav></Nav>

  <!-- <h3>CRE ADVANTAGE</h3> -->

  <h1>Goodmoring {{msg}}</h1>
  <!-- <router-view></router-view> -->

</div>
</template>

<script>

import Property from './Property.vue'
import Nav from './Nav.vue'
import Tasks from './Tasks.vue'
import PropMap from './PropMap.vue'


export default {
  name: 'Profile',
  components: {
    'property': Property,
    'Nav': Nav,
    'Tasks': Tasks
  },
  data() {
    return {
      msg: window.localStorage.name
    }
  },
  methods: {

    logout: function() {
      let self = this;
      localStorage.clear();

      self.$router.push('/login')
      console.log(window.localStorage, 'storage after logout');
    }
  }
}



</script>
<style>

</style>
