<template>
<div class="row update-user">
  <Nav></Nav>
<br></br>
  <div class = "row" v-for="person in userArr[0]">
    <div class = "col-sm-2">
    </div>
    <div class = "col-sm-8">

    <p><label>Name:</label> {{person.name}}</p>
    <p><label>Email:</label> {{person.email}}</p>
    <p><label>Current City:</label> {{person.city}}</p>

    </div>
<div class = "col-sm-2">
</div>
  </div>

  <button class="btn btn-primary" type="submit" data-toggle="collapse" href="#update-email" role="button" aria-expanded="false" aria-controls="email">Update Email</button>


  <button class="btn btn-primary" type="submit" data-toggle="collapse" href="#update-password" role="button" aria-expanded="false" aria-controls="password">Update Password</button>

  <button type="submit" class="btn btn-primary" data-toggle="collapse" href="#update-info" role="button" aria-expanded="false" aria-controls="info">Update Info</button>



<!-- Email Form -->
    <form class="collapse multi-collapse" id="update-email" @submit.prevent="signup">
      <h3 class="update-account-header">Update Email</h3>


      <input type="oldPassword" id="inputEmail" class="form-control" placeholder="New Email Address" required autofocus>

      <br></br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Update Email</button>
    </form>

    <!-- Update Password -->


    <form class="collapse multi-collapse" id="update-password" @submit.prevent="signup">

      <h3 class="update-account-header">Update Password</h3>

      <input type="name" id="oldPassword" class="form-control" placeholder="Current Password" required autofocus>
      <br></br>

      <input type="city" id="newPassword" class="form-control" placeholder="New Password" required autofocus>

      <br></br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Update Info</button>
    </form>

<!-- Info Form -->
    <form class="collapse multi-collapse" id="update-info" @submit.prevent="signup">

      <h3 class="update-account-header">Update Name and City</h3>

      <input type="name" id="inputName" class="form-control" placeholder="Update name" required autofocus>
      <br></br>
      <input type="city" id="inputCity" class="form-control" placeholder="Update name" required autofocus>

      <br></br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Update Info</button>
    </form>


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
      userArr: []
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
    }
  }
}
</script>

<style scoped>
.update-user {
  margin: 5%;
}
</style>
