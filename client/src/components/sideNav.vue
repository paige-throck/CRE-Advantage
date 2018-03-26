<template>
<div class="sideNav">


<!-- notifications -->
  <i class="material-icons notifyBell" style="font-size:4vh" @click="showNotifications = !showNotifications">notifications_none</i>

  <div class="notififyBox" id="taskList" v-if="showNotifications">
          <ProTasks></ProTasks>
  </div>


    <div class ="row2">
      <br></br>
      <br></br>
      <br></br>

      <router-link to="/profile"><center><i class="material-icons navButton" style="font-size:6vh">home</i></center>
      <center class = "navText">Home</center></router-link>

    <router-link to="/new-property"><center><i class="material-icons navButton" style="font-size:6vh">add_location</i></center>
    <center class = "navText">Add Property</center></router-link>

    <router-link to="/properties"><center><i class="material-icons navButton" style="font-size:6vh">location_city</i></center>
      <center class = "navText">Properties</center>
    </router-link>

    <router-link to="/map"><center><i class="material-icons navButton" style="font-size:6vh">satellite</i></center>
      <center class = "navText">Map</center>
    </router-link>

    <router-link to="/tasks">
    <center><i class="material-icons navButton" style="font-size:6vh">event_note</i></center>
    <center class = "navText">Tasks</center>
  </router-link>

    <router-link to ="/account-settings"><center><i class="material-icons navButton" style="font-size:6vh">account_box</i></center>
      <center class = "navText">Account</center>
    </router-link>


    <router-link to="/">
    <center><i class="material-icons navButton" v-on:click="logout" style="font-size:6vh">close</i></center>
    <center class = "navText"><p>Logout</p></center>
    </router-link>


  </div>



  <div class="row row1">
    <div class="col-sm-12">
      <h1>CRE <span class="advantage">Advantage</span></h1>
      <p class="theDate">{{ today }}</p>
    </div>


  </div>


</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ProTasks from './profileTasks.vue'


export default {
  name: 'sideNav',
  components: {
    ProTasks
  },
  data() {
    return {
      today: '',
      showNotifications: false
    }
  },
  mounted: function() {
    let date = new Date()
    this.today = moment(date).format("dddd, MMM DD");

  },
  methods:{
    logout: function() {
      let self = this;
      localStorage.clear();
  },
  }
}
</script>

<style scoped>
.row1 {
  height: 10%;
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0;
  z-index: 200;

}

.row2 {
  height: 100%;
  background-color: #136a8a;
  position: relative;
  min-width: 10%;

  z-index:1;
  top: 0;
  left: 0;
  margin: auto;
  position: fixed;
  z-index: 100;

}
a{
  color: black;
}
.material-icons{
  color: black;
}
.navButton{
  padding-top: 5%;
}

.navText{
  padding-bottom: 5%;
}

h1 {
  font-family: 'Fira Sans Condensed', sans-serif;
  color: white;
  font-weight: 300;
  font-size: 4vh;
  position: fixed;
}

.advantage {
  font-weight: 200;
  font-style: italic;
}
.theDate {
  position: fixed;
  top: 3%;
  right: 12%;
  color: white;
  font-size: 3vh;
  font-weight: 200;
}
.notififyBox {
  position: fixed;
  top: 12%;
  right: 4%;
  width: 30%;
  z-index: 100;
}
.notifyBell {
  position: fixed;
  top: 2%;
  right: 6%;
  font-size: 5vh;
  color: gainsboro;
  z-index: 300;
}
.notifyBell:hover {
  color: #73BEDB;
  cursor: pointer;
}

</style>
