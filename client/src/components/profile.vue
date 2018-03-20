<template>
<div class="row profile">

<Nav></Nav>

<div class = "row profileContent">
<h1>Hello {{msg}}</h1>
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
}



</script>
<style scoped>
.profile{
  margin:5%;
}
</style>
