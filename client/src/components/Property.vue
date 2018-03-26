<template>
<div class="property">

  <!-- <Nav v-on:getPropertyData="updateProperties($event)"></Nav> -->

  <div class="row nav">
    <div class="col-sm-12">
      <sideNav></sideNav>
    </div>
  </div>

  <div class="notififyBox" id="taskList" v-if="showNotifications">
          <ProTasks></ProTasks>
  </div>


  <!-- ============= nav buttons =====================-->

  <div class="row text-center buttonRow">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      <div class="btn-group" role="group" aria-label="Property Nav">

        <button type="button" class="btn btn-light" data-toggle="collapse" href="#suites" role="button" aria-expanded="false" aria-controls="suites" @click="showSuites = !showSuites">
          <i class="material-icons md-48">view_module</i>
          <p>Suites</p>
        </button>



        <button type="button" class="btn btn-light" data-toggle="collapse" href="#newSuites" role="button" aria-expanded="false" aria-controls="newSuites" @click="showNewSuiteForm = !showNewSuiteForm">
          <i class="material-icons md-48">add_box</i>
          <p>New Suite</p>
        </button>

        <button type="button" class="btn btn btn-light"  @click="showNotes = !showNotes">
          <i class="material-icons md-48">note</i>
          <p>Notes</p>
        </button>

        <button type="button" class="btn btn btn-light" @click="showNewNotes = !showNewNotes">
          <i class="material-icons md-48">add_circle_outline</i>
          <p>New Note</p>
        </button>

        <button type="button" class="btn btn-light" @click="showEditPropertyForm = ! showEditPropertyForm">
          <i class="material-icons md-48">mode_edit</i>
          <p>Edit Property</p>
        </button>

        <button type="button" class="btn btn-light" @click="showNewPropertyForm = !showNewPropertyForm">
        <i class="material-icons md-48">add</i>
        <p>New Property</p>
      </button>

        <button type="button" class="btn btn-light" @click="deleteProperty">
          <i class="material-icons md-48">clear</i>
          <p>Delete Property</p>
        </button>
      </div>
    </div>
  </div>


  <!-- ============= left map column =====================-->

  <div class="row mainContent">
    <div class="col-md-1 hiddenColumn"></div>
    <div class="col-md-3 text-left mapColumn">

      <SmallMap :property="property" class="centerMap"></SmallMap>

      <h3>{{ propStreetAddress }}</h3>
      <h3> {{ propCity}}, {{ propState}} {{ propZip }}</h3>
      <div class="propInfo">
      <p><span class="propHeader">Property Owner:</span> {{ property[0].prop_owner}}</p>
      <p><span class="propHeader">Property Size:</span> {{ property[0].prop_size}}</p>
      <p><span class="propHeader">Type:</span> {{ property[0].prop_type}}</p>
      <p><span class="propHeader">Suites:</span> {{ property[0].num_suites}}</p>
    </div>
  </div>
    <div class="col-md-8 rightCol">





      <NewPropertyForm v-if="showNewPropertyForm"  v-on:addNewProperty="addProperty($event)" v-on:closeNewPropForm="closeNewPropForm($event)" :propTypes="propTypes" :states="states" ></NewPropertyForm>



      <!-- ============= suites =====================-->

      <NewSuiteForm v-if="showNewSuiteForm" id="newSuites" v-on:addNewSuite="addSuite($event)" v-on:closeNewSuiteForm="closeNewSuiteForm($event)"> </NewSuiteForm>


      <div class="row">



        <!-- EDIT SUITE FORM -->


        <div class="card card-body suiteEditFormMargin">

          <form @submit.prevent="editSuite" v-if="showEditSuiteForm" id="editSuite">

                <div class="form-row glyphicon glyphicon-remove btn editSuiteClose" @click="showEditSuiteForm = !showEditSuiteForm"></div>

            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="suite-num">Suite Number</label>
                <input type="text" class="form-control" id="suite-num" :placeholder="activeSuiteItem[0].suite_num" v-model="editedSuiteInfo.suite_num">
              </div>

              <div class="form-group col-sm-6">
                <label for="lease-date">Lease Date</label>
                <input type="text" class="form-control" id="lease-date" :placeholder="activeSuiteItem[0].lease_date" v-model="editedSuiteInfo.lease_date">
              </div>

            </div>
            <div class="form-group col-sm-12">
              <label for="tenant">Tenant</label>
              <input type="text" class="form-control" id="tenant" :placeholder="activeSuiteItem[0].tenant" v-model="editedSuiteInfo.tenant">
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="suite-size">Suite Size</label>
                <input type="text" class="form-control" id="suite-size" :placeholder="activeSuiteItem[0].suite_size" v-model="editedSuiteInfo.suite_size">


              </div>
              <div class="form-group col-sm-6">
                <label for="rental-rate">Rental Rate</label>
                <input type="text" class="form-control" id="rental-rate" :placeholder="activeSuiteItem[0].rental_rate" v-model="editedSuiteInfo.rental_rate">

              </div>

            </div>
            <div class="text-center editSuiteButton">
            <button type="submit" class="btn btn-info">Save Changes</button>
          </div>
          </form>
        </div>





<!-- ============= suites =====================-->


        <div class="col">
          <div class=" text-left"  v-if="showSuites">

            <!-- <button class="btn btn-primary" @click="showNewSuiteForm = !showNewSuiteForm" type="button">New Suite</button> -->



            <div class="card card-body suiteTable">
              <h3>Suites   <div class="glyphicon glyphicon-remove btn form-row suitesClose pull-right" @click="closeSuites"></div></h3>





              <!-- <div v-for="(suite, index) in suites[0]"> -->
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Suite Number</th>
                    <th scope="col">Suite Size</th>
                    <th scope="col">Tenant</th>
                    <th scope="col">Rental Rate</th>
                    <th scope="col">Lease Date</th>

                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(suite, index) in suites[0]" class="rowHover"
                  v-on:mouseover="mouseover($event, suite.id)" v-on:mouseout="mouseout($event, suite.id)">
                    <th scope="row">{{ suite.suite_num}}</th>
                    <td>{{ suite.suite_size }}</td>
                    <td>{{ suite.tenant }}</td>
                    <td>{{ suite.rental_rate }}</td>
                    <td>{{ suite.lease_date }}

                      <div class="showSuiteButtons" v-if="activeSuiteIndex && activeSuiteIndex == suite.id">

                        <span class="pull-right">
                    <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil"
                      v-on:click="editSuiteClick($event, index)"></span></button>

                        <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
                      v-on:click="deleteSuiteClick(index)"></span></button>
                        </span>
                      </div>

                    </td>

                  </tr>
                </tbody>
              </table>
</div>




              <!-- </div>
            </div>

          </div>v-->


           </div>
        </div>




        <!-- NEW NOTES -->



        <div class="col newNotesDiv">
          <div class=" text-left" v-if="showNewNotes">
            <div class="card card-body newNoteTitle">
              <h3>New Note<div class="form-row newNotesClose glyphicon glyphicon-remove btn pull-right" @click="closeNewNotes"> </div></h3>
              <form class="form-tasks newNotesForm" @submit.prevent="addNote">

                  <textarea class="form-control" v-model="newNote.content" placeholder="Add a note" required autofocus id="newNoteArea" rows="5">
                  </textarea>


                  <div class="text-center newNotesButton">
                <button class="btn btn-info" type="submit">Add Note</button>
              </div>

              </form>
            </div>
          </div>
        </div>

<!-- NOTES -->



        <div class="col">
          <div class=" text-left" id="notes" v-if="showNotes">
            <div class="card card-body noteCards">
              <h3>Property Notes   <div class="form-row notesClose glyphicon glyphicon-remove btn pull-right" @click="closeNotes" >
                </div>
                </h3>

              <!-- :class="{active: index === activeItem}" -->
              <ul class="list-group" v-for="(note, index) in notes.content[0]">
                <li class="list-group-item clearfix" v-on:mouseover="notesMouseover($event, index)" v-on:mouseout="notesMouseOut($event, index)">
                  <p class="lead notecardsP">{{ note }}</p>
                  <div  class="noteCardButtons">
                    <span class="pull-right" v-if="noteHovered && activeNote == index">
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
                     <button class="btn btn-info" type="submit">Save Changes</button>
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

              <h3 class="editPropertyFormH3">Edit Property</h3>

              <form @submit.prevent="formatEditedProperty" class=" editPropertyForm">

                <div class="form-row editPropertyClose pull-right" >
                  <div class="glyphicon glyphicon-remove btn pull-right" @click="closeEditPropertyForm"></div>
                </div>

                <div class="form-row">
                  <div class="form-group col-sm-8">
                    <label for="prop-owner">Property Owner</label>
                    <input type="text" class="form-control" id="prop-owner" :placeholder="property[0].prop_owner" v-model="editedPropInfo.prop_owner">
                  </div>
                  <div class="form-group col-sm-4">
                    <label for="prop-type">Property Type</label>
                    <select id="prop-type" class="form-control" v-model="editedPropInfo.prop_type">
                        <option v-if="property[0].prop_type == null" selected value="">
                        Choose Property Type...</option>

                        <option v-else selected value="">{{ property[0].prop_type }}</option>
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
                  <div class="form-group col-sm-4">
                    <label for="prop-size">Property Size</label>
                    <input type="text" class="form-control" id="prop-size" :placeholder="property[0].prop_size" v-model="editedPropInfo.prop_size">


                  </div>
                  <div class="form-group col-sm-4">
                    <label for="prop-range">Property Range</label>
                    <input type="text" class="form-control" id="prop-range" :placeholder="property[0].prop_range" v-model="editedPropInfo.prop_range">

                  </div>
                  <div class="form-group col-sm-4">
                    <label for="num-suites">Number of Suites</label>
                    <input type="text" class="form-control" id="suite-num" :placeholder="property[0].num_suites" v-model="editedPropInfo.num_suites">


                  </div>
                </div>
                <div class="form-group col-sm-12">
                  <label for="propStreetAddress">Street Address</label>
                  <input type="text" class="form-control" id="propStreetAddress" :placeholder="propStreetAddress" v-model="editedPropInfo.streetAddress">


                </div>
                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="propCity">City</label>
                    <input type="text" class="form-control" id="propCity" :placeholder="propCity" v-model="editedPropInfo.city">

                  </div>
                  <div class="form-group col-sm-4">
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
                  <div class="form-group col-sm-2">
                    <label for="propZip">Zip</label>
                    <input type="text" class="form-control" id="propZip" :placeholder="propZip" v-model="editedPropInfo.zip">


                  </div>
                </div>
                <div class="form-group col-sm-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="prospective-prop" :value="editedPropInfo.prospective_prop" v-model="editedPropInfo.prospective_prop">


                    <label class="form-check-label" for="prospective-prop">
                        Prospective Property
                      </label>
                  </div>
                </div>
                <div class="text-center">
                <button type="submit" class="btn btn-info editPropertyFormButton">Save Changes</button>
              </div>
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
      <!-- </div> -->
    </div>
  </div>
  <div class="col-sm-1 smallRightCol"></div>
</div>
<!-- </div> -->
</template>



<script>
import axios from 'axios';
import Nav from './Nav.vue'
import SmallMap from './SmallMap.vue'
import NewSuiteForm from './NewSuiteForm.vue'
import NewPropertyForm from './NewPropertyForm.vue'
import headerTopper from './headerTopper'
import sideNav from './sideNav.vue'
import ProTasks from './profileTasks.vue'



export default {
  name: 'Property',
  components: {
    'Nav': Nav,
    'SmallMap': SmallMap,
    'NewSuiteForm': NewSuiteForm,
    'NewPropertyForm': NewPropertyForm,
    'headerTopper': headerTopper,
    'sideNav': sideNav,
    'ProTasks': ProTasks
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
      activeSuiteItem: [],
      showEditSuiteForm: false,
      editedSuiteInfo: {
        suite_num: "",
        tenant: "",
        lease_date: "",
        suite_size: "",
        rental_rate: ""
      },
      showNewSuiteForm: false,
      showNewPropertyForm: false,
      showEditPropertyForm: false,
      suiteHovered: false,
      activeSuiteIndex: '',
      showNotifications: false,
      showSuites: false,
      activeNote: -1,
      noteHovered: false,
      showNotes: false,
      showNewNotes: false

    }
  },
  mounted: function() {
    console.log('wtf');
    this.getPropertyData()
    this.checkSession()
  },
  methods: {
    checkSession: function(){
      let self = this;
      if (!localStorage.sessionData){
        console.log("is it getting in here");
        self.$router.push('/login')
      }
    },
    getPropertyData: function() {
      let self = this
      let prop_id = this.$route.params.id
      let user_id = window.localStorage.id
      axios.get(`http://localhost:8881/properties/${user_id}/${prop_id}`)
        .then(function(result) {
          console.log(result, 'RESULTTTTT');
          self.property.push(result.data[0][0])
          self.suites.push(result.data[1])
          if (result.data[2][0]) {
            self.notes.content.push(result.data[2][0].notes)
            self.notes.id = result.data[2][0].id
          }
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

      self.editedPropInfo = {
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
      }
    },
    closeEditPropertyForm: function () {
      this.showEditPropertyForm = !this.showEditPropertyForm
    },
    addNote: function() {
      let self = this
      let id = self.notes.id
      let user_id = window.localStorage.id

      self.showNewNotes = !self.showNewNotes

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
    closeNotes: function () {
      this.showNotes = !this.showNotes
    },
    closeNewNotes: function () {
      this.showNewNotes = !this.showNewNotes
    },
    editSuiteClick: function(event, indexClicked) {
      this.activeSuiteItem = []
      this.activeSuiteItem.push(this.suites[0][indexClicked])
      this.showEditSuiteForm = !this.showEditSuiteForm
      this.showSuites = !this.showSuites
    },
    editSuite: function() {
      let self = this
      let editedSuiteInfoKeys = Object.keys(self.editedSuiteInfo)
      let suiteId = self.activeSuiteItem[0].id
      let editedSuiteData = {}

      //hide edit suite form
      self.showEditSuiteForm = !self.showEditSuiteForm

      // loop through edited suite info keys and add edited values to edited suite data
      for (let i = 0; i < editedSuiteInfoKeys.length; i++) {

        if (self.editedSuiteInfo[editedSuiteInfoKeys[i]] !== "") {
          editedSuiteData[editedSuiteInfoKeys[i]] = self.editedSuiteInfo[editedSuiteInfoKeys[i]]
        } else {
          editedSuiteData[editedSuiteInfoKeys[i]] = self.activeSuiteItem[0][editedSuiteInfoKeys[i]]
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
    closeNewSuiteForm: function () {
      this.showNewSuiteForm = !this.showNewSuiteForm
    },
    closeSuites: function () {
      this.showSuites = !this.showSuites
    },
    deleteProperty: function() {
      let self = this
      let prop_id = this.property[0].id

      axios.delete(`http://localhost:8881/properties/${prop_id}`)
        .then(function(results) {
          self.$router.push('/properties')
        })
    },
    addProperty: function(event) {
      console.log(event, 'HEYYY EVENT IN ADD PROPERTY');
      let self = this
      event.user_id = window.localStorage.id
      self.showNewPropertyForm = !self.showNewPropertyForm

      axios.post(`http://localhost:8881/properties/new`, event)
        .then(function(results) {
          console.log('OMG YOU HAVE A NEW PROPERTY');
          self.$router.push(`/properties/${prop_id}`)
        })
    },
    closeNewPropForm: function () {
      this.showNewPropertyForm = !this.showNewPropertyForm
    },

    mouseover: function (event, index) {
      console.log(index,'HEYYYY EVENT');
      this.activeSuiteIndex = index
      this.suiteHovered = !this.suiteHovered

    },
    mouseout: function (event, index) {
      this.activeSuiteIndex = -1
      this.suiteHovered = !this.suiteHovered
    },
    notesMouseover: function (event, noteIndex) {
      console.log(event, 'EVENT');
      this.noteHovered = !this.noteHovered
      this.activeNote = noteIndex
    },
    notesMouseOut: function (event, noteIndex) {
      this.noteHovered = !this.noteHovered
      this.activeNote = -1
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

/* ============ main content styling ===============*/


.notififyBox {
  position: fixed;
  top: 12%;
  right: 4%;
  width: 30%;
  z-index: 100;
}

.property {
  margin: 0;
  /* background: linear-gradient(to right, whitesmoke, #ffffff); */
}
.mainContent {
  margin-top: 10%;
}

.rightCol {
  padding-left: 3%;
  height: 100%;
  width: 60%;

}
/* .hiddenColumn {
  width: 10%;
  margin-left: 4%;
  overflow-x: hidden;
  white-space: nowrap;
} */

/* ============ secondary button nav =================*/
.buttonRow {
  width: 100%;
  position: fixed;
  top: 10%;
  margin-left: auto;
  margin-right: auto;
  background: whitesmoke;
  border-bottom: 1px solid gainsboro;
  z-index: 50;
  min-width: 10%;
  overflow-x: scroll;

}
.btn-group {
  white-space: nowrap;
}

.btn-group>.btn {
  margin-left: auto;
  margin-right: auto;
  width: 16vh;
  background: whitesmoke;
  color: #136a8a;
  display: inline-block;
  float: none;
}


.btn-group>.btn:hover {
  background: linear-gradient(to right, whitesmoke, #ffffff);

}
.btn-group > .btn:focus,
.btn-group > .butn:active {
  outline: none !important;
  background: white;
}



/* ============= map column styling ==================*/
.mapColumn {
  padding: 2%;
  border-right: 1px solid gainsboro;
  background: whitesmoke;
  height: 100vh;
  /* width: 20%; */
  margin-left: 3%;
  min-width: 200px;
  /* top: 20%;
  left: 5%; */

}

.mapColumn > h3 {
  margin: 5% 5%;
  /* line-height: .5em; */
}

.centerMap {
  margin-left: auto;
  margin-right: auto;
  height: 25%;

  border: 1px solid darkgrey;
}

.propInfo {
  margin: 10% 5%;
}
.propInfo > p {
  margin: 2%;
  /* border-bottom: 1px solid gainsboro; */
}

.propHeader {
  font-weight: 500;
  margin-right: 3%;
}



/* ======================= suites ====================*/
.suiteTable {
  width: 75%;
  margin-top: 3%;
  margin-left: 2%;
}
.suiteTable > h3 {
  margin-bottom: 4%;
  width: 100%;
}
.suitesClose:hover {
  color: #73BEDB;
}
.thead-dark {
  background-color: #136a8a;
  color: white;
}
.rowHover {
  height: 75px;
}
.rowHover:hover {
  background-color: whitesmoke;
  border-bottom: .50px dimgrey;
}
.editSuiteClose {
  width: 100%;
  text-align: right;
  margin-bottom:4%;
}

.editSuiteButton > button {
  margin-top: 8%;
}

.suiteTable > table {
  border: 1px solid gainsboro;
}

.suiteEditFormMargin {
  margin-top: 40px;
  margin-left: 2%;
  width: 80%;
}

.showSuiteButtons {
  margin-left: 6vh;
}

/* ======================= notes ====================*/

.noteCards {
  width: 80%;
  margin-left: 2%;
}
.notecardsP {
  width: 80%;
  display: inline;
}
.noteCards > h3 {
  margin-bottom: 4%;
  width: 100%;
}
.noteCardButtons{
  display: inline;
}
.noteCards > ul > li:hover {
  box-shadow: 0px .5px .25px dimgrey;
}
.notesClose:hover {
  color: #73BEDB;
}
.newNotesClose:hover {
  color: #73BEDB;
}
.newNotesForm {
  border: 1px solid gainsboro;
  border-radius: 2%;
  padding: 3%;

}
.newNotesDiv {
  width: 75%;
  margin-left: 3%;
}
.newNotesButton {
  margin-top: 4%;
}
.newNoteTitle > h3{
  margin-bottom: 4%;
}
.editInput {
  background-color: ivory !important
}

/* ============= property styling ==================*/


.editPropertyForm {
  border: 1px solid gainsboro;
  border-radius: 2%;
  padding: 2%;
  width: 85%;
  margin-bottom: 5%;
  margin-left: 3%;
}
.editPropertyClose {
  width: 100%;
  margin-bottom:4%;
}
.editPropertyFormH3 {
  margin-bottom: 4%;
  margin-left: 3%;
}
.editPropertyFormButton {
  margin-top: 4%;
  margin-bottom: 4%;
}



</style>
