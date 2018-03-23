<template>
<div class="row proTasks">

  <div class="row taskList">
    <ul class="list-group" v-for="protask in protasksArr" v-model="protasksArr">
      <li class="list-group-items clearfix task">

        <div class="list-items">


          <div class="lead"><b>{{protask.item}}</b></div>

        </div>

        <div>
        <span class="pull-right">
          <button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-ok"
  v-on:click="proCompleteTask($event, protask.id)"></span></button>



          </span>
        </div>

      </li>
    </ul>

  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ProTasks',

  data() {
    return {
      protasksArr: [],
    }
  },

  mounted: function() {
    this.getProTasks()

  },
  methods: {
    formatDate: function(date) {
      return moment(date).format("ddd,MMM,DD,YYYY");
    },

    getProTasks() {
    let taskDate;
    let currentDate = new Date();
    let dateString = currentDate.toString().split(' ');
    let newDate =  dateString.splice(0, 4).join();
    let self = this;
    let id = window.localStorage.id;

      axios.get(`http://localhost:8881/profile/${id}/tasks`)
        .then(function(results) {
          self.protasksArr = [];

          for (let i = 0; i < results.data.length; i++) {

            taskDate = self.formatDate(results.data[i].task_date)
          

            if (taskDate === newDate) {
              console.log("is this working?");
              self.protasksArr.push(results.data[i]);
            }
          }



        })
    },

    proCompleteTask(event, taskId) {
      console.log('is this working??');
      console.log(taskId);
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/profile/updateTask/${id}/${taskId}`)
        .then(function() {
          self.getProTasks();
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
}
</script>




<style scoped>
.proTasks {
  margin: 5%;
}

ul {
  list-style: none;
}
</style>
