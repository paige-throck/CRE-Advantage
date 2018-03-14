<template>
  <div class="profile">
<h1>{{msg}}</h1>

  <button class="btn btn-lg btn-primary btn-block" type="submit">Logout</button>


  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      msg: window.localStorage.name
    }
  }
}

console.log(window.localStorage, 'this is the session data in profile');
</script>
