<template>
<div id="app">

<router-view></router-view>

</div>
</template>

<script>
import PropMap from './components/PropMap.vue'
import Property from './components/Property.vue'
import Profile from './components/profile.vue'
import Nav from './components/Nav.vue'
import Tasks from './components/Tasks.vue'
import SmallMap from './components/SmallMap.vue'
import NewSuiteForm from './components/NewSuiteForm.vue'
import NewPropertyForm from './components/NewPropertyForm.vue'
import headerTopper from './components/headerTopper.vue'
import AllProp from './components/AllProp.vue'

export default {
  name: 'App',
  components: {
    'PropMap': PropMap,
    'Property': Property,
    'Profile': Profile,
    'Nav': Nav,
    'Tasks': Tasks,
    'SmallMap': SmallMap,
    'NewSuiteForm': NewSuiteForm,
    'NewPropertyForm': NewPropertyForm,
    'AllProp': AllProp,
    'headerTopper': headerTopper
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Fira Sans Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  height: 100%;

}



html {
  font-size: 1rem;
}



</style>
