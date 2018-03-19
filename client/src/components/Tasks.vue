
<template>
<div class="row tasks">
  <Nav></Nav>


  <form class="form-tasks" @submit.prevent="addTask">

    <div class="row">
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="newTask.item" placeholder="Add a task" required autofocus>
      </div>

      <div class="col-sm-2">
        <div class='input-group date' ref="datetimepicker">
          <input type="text" class="form-control" v-model="newTask.task_date"/>
          <span class="input-group-addon">
          <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <span class="input-group-btn">
            <button class="btn btn-default" type="submit"><span
          class="glyphicon glyphicon-plus"></span> Add Task</button>
        </span>
      </div>
      <div class="col-sm-10">
      </div>
    </div>
  </form>



  <div class="row taskList">
    <ul class="list-group" v-for="task in tasksArr[0]" v-model="tasksArr">
      <li class="list-group-item clearfix task">
        <p class="lead">{{task.item}}</p>
        <div>
          <span class="pull-right">
        <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil"
          v-on:click="editTask($event, task)"></span></button>
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




export default {
  name: 'Tasks',
  data() {
    return {
      tasksArr: [],
      newTask: {
        user_id: window.localStorage.id,
        item: '',
        task_date: ''
      }
    }
  },
  mounted: function() {
    this.getTasks()
    $(this.$refs.datetimepicker).datetimepicker()

  },
  methods: {
    updateTime(event){
      this.$emit('input', event.target.value);
    },

    getTasks() {
      let self = this;
      let id = window.localStorage.id;

      axios.get(`http://localhost:8881/tasks/${id}`)
        .then(function(results) {
          console.log(results.data, 'Results from Get Tasks');
          self.tasksArr = [];
          self.tasksArr.push(results.data);
        })
    },
    addTask() {
      console.log(this.newTask, "New Task being created!!");
      let self = this;
      let id = window.localStorage.id;
      axios.post(`http://localhost:8881/tasks/${id}`, this.newTask)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    deleteTask(event, taskId) {
      let self = this;
      let id = window.localStorage.id;

      console.log(taskId, "the task id");
      console.log(id, 'user id');

      axios.delete(`http://localhost:8881/tasks/${id}/${taskId}`)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    editTask() {
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/tasks/${id}/${taskId}`, this.task)
        .then(function() {

        }).catch(function(error) {
          console.log(error);
        });
    }
  }

}
</script>



<style scoped>


</style>
