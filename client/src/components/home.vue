<template>
<div class="home">
  <div class="row">
    <div class="col-md-12">
      <headerTopper></headerTopper>
    </div>
  </div>


  <div class="row text-center">
    <div class="col-md-3"></div>

    <div class="col-md-6 container-box">
      <h3 class="welcome">Welcome</h3>

      <p class="lead">The place where brokers come to get ahead</p>

      <router-link to="login"><button class="button btn btn-info">Login</button></router-link>

      <router-link to="signup"><button class="button btn btn-info">Signup</button></router-link>
    </div>

    <div class="row-md-3"></div>
  </div>
</div>

</div>
</template>

<script>
import axios from 'axios';
import headerTopper from './headerTopper'


export default {
  name: 'Home',
  components: {
    headerTopper
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../img/bigcity.jpg");
}

.container-box {
  margin-top: 13%;
  padding: 3%;
  border-radius: 1%;
  background: linear-gradient(to right, #136a8a, #267871);
  opacity: .9;
  box-shadow: 2px 2px 8px black;
}

.welcome {
  font-weight: 100;
  font-size: 8em;
  opacity: 1;
  margin-bottom: 0;
  color: white;
}
p {
  margin-bottom: 7%;
  color: white;
  font-style: italic;
}
button {
margin-left: 2%;
margin-right: 2%;
}

</style>
