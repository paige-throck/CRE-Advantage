<template>
<div class = "mapPage">

<headerTopper></headerTopper>

<i class="material-icons notifyBell" style="font-size:4vh" @click="showNotifications = !showNotifications">notifications_none</i>

<div class="notififyBox" id="taskList" v-if="showNotifications">
        <ProTasks></ProTasks>
</div>


<div class = "mapContainer">
  <div class = "searchBar">

    <input id="search-input" class="controls" type="text" placeholder="Search Box">

    <select v-model="filterChosen" v-on:change="filterProperties">
    <option value="" disabled selected>Filter Properties</option>
    <option>All Properties</option>
    <option>Office</option>
    <option>Retail</option>
    <option>Industrial</option>
  </select>

    <button v-model="userLocation" @click="pinUserLocation" type="button" class="btn btn-circle userLocation" id="addPin"><i class="material-icons" style="font-size:4vh">my_location</i></button>
    <span class="searchingUser">{{ searchingForUser }}</span>

  </div>


  <div class="property-map" id="mapId">
  </div>


</div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import headerTopper from './headerTopper.vue'
import ProTasks from './profileTasks.vue'

export default {
  name: 'mobileMap',
  components:{
    headerTopper,
    ProTasks,
  },
  data() {
    return {
      filterChosen: '',
      userLocation: '',
      searchingForUser: '',
      markerCoordinates: [],
      map: null,
      infowindow: null,
      places: null,
      googleMarkerArr: [],
      searchBox: null,
      bounds: null,
      input: null,
      searchMarkers: [],
      searchedProp: []
    }
  },
  mounted: function() {
    this.initMap()
    this.checkSession();
  },
  methods: {
    checkSession: function(){
      let self = this;
      if (!localStorage.sessionData){
        console.log("is it getting in here");
        self.$router.push('/login')
      }
    },
    /* =====================================================
    Put map on the page and set the center to Austin
    ===================================================== */
    initMap: function() {
      let self = this

      axios.get(`http://localhost:8881/properties/user/${window.localStorage.id}`)
        .then(function(results){
          let splitCity = results.data[0].city.split(',')

          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${splitCity[0]},+${splitCity[1]}&key=AIzaSyAh3fU5DauF9fgnwi1IdF8OZccHONkPBRM`)

          .then(function(results) {
            let userCoords = results.data.results[0].geometry.location
            let mapElement = document.getElementById('mapId')
            let options = {
              center: new google.maps.LatLng(userCoords.lat, userCoords.lng),
              zoom: 8
            }
            self.map = new google.maps.Map(mapElement, options);

            self.getDatabaseProperties()

          })

        })


    },
    /* =====================================================

    Get properties currently in the user database and setup to add to map
    ====================================================== */
    getDatabaseProperties: function() {
      //console.log(window.localStorage.id, 'HEY LOCAL STORAGE ID');
      let self = this
      let id = window.localStorage.id
      axios.get(`http://localhost:8881/properties/${id}`)

        .then(function(properties) {
          console.log(properties, 'properties');
          properties.data.forEach(function(property) {

            // push all property coordinates to array for markers
            self.markerCoordinates.push({
              latitude: property.lat,
              longitude: property.lang,
              address: property.address,
              prop_type: property.prop_type,
              prop_id: property.id
            })
          })
          self.createInfoWindow(self.markerCoordinates)
        })
        .catch(function(error) {
          console.log(error, 'HEY YOU HAVE AN ERROR');
        })
    },
    /* =====================================================
    Add searchbox to map and set up results to add marker to map
    ====================================================== */
    createSearchBox: function() {
      let self = this
      console.log(self.searchMarkers, 'SEARCH MARKERS');
      self.input = document.getElementById('search-input');
      self.searchBox = new google.maps.places.SearchBox(self.input);

      // first search results return based on the map location
      self.map.addListener('bounds_changed', function() {
        self.searchBox.setBounds(self.map.getBounds());
      });

      // find location entered in search box
      self.searchBox.addListener('places_changed', function() {
        self.places = self.searchBox.getPlaces();
        if (self.places.length == 0) {
          return;
        }

        self.bounds = new google.maps.LatLngBounds();
        self.places.forEach(function(place) {
          if (!place.geometry) {
            return;
          }
          // take usa off the end of the address
          let usa = place.formatted_address.split(',')
          let usaSlice = usa.slice(0, usa.length-1).join(', ')

          //Create a marker for each place.
          self.searchMarkers.push({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: usaSlice,
            name: place.name,
            prop_type: place.prop_type
          })

          // change the map view if the marker is off the screen
          if (place.geometry.viewport) {
            self.bounds.union(place.geometry.viewport);
          } else {
            self.bounds.extend(place.geometry.location);
          }
          self.map.fitBounds(self.bounds)

          // empty search box
          self.input.value = ''
          self.markerCoordinates.push(self.searchMarkers)
          self.createInfoWindow(self.searchMarkers)
        })
      })
    },
    /* =====================================================
    Add info windows to markers on the map and set content
    ====================================================== */
    createInfoWindow: function(markersArr) {
      var infowindow;
      let self = this

      markersArr.forEach(function(individualMarker) {
        let tempId = individualMarker.prop_id

        if (markersArr.length > 1) {
          // add property address to info window
          infowindow = new google.maps.InfoWindow({
            content: `<p><a href="/property/${tempId}">  ${individualMarker.address}</a></p>`
          })
          self.addMarker(infowindow, individualMarker)
        } else {
          infowindow = new google.maps.InfoWindow({
            content: `<p>${individualMarker.address}</p>
                <button type="button" id="savePropertyButton">Save
                  </button>`
          })

          self.addMarker(infowindow, individualMarker)
        }
      })
      self.createSearchBox()
      // clear out the search array for next search
      self.searchMarkers = []
    },
    /* =====================================================
    Add markers to the map
    ====================================================== */
    addMarker: function(infowindow, individualMarker) {
      let self = this
      let position = new google.maps.LatLng(individualMarker.latitude, individualMarker.longitude)



      let marker = new google.maps.Marker({
        position: position,
        map: self.map,
        title: individualMarker.address,
        animation: google.maps.Animation.DROP,
        prop_type: individualMarker.prop_type,
        // icon: {
        //   path: '',
        //   anchor: new google.maps.Point(30, 30),
        //   scaledSize: new google.maps.Size(25, 30)
        // }
      })

      // add reference to marker to be able to filter later
      self.googleMarkerArr.push(marker)

      marker.addListener('click', function() {
        infowindow.open(self.map, marker)

        if (infowindow.content.includes('<button')) {
          //addListenerToSaveButton()
          document.getElementById('savePropertyButton')
            .addEventListener('click', function() {
              infowindow.close()
              infowindow.setContent('<p>' + '<a href="/allprop">' + individualMarker.address + '</a>' + '</p>')

              self.saveNewProperty(individualMarker)
            })
        }
      })
    },
    /* =====================================================
    Save a searched property location to the database
    ====================================================== */
    saveNewProperty: function(newProperty) {
      newProperty.prospective_prop = true;

      newProperty.id = window.localStorage.id
      //set variable to send to nav bar so nav can update
      this.searchedProp.push(newProperty)

      axios.post('http://localhost:8881/properties/save', newProperty)
        .then(function(response) {
          return
        })
        .catch(function(error) {
          console.log(error, 'HEY IM AN ERRRRROR');
        })
    },
    /* =====================================================
    Filter properties on the map
    ====================================================== */
    filterProperties: function() {
      let self = this

      // set filtered values to visibile and others to hidden
      for (var i = 0; i < self.googleMarkerArr.length; i++) {

        if (self.googleMarkerArr[i] && self.googleMarkerArr[i].prop_type === this.filterChosen) {
          self.googleMarkerArr[i].setVisible(true)
        } else if (this.filterChosen == "All Properties"){
          self.googleMarkerArr[i].setVisible(true)
        } else  {
          self.googleMarkerArr[i].setVisible(false)
        }


      }
    },
    /* =====================================================
    Get user location and set up to add as marker to the map
    ====================================================== */
    pinUserLocation: function() {
      let self = this
      let tempUserLocation = []
      let geocoder = new google.maps.Geocoder;
      self.searchingForUser = "Finding you..."

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.searchingForUser = ''
          self.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          self.map.setCenter(self.userLocation)

          geocoder.geocode({
            location: self.userLocation
          }, function(results, status) {
            if (status === "OK") {
              self.userLocation.address = results[0].formatted_address
              self.userLocation.latitude = self.userLocation.lat
              self.userLocation.longitude = self.userLocation.lng
              tempUserLocation.push(self.userLocation)
              self.createInfoWindow(tempUserLocation)
            }
          })
        })
      } else {
        window.alert('You were not found')
      }
    },
  }
}
</script>


<style scoped>
.mapPage{
  height: 100vh;
}

.mapContainer{
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 8%;
}

.searchBar{
  margin-top: 15%;
  text-align: center;
}


.property-map {
  height:200pt;
  margin-top:10%;
  text-align: center;
}

input {
  margin-bottom: 20px;
  width: 70%;
  height: 3vh;
  padding: 1.5%;
  margin-right: 2%;
  border-radius: 2%;
  border: 1px solid gainsboro;
}
select {
  height: 4.5vh;
}
.userLocation:hover {
  color: #73BEDB;
}
.searchingUser {
  margin-left: 1%;

}

.btn-circle{
  font-size: 18px;
  width: 30px;
  height: 30px;
  padding: 1px 1px;
  text-align: center;
}

.notififyBox {
  position: fixed;
  top: 12%;
  right: 4%;
  width: 30%;
  z-index: 100;
}
.notifyBell {
  position: fixed;
  top: 2%;
  right: 6%;
  font-size: 5vh;
  color: gainsboro;
  z-index: 1;
  padding-top: 1%;
}
.notifyBell:hover {
  color: #73BEDB;
  cursor: pointer;
}
</style>
