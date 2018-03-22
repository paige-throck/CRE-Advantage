<template>
  <div class="home">
<h3>CRE ADVANTAGE</h3>

<!-- <div class = "bg">
</div> -->




    <router-link to="login">Login</router-link>
    <router-link to="signup">Signup</router-link>


</div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'Home',

  }


</script>

<style scoped>
.home{
  height: 100vh;
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../img/bigcity.jpg");
}


</style>
