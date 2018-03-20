<template>
  <div class="row update-user">
    <Nav></Nav>

    <div class="account-wrapper border border-light">
      <form class="update-account" @submit.prevent="signup">
        <h2 class="update-account-header">Update Account</h2>

        <label for="inputName" class="sr-only">Full Name</label>
        <input  type="name" id="inputName" class="form-control" placeholder="Full Name" required autofocus>
        <br></br>
        <label for="inputCity" class="sr-only">City</label>
        <input  type="city" id="inputCity" class="form-control" placeholder="City" required autofocus>
        <br></br>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input  type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

        <br></br>
        <label for="inputPassword" class="sr-only">Password</label>
        <input  type="password" id="inputPassword" class="form-control" placeholder="Password" required>

        <br></br>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Update Account</button>
      </form>
    </div>

</div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'UpdateUser',

  }


</script>

<style scoped>
.update-user{
  margin:5%;
}
</style>
