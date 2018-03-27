<template>
<div class="login">


  <div class="row">
    <div class="col-sm-12">
      <headerTopper></headerTopper>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-3"></div>

    <div class="col-sm-6 container-box">


      <form class="form-login" @submit.prevent="login">
        <h2 class="form-login-heading text-center">Login</h2>

        <div class="form-row">
          <div class="col-sm-12">
            <label for="inputEmail">Email</label>
            <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
          </div>
        </div>
        <div class="form-row">
          <div class="col-sm-12">
            <label for="inputPassword">Password</label>
            <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
          </div>
        </div>

        <div class="text-center">
          <button class="btn btn-lg btn-info" type="submit">Login</button>
        </div>
      </form>

      <p class="text-center">Don't have an Account?
        <router-link to="signup">Signup</router-link>
      </p>
    </div>

    <div class="row-sm-3"></div>
  </div>
</div>


</template>

<script>
import axios from 'axios';
import headerTopper from './headerTopper'

export default {
  name: 'Login',
  components: {
    headerTopper
  },
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
          console.log(response);
          if (response.data === "no account with that email"){
            alert("Incorrect Email")
            self.$router.push('/login')

          } else {
            self.user.email = ""
            self.user.password = ""
            self.$router.push('/profile')
            localStorage.setItem('sessionData', response.data.session);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('id', response.data.id);
          }

        }).catch(function(error) {
          self.$router.push('/login')
          console.log(error, 'Login Error');
        });
    }
  }
}
</script>

<style scoped>
.login {
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../img/bigcity.jpg");
}

.container-box {
  margin-top: 9%;
  padding: 3%;
  border-radius: 1%;
  background-color: white;
  opacity: .96;
  box-shadow: 2px 2px 8px black;
}

button {
  margin-top: 6%;
  margin-bottom: 5%;

}

h2 {
  color: #136a8a;
  margin-bottom: 3%;
  margin-top: 0;
}

label {
  font-weight: 500;
  margin-top: 3%;
}
</style>
