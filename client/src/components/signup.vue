<template>
  <div class="login-wrapper border border-light">
    <form class="form-signup" @submit.prevent="signup">
      <h2 class="form-signup-heading">Please Create an Account</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Create account</button>
    </form>
    <div>Already have an account? <router-link to="login">Login!</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Signup'
}
</script>
