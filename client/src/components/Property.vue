<template>
<div class="row property">
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
        <SmallMap :property="property"></SmallMap>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- PROPERTY MENU BUTTONS -->
        <p>
          <a class="btn btn-primary" data-toggle="collapse" href="#suites" role="button" aria-expanded="false" aria-controls="suites">Suites</a>

          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#notes" aria-expanded="false" aria-controls="notes">Notes</button>

          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#documents" aria-expanded="false" aria-controls="documents">Documents</button>

          <button class="btn btn-primary" type="button" @click="showEditPropertyForm = ! showEditPropertyForm">Edit Property</button>

          <button class="btn btn-primary" type="button" @click="deleteProperty">Delete Property</button>

          <button class="btn btn-primary" type="button" @click="showNewPropertyForm = !showNewPropertyForm">New Property</button>
        </p>


        <NewPropertyForm v-if="showNewPropertyForm" v-on:addNewProperty="addProperty($event)" :propTypes="propTypes" :states="states"></NewPropertyForm>



        <!-- SUITES -->
        <div class="row">

          <div class="col">
            <div class="collapse multi-collapse text-left" id="suites">

              <button class="btn btn-primary" @click="showNewSuiteForm = !showNewSuiteForm" type="button">New Suite</button>

              <NewSuiteForm v-if="showNewSuiteForm" v-on:addNewSuite="addSuite($event)"></NewSuiteForm>


              <div class="card card-body">

                <div v-for="(suite, index) in suites[0]">
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

                      <tr>
                        <th scope="row">{{ suite.suite_num}}</th>
                        <td>{{ suite.suite_size }}</td>
                        <td>{{ suite.tenant }}</td>
                        <td>{{ suite.rental_rate }}</td>
                        <td>{{ suite.lease_date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <span class="pull-right">
            <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil"
              v-on:click="editSuiteClick(index)"></span></button>

                    <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
              v-on:click="deleteSuiteClick(index)"></span></button>
                    </span>
                  </div>



                  <!-- EDIT SUITE FORM -->


                  <div class="card card-body suiteEditFormMargin">
                    <form @submit.prevent="editSuite" v-if="index == activeSuiteItem && showEditSuiteForm" id="editSuite">
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="suite-num">Suite Number</label>
                          <input type="text" class="form-control" id="suite-num" :placeholder="suite.suite_num" v-model="editedSuiteInfo.suite_num">
                        </div>

                        <div class="form-group col-md-6">
                          <label for="lease-date">Lease Date</label>
                          <input type="text" class="form-control" id="lease-date" :placeholder="suite.lease_date" v-model="editedSuiteInfo.lease_date">
                        </div>

                      </div>
                      <div class="form-group col-md-12">
                        <label for="tenant">Tenant</label>
                        <input type="text" class="form-control" id="tenant" :placeholder="suite.tenant" v-model="editedSuiteInfo.tenant">
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="suite-size">Suite Size</label>
                          <input type="text" class="form-control" id="suite-size" :placeholder="suite.suite_size" v-model="editedSuiteInfo.suite_size">


                        </div>
                        <div class="form-group col-md-6">
                          <label for="rental-rate">Rental Rate</label>
                          <input type="text" class="form-control" id="rental-rate" :placeholder="suite.rental_rate" v-model="editedSuiteInfo.rental_rate">

                        </div>

                      </div>

                      <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>

            </div>

            <!-- </div>
            </div> -->
          </div>





          <!-- NOTES -->

          <div class="col">
            <div class="collapse multi-collapse text-left" id="notes">
              <div class="card card-body">
                <form class="form-tasks" @submit.prevent="addNote">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="newNote.content" placeholder="Add a note" required autofocus>
                    <div></div>

                    <span class="input-group-btn">
                <button class="btn btn-default" type="submit"><span
                  class="glyphicon glyphicon-plus"></span> Add Note</button>
                    </span>
                  </div>
                </form>

                <!-- :class="{active: index === activeItem}" -->
                <ul class="list-group" v-for="(note, index) in notes.content[0]">
                  <li class="list-group-item clearfix">
                    <p class="lead">{{ note }}</p>
                    <div>
                      <span class="pull-right">
                <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil"
                  v-on:click="editNoteClick(index)"></span></button>

                      <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
                  v-on:click="deleteNoteClick(index)"></span></button>
                      </span>
                    </div>
                  </li>

                  <!-- EDITNOTE FORM -->

                  <form class="form-tasks" @submit.prevent="editNoteFunction" v-if="index == activeItem && showEditNoteForm" id="editnotetest">
                    <div class="input-group">
                      <input type="text" class="form-control editInput" :value="note" required autofocus id="editNoteText">
                      <div></div>

                      <span class="input-group-btn">
                     <button class="btn btn-default" type="submit"><span
                       class="glyphicon glyphicon-plus"></span>Save Changes</button>
                      </span>
                    </div>
                  </form>
                </ul>


              </div>
            </div>
          </div>
          <!-- EDIT PROPERTY FORM -->
          <div class="col">
            <div v-if="showEditPropertyForm" id="edit-property">
              <div class="card card-body">
                <form @submit.prevent="formatEditedProperty">
                  <div class="form-row">
                    <div class="form-group col-md-8">
                      <label for="prop-owner">Property Owner</label>
                      <input type="text" class="form-control" id="prop-owner" :placeholder="property[0].prop_owner" v-model="editedPropInfo.prop_owner">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-type">Property Type</label>
                      <select id="prop-type" class="form-control" v-model="editedPropInfo.prop_type">

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
                      <input type="text" class="form-control" id="prop-size" :placeholder="property[0].prop_size" v-model="editedPropInfo.prop_size">


                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-range">Property Range</label>
                      <input type="text" class="form-control" id="prop-range" :placeholder="property[0].prop_range" v-model="editedPropInfo.prop_range">

                    </div>
                    <div class="form-group col-md-4">
                      <label for="num-suites">Number of Suites</label>
                      <input type="text" class="form-control" id="suite-num" :placeholder="property[0].num_suites" v-model="editedPropInfo.num_suites">


                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="propStreetAddress">Street Address</label>
                    <input type="text" class="form-control" id="propStreetAddress" :placeholder="propStreetAddress" v-model="editedPropInfo.streetAddress">


                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="propCity">City</label>
                      <input type="text" class="form-control" id="propCity" :placeholder="propCity" v-model="editedPropInfo.city">

                    </div>
                    <div class="form-group col-md-4">
                      <label for="prop-state">State</label>

                      <select id="prop-state" class="form-control" v-model="editedPropInfo.state">
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
                      <input type="text" class="form-control" id="propZip" :placeholder="propZip" v-model="editedPropInfo.zip">


                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="prospective-prop" :value="editedPropInfo.prospective_prop" v-model="editedPropInfo.prospective_prop">


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
</div>
</template>



<script>
import axios from 'axios';
import Nav from './Nav.vue'
import SmallMap from './SmallMap.vue'
import NewSuiteForm from './NewSuiteForm.vue'
import NewPropertyForm from './NewPropertyForm.vue'
// import router from '../router';


export default {
  name: 'Property',
  components: {
    'Nav': Nav,
    'SmallMap': SmallMap,
    'NewSuiteForm': NewSuiteForm,
    'NewPropertyForm': NewPropertyForm
  },
  data() {
    return {
      property: [],
      suites: [],
      notes: {
        content: [],
        id: ""
      },
      propTypes: ["Retail", "Office", "Industrial"],
      propStreetAddress: "",
      propCity: "",
      propState: "",
      propZip: "",
      states: ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA",
        "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"
      ],
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
      editedData: {},
      newNote: {
        content: ""
      },
      showEditNoteForm: false,
      activeItem: -1,
      activeSuiteItem: -1,
      showEditSuiteForm: false,
      editedSuiteInfo: {
        suite_num: '',
        tenant: '',
        lease_date: '',
        suite_size: '',
        rental_rate: ''
      },
      showNewSuiteForm: false,
      showNewPropertyForm: false,
      showEditPropertyForm: false
    }
  },
  created: function() {
    console.log('wtf');
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
          self.notes.content.push(result.data[2][0].notes)
          self.notes.id = result.data[2][0].id

          self.splitAddress()
          self.editedPropInfo.prospective_prop = self.property[0].prospective_prop

        })
        .catch(function(error) {
          console.log(error, 'ERROR WARNING');
        })
    },
    splitAddress: function() {
      // split address to go into individual form fields
      let self = this
      let splitAddress = self.property[0].address.split(',')
      let splitStateZip = splitAddress[2].split(' ')
      self.propStreetAddress = splitAddress[0]
      self.propCity = splitAddress[1]
      self.propState = splitStateZip[1]
      self.propZip = splitStateZip[2]
    },
    formatEditedProperty: function() {
      // prepare edited values for database
      let self = this
      let editedPropInfoKeys = Object.keys(this.editedPropInfo)

      // loop through editedPropInfo and check to see if there are changed values...if values then add to new object to send to database
      for (let i = 0; i < editedPropInfoKeys.length; i++) {
        if (self.editedPropInfo[editedPropInfoKeys[i]].length > 0) {
          self.editedData[editedPropInfoKeys[i]] = self.editedPropInfo[editedPropInfoKeys[i]]

          // update property object to reflect changes
          self.property[0][editedPropInfoKeys[i]] = self.editedPropInfo[editedPropInfoKeys[i]]
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
    formatAddress: function() {
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
    savePropertyEdits: function() {
      // save edited property to database
      let self = this
      let prop_id = this.$route.params.id
      let user_id = window.localStorage.id

      self.editedData.prospective_prop = self.editedPropInfo.prospective_prop
      console.log(self.editedData, 'EDITED DATA IN PROPERTY EDIT');
      self.showEditPropertyForm = !self.showEditPropertyForm

      // update property address on property object
      if (self.editedData.address) {
          self.property[0].address = self.editedData.address
      }



      axios.patch(`http://localhost:8881/properties/${user_id}/${prop_id}`, self.editedData)
        .then(function(result) {
          console.log('HEY');
          self.getPropertyData()
        })
        .catch(function(error) {
          console.log(error, 'YOU HAD AN ERROR WHEN TRYING TO UPDATE A PROPERTY IN THE SAVE PROPERTY EDIT FUNCTION');
        })
    },
    addNote: function() {
      let self = this
      let id = self.notes.id
      let user_id = window.localStorage.id

      axios.post(`http://localhost:8881/properties/note/${id}`, self.newNote)
        .then(function(results) {
          self.notes.content = []

          self.getPropertyData()
          self.newNote.content = ""
        })
        .catch(function(error) {
          console.log('Hey, you have an error from adding a note!');
        })
    },
    editNoteClick: function(indexClicked) {
      this.activeItem = indexClicked
      this.showEditNoteForm = !this.showEditNoteForm
    },
    editNoteFunction: function() {
      let self = this
      let id = self.notes.id
      let newNote = document.getElementById('editNoteText').value
      let editNote = {
        noteIndex: self.activeItem,
        content: newNote
      }
      self.notes.content[0][self.activeItem] = editNote.content

      axios.patch(`http://localhost:8881/properties/note/${id}`, editNote)
        .then(function(results) {
          self.activeItem = -1
          self.getPropertyData()
        })
    },
    deleteNoteClick: function(indexClicked) {
      let self = this
      let notes_id = self.notes.id
      let note_index = indexClicked

      self.notes.content[0].splice(indexClicked, 1)

      axios.delete(`http://localhost:8881/properties/note/${notes_id}/${note_index}`)
        .then(function(results) {})
        .catch(function(error) {
          console.log(error, 'HEY THERE WAS AN ERROR WHEN YOU DELETED A NOTE');
        })
    },
    editSuiteClick: function(indexClicked) {
      this.activeSuiteItem = indexClicked
      this.showEditSuiteForm = !this.showEditSuiteForm
    },
    editSuite: function() {
      let self = this
      let editedSuiteInfoKeys = Object.keys(self.editedSuiteInfo)
      let suiteId = self.suites[0][self.activeSuiteItem].id
      let editedSuiteData = {}

      for (let i = 0; i < editedSuiteInfoKeys.length; i++) {
        if (self.editedSuiteInfo[editedSuiteInfoKeys[i]].length > 0) {
          editedSuiteData[editedSuiteInfoKeys[i]] = self.editedSuiteInfo[editedSuiteInfoKeys[i]]
        } else {
          editedSuiteData[editedSuiteInfoKeys[i]] = self.suites[0][self.activeSuiteItem][editedSuiteInfoKeys[i]]
          console.log(self.suites[0][self.activeSuiteItem][editedSuiteInfoKeys[i]], 'WHAT AM I LOGGING');
        }
      }
      self.suites[0][self.activeSuiteItem] = editedSuiteData

      axios.patch(`http://localhost:8881/properties/suite/${suiteId}`, editedSuiteData)
        .then(function(results) {
          self.activeSuiteItem = -1
          self.getPropertyData()
        })
    },
    deleteSuiteClick: function(indexClicked) {
      let self = this
      let suite_id = self.suites[0][indexClicked].id

      axios.delete(`http://localhost:8881/properties/suite/${suite_id}`)
        .then(function(results) {
          //self.property[0].num_suites--
          self.suites[0].splice(indexClicked, 1)
        })
        .catch(function(error) {
          console.log(error, 'HEY THERE WAS AN ERROR WHEN YOU DELETED A NOTE');
        })
    },
    addSuite: function(event) {
      let self = this
      event.prop_id = this.property[0].id

      axios.post(`http://localhost:8881/properties/suite/new`, event)
        .then(function(results) {
          self.suites[0].push(event)
          //self.property[0].num_suites++
          self.getPropertyData()
          self.showNewSuiteForm = false;
        })
        .catch(function(error) {
          console.log(error, 'YOU HAVE AN ERROR POSTING A NEW SUITE');
        })
    },
    deleteProperty: function () {
      let prop_id = this.property[0].id

      axios.delete(`http://localhost:8881/properties/${prop_id}`)
        .then(function(results){
           router.push({ path: '/profile' })
        })
    },
    addProperty: function (event) {
     console.log(event, 'HEYYY EVENT IN ADD PROPERTY');
     event.user_id = window.localStorage.id

      axios.post(`http://localhost:8881/properties/new`, event)
        .then(function(results) {
          console.log('OMG YOU HAVE A NEW PROPERTY');

        })
    }
  },
  watch: {
    '$route' () {
      this.property = []
      this.suites = []
      this.notes = {
        content: [],
        id: ""
      }
      this.getPropertyData()
    }
  }
}
</script>


<style scoped>
.property {
  margin: 5%;
}

.editInput {
  background-color: lightyellow !important
}

.suiteEditFormMargin {
  margin-top: 50px;
}
</style>
