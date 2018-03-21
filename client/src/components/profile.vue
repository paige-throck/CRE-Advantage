<template>
<div class="row profile">

<Nav></Nav>

<div class = "row profileContent">
<h1>Hello {{msg}}</h1>
</div>

<div class ="container">
<div class = "row">


<div class = "col-sm-4 newprop-square">
</div>

<div class = "col-sm-4 map-square">
</div>

<div class = "col-sm-4 tasks-square">
</div>

</div>
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

.newprop-square{
  background:blue;
    width: 15vw;
    height: 15vw;
}

.map-square{
  background-color: green;
  width: 15vw;
  height: 15vw;
}

.tasks-square{
  background-color: purple;
  width: 15vw;
  height: 15vw;
}
</style>
