<template>
<div class="row profile">

  <Nav></Nav>

  <div class="row">
  <h1>Goodmoring {{msg}}</h1>
  </div>

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
