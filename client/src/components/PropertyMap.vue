<template>
<div>
  <input id="search-input" class="controls" type="text" placeholder="Search Box">
  <div class="property-map" id="mapId">
  </div>
</div>

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

      /* -----------------------------------------
        create map
       -----------------------------------------*/
      function initMap() {

        let mapElement = document.getElementById('mapId')
        let options = {
          center: new google.maps.LatLng(30.2672, -97.7431),
          zoom: 8
        }
        map = new google.maps.Map(mapElement, options);

        getDatabaseProperties()
      }

      /* -----------------------------------------
        get properties from the database
       -----------------------------------------*/
      function getDatabaseProperties() {

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
            createMarkers(markerCoordinates)
          })
          .catch(function(error) {
            console.log(error, 'HEY YOU HAVE AN ERROR');
          })
      }

      /* -----------------------------------------
        create the map search box
       -----------------------------------------*/
      function createSearchBox() {
        var searchMarkers = [];

        let input = document.getElementById('search-input');
        let searchBox = new google.maps.places.SearchBox(input);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // first search results return based on the map location
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // find location entered in search box
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
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
            map.fitBounds(bounds)

            // empty search box
            input.value = ''

            createMarkers(searchMarkers)
          })
        })
      }

      /* -----------------------------------------
        create markers on the map
       -----------------------------------------*/
      function createMarkers(markersArr) {
        let infowindow;
        let saveButton = '<button type="button">' + 'Save' + '</button>'

        markersArr.forEach(function(individualMarker) {

          if (markersArr.length > 1) {
            // add property address to info window
            infowindow = new google.maps.InfoWindow({
              content: '<p>' + '<a href="#">' + individualMarker.address + '</p>' + '</h1>'
            })
          } else {
            infowindow = new google.maps.InfoWindow({
              content: '<h6>' + individualMarker.name + '</h6>' + '<p>' + '<a href="#">' + individualMarker.address + '</p>' + '</h1>' + saveButton
            })
          }

          let position = new google.maps.LatLng(individualMarker.latitude, individualMarker.longitude)

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

          marker.addListener('click', function() {
            infowindow.open(map, marker)
          })

        })
        createSearchBox()
      }

      initMap()
    }
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









<!--
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

    // create search box
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // first search results return based on the map location
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // find location entered in search box
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        //Create a marker for each place.

        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
        console.log(markers, 'hey markers');

        var infowindow = new google.maps.InfoWindow({
          content: '<p>' + '<a href="#">' + markers[0].title + '</a>' + '</p>'
        });

        markers[0].addListener('click', function() {
          infowindow.open(map, markers[0])
        })


        console.log(markerCoordinates, 'MARKER COORDINATES AFTER NEW');
        // change the map view if the marker is off the screen
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds)
      })
    })

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
            content: '<p>' + '<a href="#">' + coordinate.address + '</p>' + '</h1>'
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
          marker.addListener('click', function() {
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
 -->
