<template>
<div class="login">
  <div class="login-wrapper border border-light">
    <form class="form-login" @submit.prevent="login">
      <h2 class="form-login-heading">Please Sign In</h2>
      <br></br>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

      <br></br>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>


      <br></br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <div>Don't have an Account?
      <router-link to="signup">Signup</router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {

    login() {

      let self = this
      axios.post('http://localhost:8881/login/', this.user)
        .then(function(response) {
          self.user.email = ""
          self.user.password = ""
          self.$router.push('/profile')
          localStorage.setItem('sessionData', response.data.session);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('id', response.data.id);
        }).catch(function(error) {
          self.$router.push('/login')
          console.log(error, 'Login Error');
        });
    }
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../img/bigcity.jpg");
}
</style>
