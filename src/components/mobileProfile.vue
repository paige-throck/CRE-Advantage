<template>
<div class="profile">

<mobileNav></mobileNav>


<i class="material-icons notifyBell" style="font-size:4vh" @click="showNotifications = !showNotifications">notifications_none</i>

<div class="notififyBox" id="taskList" v-if="showNotifications">
        <ProTasks></ProTasks>
</div>



<div class = "row navIcons">

<div class = "col-sm-3">
<router-link to="/mobile-tasks">
<i class="material-icons" style="font-size:10vh">event_note</i>
<p>Tasks</p>
</router-link>
</div>

<div class = "col-sm-3">
  <router-link to="/mobile-map">
<i class="material-icons" style="font-size:10vh">satellite</i>
<p>Map</p>
</router-link>
</div>

<div class = "col-sm-3">
<router-link to="/mobile-account-settings">
<i class="material-icons" style="font-size:10vh">account_box</i>
<p>Account Settings</p>
</router-link>
</div>

<div class = "col-sm-3">
<router-link to="/" v-on:click="logout">
<i class="material-icons" style="font-size:10vh">close</i>
<p>Logout</p>
</router-link>
</div>

</div>
</div>
</template>

<script>

import Property from './Property.vue'
import Tasks from './Tasks.vue'
import PropMap from './PropMap.vue'
import ProTasks from './profileTasks.vue'
import mobileNav from './mobileNav.vue'



export default {
  name: 'mobileProfile',
  components: {
    'property': Property,
    'mobileNav': mobileNav,
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
  height: 100vh;
  margin-bottom: 0;
}

.navIcons{
  text-align: center;
  padding-top:30%;

}
p {
  margin-top: 5%;
}
a:hover {
  text-decoration: none;
}

a{
  color:white;
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


</style>
