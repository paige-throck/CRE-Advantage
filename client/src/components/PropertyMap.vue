<template>
<div>
  <input id="search-input" class="controls" type="text" placeholder="Search Box">
  <select v-model="filterChosen" v-on:change="filterProperties">
    <option value="" disabled selected>Filter Properties</option>
    <option>Office</option>
    <option>Retail</option>
    <option>Industrial</option>
  </select>
  <span>{{ filterChosen }} </span>
  <div class="property-map" id="mapId">
  </div>
</div>

</template>

<script>
  import axios from 'axios';
  //let markerCoordinates;

  export default {
    name: 'PropertyMap',
    data() {
      return {
        filterChosen: '',
        markerCoordinates: [],
        map: null,
        infowindow: null,
        places: null,
        addListenerToSaveButton: null
        //map: null
      }
    },
    mounted: function() {
      this.initMap()

      //let markerCoordinates = []

      /* -----------------------------------------
        create map
       -----------------------------------------*/
      // function initMap() {
      //   let self = this
      //
      //   let mapElement = document.getElementById('mapId')
      //   let options = {
      //     center: new google.maps.LatLng(30.2672, -97.7431),
      //     zoom: 8
      //   }
      //   self.map = new google.maps.Map(mapElement, options);
      //
      //   self.getDatabaseProperties()
      // }

      /* -----------------------------------------
        get properties from the database
       -----------------------------------------*/
      // function getDatabaseProperties() {
      //
      //   axios.get('http://localhost:8881/properties/')
      //     .then(function(properties) {
      //       console.log(properties, 'properties');
      //       properties.data.forEach(function(property) {
      //
      //         // push all property coordinates to array for markers
      //         markerCoordinates.push({
      //           latitude: property.lat,
      //           longitude: property.lang,
      //           address: property.address
      //         })
      //       })
      //       createInfoWindow(markerCoordinates)
      //     })
      //     .catch(function(error) {
      //       console.log(error, 'HEY YOU HAVE AN ERROR');
      //     })
      // }

      /* -----------------------------------------
        create the map search box
       -----------------------------------------*/
      //function createSearchBox() {
      //   var searchMarkers = [];
      //
      //   let input = document.getElementById('search-input');
      //   let searchBox = new google.maps.places.SearchBox(input);
      //
      //   //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      //
      //   // first search results return based on the map location
      //   map.addListener('bounds_changed', function() {
      //     searchBox.setBounds(map.getBounds());
      //   });
      //
      //   // find location entered in search box
      //   searchBox.addListener('places_changed', function() {
      //     var places = searchBox.getPlaces();
      //
      //     if (places.length == 0) {
      //       return;
      //     }
      //
      //     var bounds = new google.maps.LatLngBounds();
      //     places.forEach(function(place) {
      //       if (!place.geometry) {
      //         console.log("Returned place contains no geometry");
      //         return;
      //       }
      //
      //       //Create a marker for each place.
      //       searchMarkers.push({
      //         latitude: place.geometry.location.lat(),
      //         longitude: place.geometry.location.lng(),
      //         address: place.formatted_address,
      //         name: place.name
      //       })
      //       console.log(searchMarkers, 'search markerrsadflkjasdf');
      //
      //       // change the map view if the marker is off the screen
      //       if (place.geometry.viewport) {
      //         bounds.union(place.geometry.viewport);
      //       } else {
      //         bounds.extend(place.geometry.location);
      //       }
      //       map.fitBounds(bounds)
      //
      //       // empty search box
      //       input.value = ''
      //
      //       createInfoWindow(searchMarkers)
      //     })
      //   })
      // }



      /* -----------------------------------------
        set up infowindow for markers
       -----------------------------------------*/
      // function createInfoWindow(markersArr) {
      //   var infowindow;
      //   console.log(markersArr, 'MARKERS ARRAY');
      //   markersArr.forEach(function(individualMarker) {
      //
      //     if (markersArr.length > 1) {
      //       // add property address to info window
      //       infowindow = new google.maps.InfoWindow({
      //         content: '<p>' + '<a href="#">' + individualMarker.address + '</a>' + '</p>'
      //       })
      //       addMarker(infowindow, individualMarker)
      //     } else {
      //       infowindow = new google.maps.InfoWindow({
      //         content: '<h6>' + individualMarker.name + '</h6>' + '<p>' + '<a href="#">' + individualMarker.address + '</a>' + '</p>' + '</h1>' + '<button type="button" id="savePropertyButton" onclick="addListenerToSaveButton()">' + 'Save' +
      //           '</button>'
      //       })
      //       addMarker(infowindow, individualMarker)
      //     }
      //   })
      //   createSearchBox()
      // }


      /* -----------------------------------------
        add markers on the map with infowindows
       -----------------------------------------*/
      // function addMarker(infowindow, individualMarker) {
      //   let position = new google.maps.LatLng(individualMarker.latitude, individualMarker.longitude)
      //
      //   let marker = new google.maps.Marker({
      //     position,
      //     map,
      //     title: individualMarker.address,
      //     animation: google.maps.Animation.DROP,
      //     icon: {
      //       url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
      //       anchor: new google.maps.Point(30, 30),
      //       scaledSize: new google.maps.Size(25, 30)
      //     }
      //   })
      //   console.log(marker.position.lat(), 'MARKER BEFORE');
      //   marker.addListener('click', function() {
      //     console.log(marker.position.lat(), 'marker inside the click');
      //     console.log(marker, 'MARKERT CONTENT');
      //     infowindow.open(map, marker)
      //   })
      //
      //   let addListenerToSaveButton = setTimeout(function() {
      //     document.getElementById('savePropertyButton').addEventListener('click', function() {
      //       saveNewProperty(individualMarker)
      //       infowindow.close()
      //     })
      //   }, 2000)
      //
      // }


      /* -----------------------------------------
        save searched marker to the database
      -----------------------------------------*/
      // function saveNewProperty(newProperty) {
      //   console.log(newProperty, 'WHATTTTTTTTTTTT');
      //
      //   newProperty.prospective_prop = true;
      //   console.log(newProperty, 'DID IT ADD THE PROP');
      //
      //   axios.post('http://localhost:8881/properties/save', newProperty)
      //     .then(function(response) {
      //       console.log(response, 'HEY DID I WORK')
      //       return
      //     })
      //     .catch(function(error) {
      //       console.log(error, 'HEY IM AN ERRRRROR');
      //     })
      // }




    },
    methods: {
      initMap: function () {
        let self = this

        let mapElement = document.getElementById('mapId')
        let options = {
          center: new google.maps.LatLng(30.2672, -97.7431),
          zoom: 8
        }
        self.map = new google.maps.Map(mapElement, options);

        self.getDatabaseProperties()
      },
      filterProperties: function () {
        console.log('HEY CHANGE');
      },
      getDatabaseProperties: function () {
        let self = this
          axios.get('http://localhost:8881/properties/')
            .then(function(properties) {
              console.log(properties, 'properties');

              properties.data.forEach(function(property) {

                // push all property coordinates to array for markers
                  self.markerCoordinates.push({
                  latitude: property.lat,
                  longitude: property.lang,
                  address: property.address
                })
              })
              console.log(self.markerCoordinates, 'SELF MARKER COORDINATES');
              self.createInfoWindow(self.markerCoordinates)
            })
            .catch(function(error) {
              console.log(error, 'HEY YOU HAVE AN ERROR');
            })
      },
      createSearchBox: function() {
        let self = this
        var searchMarkers = [];
        //let places;
        let input = document.getElementById('search-input');
        let searchBox = new google.maps.places.SearchBox(input);

        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // first search results return based on the map location
        self.map.addListener('bounds_changed', function() {
          searchBox.setBounds(self.map.getBounds());
        });

        // find location entered in search box
        searchBox.addListener('places_changed', function() {
          self.places = searchBox.getPlaces();
          console.log(self.places,'THIS IS SELF PLACES');
          if (self.places.length == 0) {
            return;
          }

          var bounds = new google.maps.LatLngBounds();
          self.places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            //Create a marker for each place.
            searchMarkers.push({
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              address: place.formatted_address,
              name: place.name
            })
            console.log(searchMarkers, 'search markerrsadflkjasdf');

            // change the map view if the marker is off the screen
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            self.map.fitBounds(bounds)

            // empty search box
            input.value = ''
            //console.log(markersArr, 'HHHHHHHHHHHHHHHHHHHHHHHHH');
            self.createInfoWindow(searchMarkers)
          })
        })
      },
      createInfoWindow: function(markersArr) {
        var infowindow;
        let self = this
          console.log(markersArr, 'MARKERS ARRAY');
          markersArr.forEach(function(individualMarker) {

            if (markersArr.length > 1) {
              // add property address to info window
              infowindow = new google.maps.InfoWindow({
                content: '<p>' + '<a href="#">' + individualMarker.address + '</a>' + '</p>'
              })
              self.addMarker(infowindow, individualMarker)
            } else {
              infowindow = new google.maps.InfoWindow({
                content: '<h6>' + individualMarker.name + '</h6>' + '<p>' + '<a href="#">' + individualMarker.address + '</a>' + '</p>' + '</h1>' + '<button type="button" id="savePropertyButton" onclick="addListenerToSaveButton()">' + 'Save' +
                  '</button>'
              })
              self.addMarker(infowindow, individualMarker)
            }
          })
          self.createSearchBox()

      },
      addMarker: function(infowindow, individualMarker) {
        let self = this
        console.log(individualMarker.latitude, 'HEY THIS IS WHAT YOU ARE LOOKING FOR');
        let position = new google.maps.LatLng(individualMarker.latitude, individualMarker.longitude)

        let marker = new google.maps.Marker({
          position: position,
          map: self.map,
          title: individualMarker.address,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
            anchor: new google.maps.Point(30, 30),
            scaledSize: new google.maps.Size(25, 30)
          }
        })
        console.log(marker.position.lat(), 'MARKER BEFORE');
        marker.addListener('click', function() {
          console.log(marker.position.lat(), 'marker inside the click');
          console.log(marker, 'MARKERT CONTENT');
          infowindow.open(self.map, marker)
        })

        self.addListenerToSaveButton = setTimeout(function() {
          document.getElementById('savePropertyButton').addEventListener('click', function() {
            self.saveNewProperty(individualMarker)
            infowindow.close()
          })
        }, 2000)
      },
      saveNewProperty: function (newProperty) {
        console.log(newProperty, 'WHATTTTTTTTTTTT');

        newProperty.prospective_prop = true;
        console.log(newProperty, 'DID IT ADD THE PROP');

        axios.post('http://localhost:8881/properties/save', newProperty)
          .then(function(response) {
            console.log(response, 'HEY DID I WORK')
            return
          })
          .catch(function(error) {
            console.log(error, 'HEY IM AN ERRRRROR');
          })
      }

    }

  }
//initMap()
</script>


<style scoped>
  .property-map {
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background: grey;
  }

  div {
    width: 600px;
    height: 600px;
    margin: 0 auto;
    text-align: left;
  }

  input {
    margin-bottom: 20px;
  }
</style>
