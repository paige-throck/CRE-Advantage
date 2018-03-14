<template>
<div class="login-wrapper border border-light">
  <form class="form-signup" @submit.prevent="signup">
    <h2 class="form-signup-heading">Please Create an Account</h2>

    <label for="inputName" class="sr-only">Full Name</label>
    <input v-model="user.name" type="name" id="inputName" class="form-control" placeholder="Full Name" required autofocus>

    <label for="inputCity" class="sr-only">City</label>
    <input v-model="user.city" type="city" id="inputCity" class="form-control" placeholder="City" required autofocus>

    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>


    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

    <button class="btn btn-lg btn-primary btn-block" type="submit">Create account</button>
  </form>

  <div>Already have an account?
    <router-link to="login">Login!</router-link>
  </div>
</div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'Signup',
  data(){
    return {
      user:{
        name: '',
        city: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {

    signup() {
      let self = this
      axios.post('http://localhost:8881/signup/', this.user)
      .then(function (user) {
        console.log('working on router');
        self.$router.push('/login')

        }).catch(function (error) {
            console.log(error);
        });
      }

    }
}
</script>
