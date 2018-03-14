<template>
  <div class="profile">
<h1>{{msg}}</h1>

  <button v-on:click="logout" class="btn btn-lg btn-primary btn-block" type="submit">Logout</button>


  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      msg: window.localStorage.name
    }
  },
  methods: {

    logout: function(){
      let self =this;
      localStorage.clear();

      self.$router.push('/login')
      console.log(window.localStorage);
    }
  }
}

console.log(window.localStorage, 'this is the session data in profile');
</script>
