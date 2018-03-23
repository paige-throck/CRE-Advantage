<template>
<div class="header">
  <div class="row">
    <div class="col-md-12">
      <h1>CRE <span class="advantage">Advantage</span></h1>


      <!-- <div>
          {{msg}}
      </div> -->


    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'headerTopper',
  data() {
    return {
      msg: "Hello" + " " + window.localStorage.name
    }
  }
}
</script>

<style scoped>
.row {
  height: 10%;
  background-color: black;
  position: relative;
  top: 0;
  width: 100%;
  margin: 0;
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
