<template>
<div class="update-user">

<headerTopper></headerTopper>

<i class="material-icons notifyBell" style="font-size:4vh" @click="showNotifications = !showNotifications">notifications_none</i>

<div class="notififyBox" id="taskList" v-if="showNotifications">
        <ProTasks></ProTasks>
</div>

  <div class = "userContainer">
    <div class="row" v-for="person in userArr[0]">



      <div class="row userBox">

        <div class = "col-sm-12 user">
              <h4><label>Name:</label> {{person.name}}</h4>
              <h4><label>Email:</label> {{person.email}}</h4>
              <h4><label>Current City:</label> {{person.city}}</h4>
      </div>
    </div>

    <div class = "row buttonBox">

      <div class ="col-sm-2">
        <i class="material-icons" style="font-size:4vh" v-on:click="indexEmail = !indexEmail">mail_outline</i>
        <div>Update Email</div>
      </div>

      <div class = "col-sm-3">
      </div>

      <div class ="col-sm-2">
        <i class="material-icons" style="font-size:4vh" v-on:click="indexPassword = !indexPassword">lock_open</i>
        <div>Update Password</div>
      </div>

      <div class = "col-sm-3">
      </div>

      <div class ="col-sm-2">
        <i class="material-icons" style="font-size:4vh" v-on:click="indexInfo = !indexInfo">account_box</i>
        <div>Update Info</div>
      </div>

      </div>




<div class = "row">


      <!-- Edit Email Form -->
        <div class="col-sm-12 container-box">
            <div id="update-email">
              <div class = "row">
                <div class="col-sm-12 " v-if="indexEmail">
                  <form @submit.prevent="updateEmail">
                    <div class = "row">
                    <div class = "col-sm-8">
                      <label>
                      <h3 class="update-account-header">Update Email</h3>
                    </label>
                    </div>

                      <div class = "col-sm-3">
                      </div>

                    <div class = "col-sm-1">
                    <div class="form-row glyphicon glyphicon-remove btn editSuiteClose" @click="indexEmail = !indexEmail"></div>
                  </div>
                    </div>


                    <div class="form-group">
                      <input type="email" v-model="newEmail.email" id="inputEmail" class="form-control" placeholder="New Email Address" required autofocus>
                    </div>

                    <button type="submit" class="btn btn btn-info">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>




      <!-- Update Password -->
      <div class="col-sm-12 container-box">
          <div id="update-password">
            <div class = "row">
              <div class="col-sm-12 " v-if="indexPassword">
          <form  @submit.prevent="updatePassword">
            <div class = "row">
            <div class = "col-sm-8">
              <label>
              <h3 class="update-account-header">Update Password</h3>
            </label>
            </div>

              <div class = "col-sm-3">
              </div>

            <div class = "col-sm-1">
            <div class="form-row glyphicon glyphicon-remove btn editSuiteClose" @click="indexPassword = !indexPassword"></div>
          </div>
            </div>

            <div class = "form-group">
            <input type="password" v-model="newPassword.oldPassword" id="oldPassword" class="form-control" placeholder="Current Password" required autofocus>
          </div>

          <div class = "form-group">
            <input type="password" v-model="newPassword.newPassword" id="newPassword" class="form-control" placeholder="New Password" required autofocus>
          </div>

            <button class="btn btn-info" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>



    <!-- Update Info Form -->
    <div class="col-sm-12 container-box">
        <div id="update-info">
          <div class = "row">
            <div class="col-sm-12 " v-if="indexInfo">

        <form @submit.prevent="updateInfo">
          <div class = "row">
          <div class = "col-sm-8">
            <label>
            <h3 class="update-account-header">Update Info</h3>
          </label>
          </div>

            <div class = "col-sm-3">
            </div>

          <div class = "col-sm-1">
          <div class="form-row glyphicon glyphicon-remove btn editSuiteClose" @click="indexInfo = !indexInfo"></div>
        </div>
          </div>

          <div class = "form-group">
          <input type="text" v-model="newInfo.name" :placeholder="person.name" id="inputName" class="form-control" required autofocus>
        </div>

          <div class = "form-group">
          <div class="row">
            <div class="col-sm-6">
              <label for="inputCity" class="sr-only">City</label>
              <input v-model="newInfo.city" :placeholder="person.city" type="city" id="inputCity" class="form-control" required autofocus>

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
        </div>
          <button class="btn btn btn-info" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
  </div>
</div>


</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import headerTopper from './headerTopper.vue'

export default {
  name: 'mobileAccount',
  components: {
    'headerTopper': headerTopper,
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
          console.log(results);
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

      self.indexInfo = !self.indexInfo

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

.update-user{
  height: 100vh;
}

.userContainer{
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 8%;

}

.userBox{
  margin-top: 12%;
  margin-left:10%
}

.buttonBox{
  margin-top: 5%;
  margin-left:10%
}

.container-box{
  margin-top:2%;
  margin-right:10%;
  margin-left:10%;
}

.editSuiteClose{
  position: relative;
}

.notififyBox {
  position: fixed;
  top: 12%;
  right: 4%;
  width: 30%;
  z-index: 100;
}
.notifyBell {
  position: fixed;
  top: 2%;
  right: 6%;
  font-size: 5vh;
  color: gainsboro;
  z-index: 1;
  padding-top: 1%;
}
.notifyBell:hover {
  color: #73BEDB;
  cursor: pointer;
}

</style>
