<template>

<div class="property-map" id="mapId"></div>

</template>

<script>
  import axios from 'axios';


  export default {
    data() {
      console.log('YOU IN DATA MAN');
      return {

        test: 'hello',
        markerCoordinates: [],
        // markerCoordinates: [{
        //   latitude: 30.2656,
        //   longitude: -97.7497
        // }, {
        //   latitude: 30.1977,
        //   longitude: -97.7685
        // }]
      }
    },
    // make api call to get existing property coordinate data
    created () {

      console.log(this.data, 'marker coordinats in mount');

      axios.get('http://localhost:8881/properties/')
        .then(function(properties) {
          properties.data.forEach(function(property) {
            console.log(property, 'property');
            this.markerCoordinates.push({
              latitude: property.lat,
              longitude: property.lang
            })
          })
          console.log(properties.data, "HEY AXIOS WORKED COOL WOW");
        //  createMap()
        })
        .catch(function(error) {
          console.log(error, 'HEY YOU HAVE AN ERROR');
        })

    },
    methods: {
      createMap: function() {
        console.log('YOU IN MOUNTED');
        let bounds = new google.maps.LatLngBounds();
        let mapElement = document.getElementById('mapId')
        let mapCenter = this.markerCoordinates[0]
        let options = {
          center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude)
        }
        let map = new google.maps.Map(mapElement, options);

        // loop through coordinates in the markerCoordinates array
        this.markerCoordinates.forEach(function(coordinate) {
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
          map.fitBounds(bounds.extend(position))
        })
      }
    }

    // change mounted to created...do not use mounted when you need to fetch data on init from the server
    // mounted: function() {
    //   console.log('YOU IN MOUNTED');
    //   let bounds = new google.maps.LatLngBounds();
    //   let mapElement = document.getElementById('mapId')
    //   let mapCenter = this.markerCoordinates[0]
    //   let options = {
    //     center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude)
    //   }
    //   let map = new google.maps.Map(mapElement, options);
    //
    //   // loop through coordinates in the markerCoordinates array
    //   this.markerCoordinates.forEach(function(coordinate) {
    //     let position = new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
    //     let marker = new google.maps.Marker({
    //       position,
    //       map,
    //       animation: google.maps.Animation.DROP,
    //       icon: {
    //         url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
    //         anchor: new google.maps.Point(30, 30),
    //         scaledSize: new google.maps.Size(25, 30)
    //       }
    //     })
    //     map.fitBounds(bounds.extend(position))
    //   })
    // }
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
