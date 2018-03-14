<template>
  <div class="profile">
    <div class="wrapper">
        <nav id="sidebar">
            <!-- Sidebar Header -->
            <div class="sidebar-header">
                <h3>Collapsible Sidebar</h3>
            </div>

            <!-- Sidebar Links -->
            <ul class="list-unstyled components">
                <li><!-- Link with dropdown items -->
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Properties</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li><a href="#">Page</a></li>
                        <li><a href="#">Page</a></li>
                        <li><a href="#">Page</a></li>
                    </ul>

                <li><a href="#">Map</a></li>
                <li><a href="#">Tasks</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
      </div>
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
