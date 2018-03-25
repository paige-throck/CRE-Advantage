<template>
<div class="sideNav">

  <!-- <div class="panel panel-default">
  <div class="panel-body advantage"><h1>CRE Advantage</h1></div>
  </div> -->

    <div class ="row2">
      <br></br>
      <br></br>
      <center><i class="material-icons"style="font-size:8vh">home</i></center>

    <center><i class="material-icons" style="font-size:8vh">add_location</i></center>

    <center><i class="material-icons" style="font-size:8vh">location_city</i></center>

    <center><i class="material-icons" style="font-size:8vh">account_box</i></center>

    <center><i class="material-icons" style="font-size:8vh">satellite</i></center>

    <center><i class="material-icons" style="font-size:8vh">close</i></center>

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
  width: 15%;
  z-index:1;
  top: 0;
  left: 0;
  margin: auto;
  position: fixed;
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
