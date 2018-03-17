<template>

<div>

<div>
<p>Property working???</p>
<router-link to="/profile">You suck</router-link>
</div>

</div>

</template>


<script>
import axios from 'axios';
import Nav from './Nav.vue'

export default {
  name: 'Property',
  components: {
    'Nav': Nav
  }
}

</script>


<style>
/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
}

.pageContainer {
  margin: 100px;
}
</style>
