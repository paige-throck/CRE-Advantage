<template>
<div class="row allProp">
  <Nav></Nav>

  <div class="col">

    <form @submit.prevent="searchProperties">
      <input type="text" v-model="search" placeholder="Search Properties..." id="searchBox">
      <button type="submit" class="btn btn-info">Search</button>
    </form>

    <button type="submit" class="btn btn-info" @click="revertProperties">All Properties</button>

    <div class="card card-body">
      <ul class="list-group" v-for="(property, index) in properties[0]">
        <li class="list-group-item clearfix">
          <router-link :to="{name: 'Property', params: {id: property.id}}">
            <p class="lead">{{ property.address }}</p>
          </router-link>
          <div>

          </div>
        </li>
      </ul>


    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav'


export default {
  name: 'AllProp',
  data() {
    return {
      properties: [],
      originalProperties: [],
      search: ''
    }
  },
  mounted: function() {
    this.getProperties()
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
        console.log(property, 'PROPERTYYYYYYY');
          if (property.address.includes(self.search)) {
              self.properties = []
              searchArr.push(property)
              self.properties.push(searchArr)
              console.log('WHATWHATWHATWHAT');
            }


          })
          console.log(self.properties, 'PROPASLDFKJAS;LFKJASF;LKJ');
      },
      revertProperties() {
        let self = this

        self.properties = []
        self.properties.push(self.originalProperties[0])
        self.search = ''
      }
    },
    // computed: {
    //   filteredProperties: function () {
    //     let self = this
    //
    //     return self.properties.filter(function (property) {
    //       console.log(property, 'PROPETY IN COMPUTED');
    //       return property.forEach(function(property) {
    //         console.log(property, 'PROPERTY IN THE FOREACH');
    //       return property.address.match(self.search)
    //       })
    //
    //     })
    //   }
    // }

  }
</script>

<style scoped>
.home {
  margin: 5%;
}
</style>
