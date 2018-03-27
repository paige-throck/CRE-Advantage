<template>
<div class="profile">


  <headerTopper></headerTopper>


<i class="material-icons notifyBell" style="font-size:4vh" @click="showNotifications = !showNotifications">notifications_none</i>

<div class="notififyBox" id="taskList" v-if="showNotifications">
        <ProTasks></ProTasks>
</div>



<div class = "row mainRowPadding">
<div id="mainDash" class = "col-sm-12">

<div class = "col-sm-4">



xs
<router-link to="/mobile-tasks"><div class = "row gridBox">
<i class="material-icons" style="font-size:10vh">event_note</i>
<p>Tasks</p>
</div></router-link>
</div>




<router-link to="/mobile-account-settings"><div class = "row gridBox">
<i class="material-icons" style="font-size:10vh">account_box</i>
<p>Account Settings</p>
</div></router-link>
</div>



<div class = "col-sm-4">
  <router-link to="/mobile-map"><div class = "row gridBox">
<i class="material-icons" style="font-size:10vh">satellite</i>
<p>Map</p>
</div></router-link>
</div>


</div>
</div>
</template>

<script>

import Property from './Property.vue'
import Tasks from './Tasks.vue'
import PropMap from './PropMap.vue'
import ProTasks from './profileTasks.vue'
import headerTopper from './headerTopper.vue'



export default {
  name: 'mobileProfile',
  components: {
    'property': Property,
    'headerTopper': headerTopper,
    'Tasks': Tasks,
    'ProTasks': ProTasks,


  },
  data() {
    return {
      msg: window.localStorage.name,
      showNotifications: false
    }
  },
  mounted: function() {
    this.checkSession();

  },

  methods:{
    logout: function() {
      let self = this;
      localStorage.clear();
  },

  checkSession: function(){
    let self = this;
    if (!localStorage.sessionData){
      console.log("is it getting in here");
      self.$router.push('/login')
    }
  }
}
}

</script>


<style scoped>
.profile {
  background: linear-gradient(to right, #136a8a, #267871);
  height: 100%;
  margin-bottom: 0;
}
.mainRowPadding {
  padding: 12%;
}

.paddding{
  margin: 12%;
}
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
.gridBox {

  background: white;
  width: 100%;
  height: 100%;
  padding-bottom: 25%;
  padding-top: 20%;
  text-align: center;
  color: #136a8a;
  border-radius: 1%;
  box-shadow: 1px 1px 10px #202020;
  display: block;
}
.gridBox:hover {
  background: linear-gradient(to right, whitesmoke, #ffffff);
  color: black;
}
p {
  margin-top: 5%;
}
a:hover {
  text-decoration: none;
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
  z-index: 1;
  padding-top: 1%;
}
.notifyBell:hover {
  color: #73BEDB;
  cursor: pointer;
}


/* .material-icons.md-100 { font-size: 100px; } */

</style>
