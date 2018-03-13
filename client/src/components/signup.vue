<template>
  <div class="login-wrapper border border-light">
    <form class="form-signup" @submit.prevent="signup">
      <h2 class="form-signup-heading">Please Create an Account</h2>

      <label for="inputName" class="sr-only">Full Name</label>
      <input v-model="name" type="name" id="inputName" class="form-control" placeholder="Full Name" required autofocus>

      <label for="inputEmail1" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail1" class="form-control" placeholder="Email address" required autofocus>

      <label for="inputEmail2" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail2" class="form-control" placeholder="Confirm Email address" required autofocus>

      <label for="inputPassword1" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword1" class="form-control" placeholder="Password" required>

      <label for="inputPassword2" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword2" class="form-control" placeholder="Confirm Password" required>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Create account</button>
    </form>
    <div>Already have an account? <router-link to="login">Login!</router-link></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup'
}
</script>
