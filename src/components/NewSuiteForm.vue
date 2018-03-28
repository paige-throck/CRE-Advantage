<template>

<div class="newSuiteForm">



    <h3>Add Suite</h3>

<form @submit.prevent="addNewSuite" id="newSuiteForm">

    <div class="form-row newSuiteClose" >
      <div class="glyphicon glyphicon-remove btn" @click="closeNewSuiteForm"></div>
    </div>


  <div class="form-row">
    <div class="form-group col-sm-6">
      <label for="suite-num">Suite Number</label>
      <input type="text" class="form-control" id="suite-num" v-model="newSuiteInfo.suite_num">
    </div>

    <div class="form-group col-sm-6">
      <label for="lease-date">Lease Date</label>
      <input type="text" class="form-control" id="lease-date" v-model="newSuiteInfo.lease_date">
    </div>

  </div>
  <div class="form-group col-sm-12">
    <label for="tenant">Tenant</label>
    <input type="text" class="form-control" id="tenant" v-model="newSuiteInfo.tenant">
  </div>
  <div class="form-row">
    <div class="form-group col-sm-6">
      <label for="suite-size">Suite Size</label>
      <input type="text" class="form-control" id="suite-size"  v-model="newSuiteInfo.suite_size">


    </div>
    <div class="form-group col-sm-6">
      <label for="rental-rate">Rental Rate</label>
      <input type="text" class="form-control" id="rental-rate"  v-model="newSuiteInfo.rental_rate">

    </div>

  </div>
  <div class="text-center">
  <button type="submit" class="btn btn-info">Submit</button>
</div>
</form>
</div>

</template>


<script>

import axios from 'axios';

export default {
  name: 'NewSuiteForm',

  data() {
    return {

    newSuiteInfo: {
      suite_num: '',
      suite_size: '',
      tenant: '',
      rental_rate: '',
      lease_date: ''
    }
    }
  },
  methods: {
    addNewSuite: function() {
      this.$emit('addNewSuite', this.newSuiteInfo)
    },
    closeNewSuiteForm: function() {
      this.$emit('closeNewSuiteForm')
    }
  }
}



</script>

<style scoped>

.newSuiteForm {
  margin-top:5%;
}
form {
  width: 85%;
  margin-top: 5%;
  border: 1px solid gainsboro;
  border-radius: 2%;
}

button {
  margin-top: 5%;
  margin-bottom: 5%;
}

.newSuiteClose {
  width: 100%;
  text-align: right;
  margin-bottom:4%;
}
.newSuiteClose > div:hover {
  color: #73BEDB;
}


</style>
