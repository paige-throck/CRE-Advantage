<template>
  <div class="login-wrapper border border-light">
    <form class="form-login" @submit.prevent="login">
      <h2 class="form-login-heading">Please Sign In</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <div>Don't have an Account, <router-link to="signup">Signup!</router-link></div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        msg: 'Login Page'
      }
    }
  }
</script>
