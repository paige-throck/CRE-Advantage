<template>
<div class="allProp">

  <sideNav></sideNav>


  <div class="row mainContent">
    <div class="col-sm-12">

      <div class="row">
        <div class="col-sm-7">
          <form @submit.prevent="searchProperties">
            <input type="text" v-model="search" placeholder="Search Properties..." id="searchBox">
            <button type="submit" class="btn btn-info" title="Search">Search</button>
            <i class="material-icons btn" title="All Properties" @click="revertProperties">replay</i>
          </form>
        </div>




        <div class="col-sm-5">
          <label for="filterProperties">Property Type</label>
          <select v-model="filterChosen" v-on:change="filterProperties" id="filterProperties">
          <option value="" deselected selected>Filter Properties...</option>
          <option>All Properties</option>
          <option>Office</option>
          <option>Retail</option>
          <option>Industrial</option>
        </select>
        </div>

      </div>





      <div class="card card-body">
        <ul class="list-group" v-for="(property, index) in properties[0]">
          <router-link :to="{name: 'Property', params: {id: property.id}}">
            <li class="list-group-item clearfix">
              <p class="lead">{{ property.address }}</p>
            </li>
          </router-link>
        </ul>


      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import sideNav from './sideNav.vue'


export default {
  name: 'AllProp',
  components: {
    'sideNav': sideNav
  },
  data() {
    return {
      properties: [],
      originalProperties: [],
      search: '',
      filterChosen: ''
    }
  },
  mounted: function() {
    this.getProperties()
    this.checkSession()
  },
  methods: {
    checkSession: function() {
      let self = this;
      if (!localStorage.sessionData) {
        console.log("is it getting in here");
        self.$router.push('/login')
      }
    },
    getProperties() {
      let id = window.localStorage.id
      let self = this
      axios.get(`http://localhost:8881/properties/${id}`)
        .then(function(result) {
          self.properties.push(result.data)
          self.originalProperties.push(result.data)
          console.log(self.properties, 'HEYYYYY YOU PROPERTIESSSSS');
        })
    },
    searchProperties() {
      let self = this
      let searchArr = []
      self.properties[0].forEach(function(property) {

        if (property.address.includes(self.search)) {
          self.properties = []
          searchArr.push(property)
          self.properties.push(searchArr)
        }


      })
    },
    filterProperties: function() {
      let self = this
      let filterArr = []

      // reset properties on filter change so it filters all properties and not the previously filtered
      self.revertProperties()

      self.properties[0].forEach(function(property) {
        if (property.prop_type == self.filterChosen ) {
          self.properties = []
          filterArr.push(property)
          self.properties.push(filterArr)
        }

        if (self.filterChosen == "All Properties") {
          self.revertProperties()
        }
      })
      // if no properties equal the filter value then return nothing
      if (filterArr.length == 0) {
        self.properties = []
      }
    },
    revertProperties() {
      let self = this

      self.properties = []
      self.properties.push(self.originalProperties[0])
      self.search = ''
    }
  },
}
</script>

<style scoped>
.allProp{
  /* background: linear-gradient(to right, whitesmoke, #ffffff); */
  height: 100vh;
}
.mainContent {
  /* padding: 10% 10% 10% 0%; */
  /* background: linear-gradient(to right, whitesmoke, #ffffff); */
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 5%;
  padding-top: 8%;
}
.card {
  width: 90%;
}


li:hover {

  box-shadow: 0px .5px .25px dimgrey;
}

a:hover {
  text-decoration: none;
}

input {
  width: 70%;
  height: 4vh;
  padding: 2.5%;
  margin-right: 2%;
  border-radius: 2%;
  border: 1px solid gainsboro;
}

label {
  font-weight: 500;

}
select {
  height: 4.5vh;
  width: 70%;
  margin-left: 3%;
  margin-bottom: 15%;
}





</style>
