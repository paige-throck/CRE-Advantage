
<template>
<div class="tasks">

<router-link to="/profile">CRE Advantage</router-link>


<Nav></Nav>

{{ tasksArr }}

<ul id="taskList">
  <li v-for="task in tasksArr[0]">
    {{ task.item }}
    {{ task.task_date }}
  </li>
</ul>

</div>
</template>

<script>

import axios from 'axios';
import Nav from './Nav'

console.log(localStorage.id, "User id");

export default {

  name: 'Tasks',
  data(){
    return {
       tasksArr: []
    }
  },
  mounted: function(){
    let self = this;
    let id = window.localStorage.id;
    axios.get(`http://localhost:8881/tasks/${id}`)
    .then(function(results){
      console.log(results.data[0], 'results from get tassks');
     self.tasksArr.push(results.data);

    })
  }
}
</script>
local
<style>

</style>
