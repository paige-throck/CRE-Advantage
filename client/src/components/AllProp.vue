<template>
  <div class="row allProp">
    <Nav></Nav>

    <div class="col">

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
      properties: []
    }
  },
  mounted: function() {
    this.getProperties()
  },
  methods: {
  getProperties() {
    let id = window.localStorage.id
    let self = this
    axios.get(`http://localhost:8881/properties/${id}`)
      .then(function(result) {
      self.properties.push(result.data)
      console.log(self.properties, 'HEYYYYY YOU PROPERTIESSSSS');
        })
    }
  }

}


</script>

<style scoped>
.home{
  margin:5%;
}
</style>
