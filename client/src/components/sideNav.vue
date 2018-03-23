<template>
<div class="sideNav">

  <div class = "row row2">
  </div>
  <div class="row row1">
    <div class="col-md-12">
      <h1>CRE <span class="advantage">Advantage</span></h1>
    </div>

</div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'sideNav',
  data() {
    return {

    }
  }
}
</script>

<style scoped>

.row1 {
  height: 10%;
  background-color: black;
  position: relative;
  top: 0;
  width: 100%;
  margin: 0;
  z-index: 2;

}

.row2 {
  height: 100%;
  background-color: #136a8a;
  position: relative;
  top: 0;
  left: 0;
  width: 10%;
  margin: 0;
  position: fixed;
  z-index:1;
}

h1 {
  font-family: 'Fira Sans Condensed', sans-serif;
  color: white;
  font-weight: 300;
  font-size: 100;
}
.advantage {
  font-weight: 200;
  font-style: italic;
}

</style>
