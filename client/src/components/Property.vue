<template>
<div class = "row property">
  <Nav></Nav>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 offset-sm-4 text-left">
        <h3>{{ property[0].address }}</h3>
        <p>Property Owner: {{ property[0].prop_owner}}</p>
        <p>Property Size: {{ property[0].prop_size}}</p>
        <p>Type: {{ property[0].prop_type}}</p>
        <p>Suites: {{ property[0].num_suites}}</p>
      </div>
      <div class="col-sm-6 rightCol">
        <p>HEY! I'm where the map would be.</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- PROPERTY MENU BUTTONS -->
        <p>
          <a class="btn btn-primary" data-toggle="collapse" href="#suites" role="button" aria-expanded="false" aria-controls="suites">Suites</a>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#notes" aria-expanded="false" aria-controls="notes">Notes</button>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#documents" aria-expanded="false" aria-controls="documents">Documents</button>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#edit-property" aria-expanded="false" aria-controls="edit-property">Edit Property</button>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#delete-property" aria-expanded="false" aria-controls="delete-property">Delete Property</button>
        </p>
          <!-- SUITES -->
        <div class="row">
          <div class="col">
            <div class="collapse multi-collapse" id="suites">
              <div class="card card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Suite Number</th>
                      <th scope="col">Suite Size</th>
                      <th scope="col">Tenant</th>
                      <th scope="col">Rental Rate</th>
                      <th scope="col">Lease Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="suite in suites[0]">
                      <th scope="row">{{ suite.suite_num}}</th>
                      <td>{{ suite.suite_size }}</td>
                      <td>{{ suite.tenant }}</td>
                      <td>{{ suite.rental_rate }}</td>
                      <td>{{ suite.lease_date }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="collapse multi-collapse text-left" id="notes">
              <div class="card card-body">
                <ul v-for="note in notes[0]">
                  <li>{{ note }}</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- EDIT PROPERTY FORM -->
          <div class="col">
            <div class="collapse multi-collapse" id="edit-property">
              <div class="card card-body">
                <form @submit.prevent="formatEditedProperty">
                  <div class="form-row">
                    <div class="form-group col-md-8">
                      <label for="prop-owner">Property Owner</label>
                      <input
                        type="text"
                        class="form-control"
                        id="prop-owner"
                        :placeholder="property[0].prop_owner" v-model="editedPropInfo.prop_owner">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-type">Property Type</label>
                      <select
                        id="prop-type"
                        class="form-control"
                        v-model="editedPropInfo.prop_type">
                        <option selected value="">{{ property[0].prop_type }}</option>
                        <option
                          v-for="type in propTypes"
                          v-if="type !== property[0].prop_type"
                          :value="type">
                            {{ type }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="prop-size">Property Size</label>
                      <input
                        type="text"
                        class="form-control"
                        id="prop-size"
                        :placeholder="property[0].prop_size" v-model="editedPropInfo.prop_size">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-range">Property Range</label>
                      <input
                        type="text"
                        class="form-control"
                        id="prop-range"
                        :placeholder="property[0].prop_range" v-model="editedPropInfo.prop_range">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="num-suites">Number of Suites</label>
                      <input
                        type="text"
                        class="form-control"
                        id="suite-num"
                        :placeholder="property[0].num_suites" v-model="editedPropInfo.num_suites">
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="propStreetAddress">Street Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="propStreetAddress"
                      :placeholder="propStreetAddress" v-model="editedPropInfo.streetAddress">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="propCity">City</label>
                      <input
                        type="text"
                        class="form-control"
                        id="propCity"
                        :placeholder="propCity"
                        v-model="editedPropInfo.city">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-state">State</label>
                      <select
                        id="prop-state"
                        class="form-control"
                        v-model="editedPropInfo.state">
                        <option selected value="">{{ propState }}</option>
                        <option
                          v-for="state in states"
                          :value="state">
                            {{ state }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="propZip">Zip</label>
                      <input
                        type="text"
                        class="form-control"
                        id="propZip"
                        :placeholder="propZip"
                        v-model="editedPropInfo.zip">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="prospective-prop"
                        value=""
                        v-model="editedPropInfo.prospective_prop">
                      <label class="form-check-label" for="prospective-prop">
                        Prospective Property {{ editedPropInfo.prospective_prop }}
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
          <!-- DOCUMENTS -->
          <div class="col">
            <div class="collapse multi-collapse" id="documents">
              <div class="card card-body">
                <p>Hey I'm really cool documents.</p>
                <p>BTW you're awesome for rockin the AWS</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="collapse multi-collapse" id="delete-property">
              <div class="card card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  },
  data() {
    return {
      property: [],
      suites: [],
      notes: [],
      propTypes: ["Retail", "Office", "Industrial"],
      propStreetAddress: "",
      propCity: "",
      propState: "",
      propZip: "",
      states: [ "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"],
      editedPropInfo: {
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        prop_owner: "",
        prop_size: "",
        prospective_prop: "",
        prop_type: "",
        prop_range: "",
        num_suites: ""
      },
      editedData: {}
    }
  },
  created: function() {
    this.getPropertyData()
  },
  methods: {
    getPropertyData: function() {
      let self = this
      let prop_id = this.$route.params.id
      let user_id = window.localStorage.id
      axios.get(`http://localhost:8881/properties/${user_id}/${prop_id}`)
        .then(function(result) {
          self.property.push(result.data[0][0])
          self.suites.push(result.data[1])
          self.notes.push(result.data[2][0].notes)
          self.splitAddress()
        })
        .catch(function(error) {
          console.log(error, 'ERROR WARNING');
        })
    },
    splitAddress: function () {
      // split address to go into individual form fields
      let self = this
      let splitAddress = self.property[0].address.split(',')
      let splitStateZip = splitAddress[2].split(' ')
      self.propStreetAddress = splitAddress[0]
      self.propCity = splitAddress[1]
      self.propState = splitStateZip[1]
      self.propZip = splitStateZip[2]
    },
    formatEditedProperty: function () {
      // prepare edited values for database
      let self = this
      let editedPropInfoKeys = Object.keys(this.editedPropInfo)
      console.log(self.editedData, 'edited data in formatted');
      // loop through editedPropInfo and check to see if there are changed values...if values then add to new object to send to database
      for (let i = 0; i < editedPropInfoKeys.length; i++) {
        if (self.editedPropInfo[editedPropInfoKeys[i]].length > 0) {
          self.editedData[editedPropInfoKeys[i]] = self.editedPropInfo[editedPropInfoKeys[i]]
        }
      }
      // loop through new object and check to see if any part of the address has changed...if it has call the format address function
      let editedDataKeys = Object.keys(self.editedData)
      if (editedDataKeys.includes('streetAddress') ||
          editedDataKeys.includes('city') ||
          editedDataKeys.includes('state') ||
          editedDataKeys.includes('zip')) {
            self.formatAddress()
          } else {
            self.savePropertyEdits()
          }
    },
    formatAddress: function () {
      // join edited individual address components to insert into database
      if (!this.editedData.streetAddress) {
        this.editedData.streetAddress = this.propStreetAddress
      }
      if (!this.editedData.city) {
        this.editedData.city = this.propCity
      }
      if (!this.editedData.state) {
        this.editedData.state = this.propState
      }
      if (!this.editedData.zip) {
        this.editedData.zip = this.propZip
      }
      this.editedData.address = this.editedData.streetAddress + ', ' + this.editedData.city + ', ' + this.editedData.state + ' ' + this.editedData.zip
      // delete unnecessary address keys in object being sent to database
      delete this.editedData.streetAddress
      delete this.editedData.city
      delete this.editedData.state
      delete this.editedData.zip
      this.savePropertyEdits()
    },
    savePropertyEdits: function () {
      // save edited property to database
      let self = this
      let prop_id = this.$route.params.id
      let user_id = window.localStorage.id
      console.log(self.editedData, 'DATA BEFORE IT IS SENT');
      axios.patch(`http://localhost:8881/properties/${user_id}/${prop_id}`, self.editedData)
        .then(function(result) {
          console.log(result, 'HEY I PATCHED');
        })
        .catch(function(error) {
          console.log(error, 'YOU HAD AN ERROR WHEN TRYING TO UPDATE A PROPERTY IN THE SAVE PROPERTY EDIT FUNCTION');
        })
    }
  },
  watch: {
    '$route' () {
      this.property = []
      this.suites = []
      this.notes = []
      this.getPropertyData()
    }
  }
}
</script>


<style scoped>
.property{
  margin:5%;
}

</style>
