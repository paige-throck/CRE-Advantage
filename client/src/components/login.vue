<template>
  <div class="login-wrapper border border-light">
    <form class="form-login" @submit.prevent="login">
      <h2 class="form-login-heading">Please Sign In</h2>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>


      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>



      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <div>Don't have an Account, <router-link to="signup">Signup!</router-link></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
name: 'Login',
data () {
  return {
    user:{
      email: '',
      password: ''
    }
  }
},
methods: {

  login() {
    let self = this
    axios.post('http://localhost:8881/login/', this.user)
    .then(function (user) {
      console.log(user, "is this the session id?");
      console.log('working on router');
      self.$router.push('/')

      }).catch(function (error) {
          console.log(error);
      });
    }

    // loginSuccessful (req) {
    //   if (!req.data.token) {
    //     this.loginFailed()
    //     return
    //   }
    //
    //   localStorage.token = req.data.token
    //   this.error = false
    //
    //   this.$router.replace(this.$route.query.redirect || '/authors')
    // }
    //
    // loginFailed () {
    //   this.error = 'Login failed!'
    //   delete localStorage.token
    // }


  }
}

</script>
