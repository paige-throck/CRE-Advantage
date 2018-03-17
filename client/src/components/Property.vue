<template>
<div class="row property">
<Nav></Nav>

<div class = "row propertyContent">
  <p>Testing property spacing</p>
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

</style>
