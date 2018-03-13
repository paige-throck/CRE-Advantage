/*jshint esversion: 6 */

//initialize the vue application
import Vue from 'vue';
//import the app.vue file which is the root component of the application
import App from './App';



new Vue ({
  el: '#app', // render in the div with #app in index.html
  template: '<App/>', // this is everything in the app.vue
  components: {App} // list of vue.js components used in the template
});
