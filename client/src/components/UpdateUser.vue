<template>
<div class="update-user">
  <!-- <Nav></Nav> -->

  <div class="row">
    <div class="col-md-12">
      <sideNav></sideNav>
    </div>
  </div>



    <div class="row" v-for="person in userArr[0]">

      <div class="row">
        <div class = "col-sm-2">
        </div>
        <div class = "col-sm-8">
        <p><label>Name:</label> {{person.name}}</p>
        <p><label>Email:</label> {{person.email}}</p>
        <p><label>Current City:</label> {{person.city}}</p>




    <div class="row">
      <button v-on:click="indexEmail = !indexEmail" class="btn btn-primary" type="button">Update Email</button>


      <button class="btn btn-primary" v-on:click="indexPassword = !indexPassword">Update Password</button>

      <button type="submit" class="btn btn-primary" v-on:click="indexInfo = !indexInfo">Update Info</button>

    </div>
    <div class = "col-sm-2">
    </div>
    </div>

      <!-- Edit Email Form -->
      <div class="row" >
        <div class="col-md-3"></div>

        <div class="col-md-6 container-box">
          <div class="col">
            <div id="update-email">


              <div class="row">
                <div class="col-md-3"></div>

                <div class="col-md-6 " v-if="indexEmail">
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

            <div class="row-md-3"></div>
          </div>

        </div>
      </div>


      <!-- Update Password -->
      <div class="row" v-if="indexPassword">
        <div class="col-md-3"></div>

        <div class="col-md-6 container-box">
          <form id="update-password" @submit.prevent="updatePassword">

            <h3 class="update-account-header">Update Password</h3>

            <input type="password" v-model="newPassword.oldPassword" id="oldPassword" class="form-control" placeholder="Current Password" required autofocus>
            <br></br>

            <input type="password" v-model="newPassword.newPassword" id="newPassword" class="form-control" placeholder="New Password" required autofocus>

            <br></br>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Update Info</button>
          </form>
        </div>

        <div class="row-md-3"></div>
      </div>

    </div>

    <!-- Info Form -->
    <div class="row" v-if="indexInfo">
      <div class="col-md-3"></div>

      <div class="col-md-6 container-box">
        <form id="update-info" @submit.prevent="updateInfo">

          <h3 class="update-account-header">Update Name and City</h3>

          <input type="text" v-model="newInfo.name" placeholder="Enter a New Name" id="inputName" class="form-control" required autofocus>

          <br></br>

          <div class="row">
            <div class="col-sm-6">
              <label for="inputCity" class="sr-only">City</label>
              <input v-model="newInfo.city" placeholder="Enter a New City" type="city" id="inputCity" class="form-control" required autofocus>

            </div>
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

      <div class="row-md-3"></div>
    </div>

</div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav.vue'
import sideNav from './sideNav.vue'

export default {
  name: 'UpdateUser',
  components: {
    'Nav': Nav,
    'sideNav': sideNav,
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
      },
      indexEmail: false,
      indexInfo: false,
      indexPassword:false
    }

  },

  mounted: function() {
    this.getUser()
    this.checkSession();
  },

  methods: {
    checkSession: function() {
      let self = this;
      if (!localStorage.sessionData) {
        console.log("is it getting in here");
        self.$router.push('/login')
      }
    },
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

      let self = this;
      let id = window.localStorage.id;

      self.indexEmail = false;

      axios.patch(`http://localhost:8881/profile/email/${id}`, this.newEmail)
        .then(function(results) {
          console.log(results, 'HEY I PATCHED');
          self.newEmail.email = ""
          self.getUser();
        }).catch(function(error) {
          console.log(error, "There was an error when you tired to update your email");
        });
    },

    updateInfo() {
      let self = this;
      let id = window.localStorage.id;

      self.indexInfo = false;

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

      self.indexPassword = false;

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
/* .container-box {
  margin-top: 9%;
  padding: 3%;
  border-radius: 1%;
  background-color: white;
  opacity: .96;
  box-shadow: 2px 2px 8px black;
} */
</style>
