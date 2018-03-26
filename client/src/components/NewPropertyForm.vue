<template>
<div class="propForm">
  <sideNav></sideNav>

<h3 class="editPropertyFormH3">Add Property</h3>

  <form div class ="newPropForm" @submit.prevent="addNewProperty">

    <div class="form-row newPropClose" >
      <div class="glyphicon glyphicon-remove btn" @click="closeNewPropForm"></div>
    </div>

    <div class="form-row">
      <div class="form-group col-sm-8">
        <label for="prop-owner">Property Owner</label>
        <input type="text" class="form-control" id="prop-owner" v-model="newPropInfo.prop_owner">
      </div>
      <div class="form-group col-sm-4">
        <label for="prop-type">Property Type</label>
        <select id="prop-type" class="form-control" v-model="newPropInfo.prop_type">

          <option selected value="">Choose...</option>
          <option
            v-for="type in propTypes"
            :value="type">
              {{ type }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-sm-4">
        <label for="prop-size">Property Size</label>
        <input type="text" class="form-control" id="prop-size" v-model="newPropInfo.prop_size">


      </div>
      <div class="form-group col-sm-4">
        <label for="prop-range">Property Range</label>
        <input type="text" class="form-control" id="prop-range" v-model="newPropInfo.prop_range">

      </div>
      <div class="form-group col-sm-4">
        <label for="num-suites">Number of Suites</label>
        <input type="text" class="form-control" id="suite-num" v-model="newPropInfo.num_suites">


      </div>
    </div>
    <div class="form-group col-sm-12">
      <label for="propStreetAddress">Street Address</label>
      <input type="text" class="form-control" id="propStreetAddress" v-model="newPropInfo.streetAddress">


    </div>
    <div class="form-row">
      <div class="form-group col-sm-6">
        <label for="propCity">City</label>
        <input type="text" class="form-control" id="propCity" v-model="newPropInfo.city">

      </div>
      <div class="form-group col-sm-4">
        <label for="prop-state">State</label>

        <select id="prop-state" class="form-control" v-model="newPropInfo.state">
          <option selected value="">Choose...</option>
          <option
            v-for="state in states"
            :value="state">
              {{ state }}
          </option>
        </select>
      </div>
      <div class="form-group col-sm-2">
        <label for="propZip">Zip</label>
        <input type="text" class="form-control" id="propZip" v-model="newPropInfo.zip">


      </div>
    </div>
    <div class="form-group col-sm-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="prospective-prop" v-model="newPropInfo.prospective_prop">


        <label class="form-check-label" for="prospective-prop">
          Prospective Property
        </label>
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
import sideNav from './sideNav.vue'

export default {
  name: 'NewPropertyForm',
  props: ['propTypes', 'states'],
  components:{
    sideNav
  },
  data() {
    return {

      newPropInfo: {
        prop_owner: '',
        prop_type: '',
        prop_size: '',
        prop_range: '',
        num_suites: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        prospective_prop: '',
        lat: '',
        lang: '',
        address: ''
      }
    }
  },
  methods: {
    addNewProperty: function() {

      let self = this

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.newPropInfo.streetAddress}+,+${this.newPropInfo.city},+${this.newPropInfo.state}&key=AIzaSyAh3fU5DauF9fgnwi1IdF8OZccHONkPBRM`)
        .then(function(results) {

          let usa = results.data.results[0].formatted_address.split(',')
          let usaSlice = usa.slice(0, usa.length-1).join(', ')

          self.newPropInfo.lat = results.data.results[0].geometry.location.lat
          self.newPropInfo.lang = results.data.results[0].geometry.location.lng
          self.newPropInfo.address = usaSlice



          if(self.newPropInfo.prospective_prop == "") {
            self.newPropInfo.prospective_prop = false
          }
            console.log(self.newPropInfo, 'HEY ZIP');

          delete self.newPropInfo.streetAddress
          delete self.newPropInfo.city
          delete self.newPropInfo.state
          delete self.newPropInfo.zip

          self.$emit('addNewProperty', self.newPropInfo)

        })

    },
    closeNewPropForm: function () {
      this.$emit('closeNewPropForm')
    }



  }
}
</script>

<style scoped>

h3 {
  margin-top: 5%;
}

label {
  font-weight: 500;
}
button {
  margin-top: 3%;
  margin-bottom: 4%;
}
.form-check {
  /* margin-top: 3%; */
}
.newPropForm {
  margin-top: 5%;
  width: 85%;
  border: 1px solid gainsboro;
  border-radius: 2%;
}

.newPropClose {
  width: 100%;
  text-align: right;
  margin-bottom:4%;
}
.newPropClose > div:hover {
  color: #73BEDB;
}

</style>
