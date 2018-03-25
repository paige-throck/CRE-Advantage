<template>
<div class="row SmallMapPage">
  <div class="property-map" id="mapId">
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SmallMap',
  props: ['property'],
  data() {
    return {
      markerCoordinates: [],
      map: null,
    }
  },
  mounted: function() {
  //  this.$forceUpdate();
    this.initMap()
  },
  methods: {
    initMap: function() {
      let mapElement = document.getElementById('mapId')
      let options = {
        center: new google.maps.LatLng(this.property[0].lat, this.property[0].lang),
        zoom: 8,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(mapElement, options);
      this.getDatabaseProperties()
    },
    getDatabaseProperties: function() {

      this.markerCoordinates.push({
        latitude: this.property[0].lat,
        longitude: this.property[0].lang,
        address: this.property[0].address
      })
      this.addMarker(this.markerCoordinates[0])
    },
    addMarker: function(individualMarker) {
      console.log('YO MARKERRRRRS');
      let self = this
      let position = new google.maps.LatLng(individualMarker.latitude, individualMarker.longitude)
      let marker = new google.maps.Marker({
        position: position,
        map: self.map,
        title: individualMarker.address,
        prop_type: individualMarker.prop_type,
        // icon: {
        //   url: 'https://image.flaticon.com/icons/svg/37/37481.svg',
        //   anchor: new google.maps.Point(30, 30),
        //   scaledSize: new google.maps.Size(25, 30)
        // }
      })
    },
  },
  watch: {
    property: function() {
      this.initMap()
    }
  }
}
</script>


<style scoped>
.SmallMapPage {
  width: 200px;
  height: 200px;
}
.property-map {
  width: 100%;
  height: 100%;
}
</style>
