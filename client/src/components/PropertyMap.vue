<template>

<div class="property-map" id="mapId"></div>

</template>

<script>
  import axios from 'axios';


  export default {
    name: 'PropertyMap',
    data() {
      return {}
    },
    mounted: function() {
      let map;
      let markerCoordinates = []

      function initMap() {
        // create map
        let mapElement = document.getElementById('mapId')
        let options = {
          center: new google.maps.LatLng(30.2672, -97.7431),
          zoom: 8
        }
        let map = new google.maps.Map(mapElement, options);

        // make api call to get existing property coordinate data
        axios.get('http://localhost:8881/properties/')
          .then(function(properties) {
            console.log(properties, 'properties');
            properties.data.forEach(function(property) {

              // push all property coordinates to array for markers
              markerCoordinates.push({
                latitude: property.lat,
                longitude: property.lang,
                address: property.address
              })

            })
            // loop through existing property coordinates and add markers
            markerCoordinates.forEach(function(coordinate) {
              console.log(map, 'COORDINATE');

              // add property address to info window
              let infowindow = new google.maps.InfoWindow({
                content: coordinate.address
              })

              let position = new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
              let marker = new google.maps.Marker({
                position,
                map,
                animation: google.maps.Animation.DROP,
                icon: {
                  url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
                  anchor: new google.maps.Point(30, 30),
                  scaledSize: new google.maps.Size(25, 30)
                }
              })
              marker.addListener('click', function () {
                infowindow.open(map, marker)
              })
            })
          })
          .catch(function(error) {
            console.log(error, 'HEY YOU HAVE AN ERROR');
          })
      }
      initMap()
    },
  }
</script>


<style scoped>
  .property-map {
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background: grey;
  }
</style>
