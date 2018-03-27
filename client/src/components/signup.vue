<template>
<div class="signup">

  <div class="home">
    <div class="row">
      <div class="col-sm-12">
        <headerTopper></headerTopper>
      </div>
    </div>


    <div class="row signup-top">
      <div class="col-sm-3"></div>

      <div class="col-sm-6 container-box">

        <form class="form-signup" @submit.prevent="signup">
          <h2 class="form-signup-heading text-center">Create an Account</h2>

          <div class="form-row">
            <div class="col-sm-12">
              <label for="inputName">Name</label>
              <input v-model="user.name" type="name" id="inputName" class="form-control" placeholder="Full Name" required autofocus>
            </div>
          </div>

          <div class="form-row">
            <div class="col-sm-6">
              <label for="inputCity">City</label>
              <input v-model="user.city" type="city" id="inputCity" class="form-control" placeholder="City of business" required autofocus>
            </div>


            <div class="col-sm-6">
              <label for="state">State</label>
              <select name="state" id="state" class="form-control" v-model="user.state">
        <option value = "" selected="selected">Select State</option>
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


          <div class="form-row">
            <div class="col-sm-12">
              <label for="inputEmail">Email</label>
              <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email Address" required autofocus>
            </div>
          </div>

          <div class="form-row">
            <div class="col-sm-12">
              <label for="inputPassword">Password</label>
              <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            </div>
          </div>

          <div class="text-center">
          <button class="btn btn-lg btn-info" type="submit">Create account</button>
        </div>
        </form>

        <p class="text-center">Already have an account?
          <router-link to="login">Login</router-link>
        </p>

      </div>

      <div class="row-sm-3"></div>
    </div>
  </div>

</div>


</template>

<script>
import axios from 'axios';
import headerTopper from './headerTopper'


export default {
  name: 'Signup',
  components: {
    headerTopper
  },
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
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../img/bigcity.jpg");
}
.signup-top{
  margin-top: 1%;
}

.form-signup-heading{
  padding-top: 3%;
}
.container-box {
  margin-top: 10%;
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
