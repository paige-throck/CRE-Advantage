<template>
<div id="app">
<!-- <profile></profile> -->

<router-view></router-view>
<!-- <profile></profile> -->

</div>
</template>

<script>
import PropMap from './components/PropMap.vue'
import Property from './components/Property.vue'
import Profile from './components/profile.vue'
import Nav from './components/Nav.vue'
import Tasks from './components/Tasks.vue'

export default {
  name: 'App',
  components: {
    'PropMap': PropMap,
    'Property': Property,
    'Profile': Profile,
    'Nav': Nav,
    'Tasks': Tasks
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
