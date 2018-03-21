<template>
<div>
  <form @submit.prevent="addNewProperty">
    <div class="form-row">
      <div class="form-group col-md-8">
        <label for="prop-owner">Property Owner</label>
        <input type="text" class="form-control" id="prop-owner" v-model="newPropInfo.prop_owner">
      </div>
      <div class="form-group col-md-4">
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
      <div class="form-group col-md-4">
        <label for="prop-size">Property Size</label>
        <input type="text" class="form-control" id="prop-size" v-model="newPropInfo.prop_size">


      </div>
      <div class="form-group col-md-4">
        <label for="prop-range">Property Range</label>
        <input type="text" class="form-control" id="prop-range" v-model="newPropInfo.prop_range">

      </div>
      <div class="form-group col-md-4">
        <label for="num-suites">Number of Suites</label>
        <input type="text" class="form-control" id="suite-num" v-model="newPropInfo.num_suites">


      </div>
    </div>
    <div class="form-group col-md-12">
      <label for="propStreetAddress">Street Address</label>
      <input type="text" class="form-control" id="propStreetAddress" v-model="newPropInfo.streetAddress">


    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="propCity">City</label>
        <input type="text" class="form-control" id="propCity" v-model="newPropInfo.city">

      </div>
      <div class="form-group col-md-4">
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
      <div class="form-group col-md-2">
        <label for="propZip">Zip</label>
        <input type="text" class="form-control" id="propZip" v-model="newPropInfo.zip">


      </div>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="prospective-prop" v-model="newPropInfo.prospective_prop">


        <label class="form-check-label" for="prospective-prop">
          Prospective Property
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewPropertyForm',
  props: ['propTypes', 'states'],
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
        prospective_prop: ''
      }
    }
  },
  methods: {
    addNewProperty: function() {
      this.$emit('addNewProperty', this.newPropInfo)
    },
  }
}
</script>

<style>
</style>
