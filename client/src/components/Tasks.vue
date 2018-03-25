<template>
<div class="tasks">

  <div class="row">
    <div class="col-md-12">
      <sideNav></sideNav>
    </div>
  </div>

<div class = "row">
  <div class = "col-sm-2">
  </div>
  <div class = "taskContainer col-sm-10">
  <span class="pull-right">
<button class="btn btn-danger" v-on:click="clearList($event)"><span
></span>Clear Tasks</button>
  </span>

  <br></br>


  <!--  New Task Form-->
  <form class="form-tasks" @submit.prevent="addTask">
    <div class="row">

      <div class="col-sm-2">
        <span class="input-group-btn">
    <button class="btn btn-default" type="submit"><span
  class="glyphicon glyphicon-plus"></span> Add Task</button>
        </span>
      </div>

      <div class="col-sm-8">
        <input type="text" class="form-control" v-model="newTask.item" placeholder="Add a task" required autofocus>
      </div>

      <div class="col-sm-2">
        <datepicker format="MMM dd yyyy" type="date" v-model="newTask.task_date" placeholder="Select a Date"></datepicker>
      </div>
    </div>
  </form>

  <!-- Tasks List -->

  <div class="row taskList">
    <ul class="list-group" v-for="(task, index) in tasksArr[0][0]" v-model="tasksArr">


      <li class="list-group-items clearfix task" v-bind:class="{complete:task.completed, notComplete: !task.completed}">

        <div class="list-items">
          <span class="pull-left">

      <div class="lead"><b>{{task.item}}</b></div>
    </span>
          <span class="pull-left">
        <div class="lead">  &nbsp; {{ formatDate(task.task_date)}}</div>
    </span>
        </div>
        <div>
          <span class="pull-right">

<button class="btn btn-default btn-xs" type="button" v-on:click="updateTask(index)"><span class="glyphicon glyphicon-pencil"></span></button>

          <button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-ok"
  v-on:click="completeTask($event, task.id)"></span></button>


          <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
v-on:click="deleteTask($event, task.id)"></span></button>
          </span>
        </div>

        <!-- Edit Task Form inside List -->
        <div class="col">
          <div>
            <form id="edit-task" v-if="index == activeTask && showEditForm">
              <br></br>
              <div class="col-sm-2">
              </div>

              <div class="col-sm-8">

                <div class="row">
                  <span class="input-group-btn">
              <button v-on:click="editTask($event, editedTask.item, editedTask.task_date, task)" class="btn btn-default" type="submit"><span
            class="glyphicon glyphicon-plus"></span> Update Task</button>
                  </span>

                </div>
                <div class="row">
                  <input type="text" class="form-control" id="edited-email" :placeholder="task.item" v-model="editedTask.item">
                </div>

                <div class="row">
                  <datepicker format="MMM dd yyyy" type="date" v-model="editedTask.task_date" :placeholder="formatDate(task.task_date)"></datepicker>
                  </div>

              </div>
              <div class="col-sm-2">
              </div>
            </form>
          </div>
        </div>
      </li>
    </ul>
  </div>

</div>

<div class = "col-sm-1">
</div>

</div>
</div>
</template>

<script>
import axios from 'axios';
import Nav from './Nav'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import sideNav from './sideNav.vue'

export default {
  name: 'Tasks',
  components: {
    Datepicker,
    sideNav
  },
  data() {
    return {
      tasksArr: [],
      newTask: {
        user_id: window.localStorage.id,
        item: '',
        task_date: ''
      },
      editedTask: {
        item: '',
        task_date:''
      },
      showEditForm: false,
      activeTask: -1

    }
  },

  mounted: function() {
    this.getTasks()
    this.checkSession();
  },
  methods: {
    checkSession: function(){
      let self = this;
      if (!localStorage.sessionData){
        console.log("is it getting in here");
        self.$router.push('/login')
      }
    },

    formatDate: function(date) {
      if (date === null){
        return "";
      }else {
        return moment(date).format("ddd MMM DD YY");
      }

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
          self.newTask.item = ""
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    updateTask: function(indexClicked) {
      let self = this;
      self.activeTask = indexClicked;
      self.showEditForm = !self.showEditForm;
    },

    editTask(event, item, date, task) {
      console.log(item, date, 'data being sent over from edit task');

      let self = this;
      let id = window.localStorage.id;
      let taskId = task.id;
      self.showEditForm = false;

      if (date === ''){
        console.log('what up');
        date = task.task_date

      }if (item === ''){
        console.log('what up');
        item = task.item
      }

      let updateTask = {item:item, task_date:date}
      console.log(updateTask, 'task being sent over to backend');


      axios.put(`http://localhost:8881/tasks/${id}/${taskId}/update`, updateTask)
        .then(function() {
          self.editedTask.item = "";
          self.editedTask.task_date = "";
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    completeTask(event, taskId) {
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/tasks/${id}/${taskId}/completeTask`)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    deleteTask(event, taskId) {
      let self = this;
      let id = window.localStorage.id;

      axios.delete(`http://localhost:8881/tasks/${id}/${taskId}`)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    clearList: function(event) {
      let self = this;
      axios.delete(`http://localhost:8881/tasks/clearCompletedTasks`)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });

    }

  }

}
</script>

<style scoped>
/* .taskContainer{
  margin-left: 1%;
} */

.form-tasks {
  margin-bottom: 2%;
}

ul {
  list-style: none;
}

.complete {
  background-color: gainsboro;
}

.notComplete {
  background-color: white;
}

.list-group-true {
  list-style: none;
  border-radius: 5px;
}

#edit-task {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -37.5%;
  margin-left: -37.5%;
  width: 75%;
  height: 75%;
  background-color: grey;
  z-index: 10;
}

.edit-task-form {
  position: fixed;
  top: 25%;
  left: 25%;

  background-color: blue;
}
</style>
