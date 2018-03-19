
<template>
<div class="row tasks">
  <Nav></Nav>

<div class="form">
    <div class="input-group">
      <input type="text" class="form-control" v-model="task.item">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" v-on:click="addTask()"><span
          class="glyphicon glyphicon-plus"></span> Add Task</button>
      </span>
    </div><!-- /input-group -->
  </div>
<hr/>

    <ul class="list-group" v-show="tasksArr[0].length > 0">
      <li class="list-group-item clearfix task" v-for="task in tasksArr[0]" v-bind:class="{disabled: task.done}">
        <p class="lead">{{task.item}}</p>
        <div>
          <span class="pull-right">
        <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil"
          v-on:click="editTask(task)"></span></button>
          <button class="btn btn-primary btn-xs" v-show="!task.done"><span class="glyphicon glyphicon-ok"
          v-on:click="doneTask($index)"></span></button>
          <button class="btn btn-primary btn-xs" v-show="task.done"><span class="glyphicon glyphicon-repeat"
          v-on:click="unDoneTask($index)"></span></button>
          <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
          v-on:click="deleteTask($event, task.id)"></span></button>
          </span>
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav'

console.log(localStorage.id, "User id");

export default {

  name: 'Tasks',
  data() {
    return {
      tasksArr: [],
      task:{
        user_id: window.localStorage.id,
        item: '',
        task_date:''
      }
    }
  },
  mounted: function() {
    let self = this;
    let id = window.localStorage.id;

    axios.get(`http://localhost:8881/tasks/${id}`)
      .then(function(results) {
        console.log(results.data, 'results from get tassks');
        self.tasksArr.push(results.data);
      })
  },
  methods: {
    addTask() {
      let self = this;
      let id = window.localStorage.id;
      axios.post(`http://localhost:8881/tasks/${id}`, this.task)
      .then(function (task) {
        console.log('Add task working');
        }).catch(function (error) {
            console.log(error);
        });
      },

      deleteTask(event, taskId){
        let self = this;
        let id = window.localStorage.id;

        console.log(taskId, "the task id");
        console.log(id, 'user id');

        axios.delete(`http://localhost:8881/tasks/${id}/${taskId}`)
        .then(function () {

          }).catch(function (error) {
              console.log(error);
          });
      },

      editTask(){
        let self = this;
        let id = window.localStorage.id;

        axios.put(`http://localhost:8881/tasks/${id}/${taskId}`, this.task)
        .then(function () {

          }).catch(function (error) {
              console.log(error);
          });
      }
  }

}
</script>



<style scoped>


</style>
