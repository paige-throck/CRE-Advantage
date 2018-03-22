<template>
<div class="row update-user">
  <Nav></Nav>
  <br></br>
  <div class="row" v-for="person in userArr[0]">
    <div class="col-sm-2">
    </div>
    <div class="col-sm-8">

      <p><label>Name:</label> {{person.name}}</p>
      <p><label>Email:</label> {{person.email}}</p>
      <p><label>Current City:</label> {{person.city}}</p>

    </div>
    <div class="col-sm-2">
    </div>


  <div class = "row">
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#update-email" aria-expanded="false" aria-controls="update-email">Update Email</button>


  <button class="btn btn-primary" type="submit" data-toggle="collapse" href="#update-password" role="button" aria-expanded="false" aria-controls="password">Update Password</button>

  <button type="submit" class="btn btn-primary" data-toggle="collapse" href="#update-info" role="button" aria-expanded="false" aria-controls="info">Update Info</button>



  <!-- Edit Email Form -->
  <div class="col">
    <div class="collapse multi-collapse" id="update-email">
      <div class="card card-body">
        <form @submit.prevent="updateEmail">
          <h3 class="update-account-header">Update Email</h3>

          <div class="form-group">
            <input type="email" v-model="newEmail.email" id="inputEmail" class="form-control" placeholder="New Email Address" required autofocus>
          </div>

          <button type="submit" class="btn btn-lg btn-primary btn-block">Update Email</button>
        </form>
      </div>
    </div>
  </div>


  <!-- Update Password -->
  <form class="collapse multi-collapse" id="update-password" @submit.prevent="updatePassword">

    <h3 class="update-account-header">Update Password</h3>

    <input type="password" v-model="newPassword.oldPassword" id="oldPassword" class="form-control" placeholder="Current Password" required autofocus>
    <br></br>

    <input type="password" v-model="newPassword.newPassword" id="newPassword" class="form-control" placeholder="New Password" required autofocus>

    <br></br>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Update Info</button>
  </form>

  <!-- Info Form -->
  <form class="collapse multi-collapse" id="update-info" @submit.prevent="updateInfo">

    <h3 class="update-account-header">Update Name and City</h3>

    <input type="text" v-model="newInfo.name" placeholder="Enter a New Name" id="inputName" class="form-control" required autofocus>

    <br></br>

    <div class="row">
      <div class="col-sm-6">
        <label for="inputCity" class="sr-only">City</label>
        <input v-model="newInfo.city"
        placeholder="Enter a New City"
         type="city" id="inputCity" class="form-control" required autofocus>
      </div>
      <br></br>
      <div class="col-sm-6">
        <select id="state" class="form-control" v-model="newInfo.state">
  <option value="" selected="selected">Select a State</option>
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
    <button class="btn btn-lg btn-primary btn-block" type="submit">Update Info</button>
  </form>

</div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav.vue'

export default {
  name: 'UpdateUser',
  components: {
    'Nav': Nav,

  },
  data() {
    return {
      userArr: [],
      newEmail: {
        email: ''
      },
      newPassword: {
        oldPassword: '',
        newPassword: ''
      },
      newInfo: {
        name: '',
        city: '',
        state: ''
      }
    }
  },

  mounted: function() {
    this.getUser()
  },

  methods: {
    getUser() {
      let id = window.localStorage.id
      let self = this
      axios.get(`http://localhost:8881/profile/${id}`)
        .then(function(results) {
          self.userArr = [];
          self.userArr.push(results.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateEmail() {
      console.log(this.newEmail);
      let self = this;
      let id = window.localStorage.id;

      axios.patch(`http://localhost:8881/profile/${id}/email`, this.newEmail)
        .then(function(results) {
          console.log(results, 'HEY I PATCHED');
          self.newEmail.email = ""
          self.getUser();
        }).catch(function(error) {
          console.log(error, "There was an error when you tired to update your email");
        });
    },

    updateInfo() {
      console.log(this.newInfo);
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/profile/${id}/info`, this.newInfo)
        .then(function() {
          self.newInfo.name = ""
          self.newInfo.city = ""
          self.newInfo.state = ""
          self.getUser();
        }).catch(function(error) {
          console.log(error);
        });

    },

    updatePassword() {
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/profile/${id}/password`, this.newPassword)
        .then(function(response) {
          console.log(response, "nckadsbnfckwqjdanscjkdsm");
          localStorage.clear();
          self.$router.push('/login')
          // self.getUser();
          // localStorage.clear();

        }).catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.update-user {
  margin: 5%;
}
</style>
