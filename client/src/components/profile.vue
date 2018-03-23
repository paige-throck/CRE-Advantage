<template>
<div class="profile">

  <div class="row">
    <div class="col-md-12">
      <headerTopper></headerTopper>
    </div>
  </div>

<!-- <Nav></Nav> -->
<!-- <div class = "col-sm-4">
<h1>Hello {{msg}}</h1>
</div> -->
<!-- <i class="material-icons">donut_small</i> -->
<br></br>
<div class = "row">
<div id="mainDash" class = "col-sm-10">

<div class = "col-sm-4">
  <div class = "row">
    <center><i class="material-icons" style="font-size:10vh">add_location</i></center>
    <center>New Property</center>
  </div>

<br></br>

<router-link to="/tasks"><div class = "row">
<center><i class="material-icons" style="font-size:10vh">event_note</i></center>
<center>Tasks</center>
</div></router-link>
</div>


<div class = "col-sm-4">
<router-link to="/allprop"><div class = "row">
  <center><i class="material-icons" style="font-size:10vh">location_city</i></center>
  <center>Properties</center>
</div></router-link>

<br></br>

<router-link to="/update-account"><div class = "row">
<center><i class="material-icons" style="font-size:10vh">account_box</i></center>
<center>Account Settings</center>
</div></router-link>
</div>



<div class = "col-sm-4">
  <router-link to="/map"><div class = "row">
  <center><i class="material-icons" style="font-size:10vh">satellite</i></center>
  <center>Map</center>
</div></router-link>

<br></br>

<router-link to="/login"><div class = "row" v-on:click="logout">
<center><i class="material-icons" style="font-size:10vh">close</i></center>
  <center>Logout</center>
</div></router-link>
</div>

</div>


<div id="taskList" class = "col-sm-2">
<ProTasks></ProTasks>
</div>








</div>
</div>
</template>

<script>

import Property from './Property.vue'
import Nav from './Nav.vue'
import Tasks from './Tasks.vue'
import PropMap from './PropMap.vue'
import ProTasks from './profileTasks.vue'
import headerTopper from './headerTopper'


export default {
  name: 'Profile',
  components: {
    'property': Property,
    'Nav': Nav,
    'Tasks': Tasks,
    'ProTasks': ProTasks,
    'HeaderTopper':headerTopper
  },
  data() {
    return {
      msg: window.localStorage.name
    }
  },
  methods:{
    logout: function() {
      let self = this;
      localStorage.clear();

      console.log(window.localStorage, 'storage after logout');
  }
}
}

</script>


<style scoped>

.square{
  background-color: blue;
  background-image: url("../../img/apartment.png");
    width: 15vw;
    height: 15vw;

}

.squareMap{
  background-image: url("../../img/iconoMapa.png");
    width: 15vw;
    height: 15vw;

}

/* .material-icons.md-100 { font-size: 100px; } */

</style>
