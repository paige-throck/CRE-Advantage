<template>
<div class="row signup">
  <div class="login-wrapper border border-light">
    <form class="form-signup" @submit.prevent="signup">
      <h2 class="form-signup-heading">Please Create an Account</h2>

      <label for="inputName" class="sr-only">Full Name</label>
      <input v-model="user.name" type="name" id="inputName" class="form-control" placeholder="Full Name" required autofocus>
      <br></br>

      <div class="row">
        <div class="col-sm-6">
          <label for="inputCity" class="sr-only">City</label>
          <input v-model="user.city" type="city" id="inputCity" class="form-control" placeholder="Please enter your city of business" required autofocus>
        </div>

    <div class="col-sm-6">
    <select name="state" id="state" class="form-control" v-model="user.state">
  <option value = "" selected="selected">Select your State</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="DC">District Of Columbia</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
  </select>
        </div>
      </div>

      <br></br>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

      <br></br>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

      <br></br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Create account</button>
    </form>

    <div>Already have an account?
      <router-link to="login">Login</router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Signup',
  data() {
    return {
      user: {
        name: '',
        city: '',
        state: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {

    signup() {
      let self = this
      axios.post('http://localhost:8881/signup/', this.user)
        .then(function(user) {
          self.$router.push('/login')
        }).catch(function(error) {
          console.log(error);
        });
    }

  }
}
</script>

<style scoped>
.signup {
  margin: 5%;
}
</style>
