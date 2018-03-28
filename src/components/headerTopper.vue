<template>
<div class="header">
  <div class="row">

    <div class="col-sm-12">
      <h1>CRE <span class="advantage">Advantage</span></h1>
      <p class="theDate">{{ today }}</p>
    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'headerTopper',
  data() {
    return {
      msg:window.localStorage.name,
      today: ''
    }
  },
  mounted: function () {
    let date = new Date ()
      this.today = moment(date).format("dddd, MMM DD");

  }
}
</script>

<style scoped>
.row {
  height: 10%;
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0;
  z-index: 1;
}

h1 {
  font-family: 'Fira Sans Condensed', sans-serif;
  color: white;
  font-weight: 300;
  font-size: 4vh;
  position: fixed;
}
.advantage {
  font-weight: 200;
  font-style: italic;
}
.theDate {
  position: fixed;
  top: 3%;
  right: 12%;
  color: white;
  font-size: 3vh;
  font-weight: 200;
}




</style>
