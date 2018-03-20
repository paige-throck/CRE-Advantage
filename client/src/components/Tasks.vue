
<template>
<div class="row tasks">
  <Nav></Nav>

  <span class="pull-right">
  <button class="btn btn-danger" on:click="clearList"><span
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
        <div class='input-group date' ref="datetimepicker">
          <input type="text" class="form-control" v-model="newTask.task_date" />
          <span class="input-group-addon">
          <span class="glyphicon glyphicon-calendar"></span>
          </span>
      </div>
    </div>
    </div>
  </form>

<!-- Tasks List -->


<div class="row taskList">

  <ul class="list-group" v-for="task in tasksArr[0]" v-model="tasksArr">
    <li class="list-group-item clearfix task">
      <span class="pull-left">
          <div class="lead">{{task.item}} </div>
      </span>
      <span class="pull-left">
          <div class="lead">  {{task.task_date}}</div>
      </span>
      <div>
        <span class="pull-right">

<button class="btn btn-default btn-xs" data-toggle="collapse" href="#edit-task" role="button" aria-expanded="false" aria-controls="suites"><span class="glyphicon glyphicon-pencil"
  v-on:click="updateTask()"></span></button>

        <button class="btn btn-primary btn-xs" v-show="!task.done"><span class="glyphicon glyphicon-ok"
  v-on:click="completeTask($event, task.id)"></span></button>



        <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"
  v-on:click="deleteTask($event, task.id)"></span></button>
        </span>
      </div>
    </li>
  </ul>
</div>


<!-- Edit Task Form -->
<div class="col">
  <div class="collapse multi-collapse" id="edit-task">
    <div class="card card-body">
      <form class="form-tasks" @submit.prevent="editTask">

        <div class="row">
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="newTask.item" placeholder="Add a task" required autofocus>
          </div>

          <div class="col-sm-2">
            <div class='input-group date' ref="datetimepicker">
              <input type="text" class="form-control" v-model="newTask.task_date" />
              <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>

          <div class="col-sm-2">
            <span class="input-group-btn">
                <button class="btn btn-default" type="submit"><span
              class="glyphicon glyphicon-plus"></span> Add Task</button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
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
    // $(this.$refs.datetimepicker).datetimepicker()

  },
  methods: {
    // updateTime(event) {
    //   this.$emit('input', event.target.value);
    // },

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
    editTask() {
      let self = this;
      let id = window.localStorage.id;

      axios.put(`http://localhost:8881/tasks/${id}/${taskId}`, this.task)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    completeTask(event , taskId){
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

      console.log(taskId, "the task id");
      console.log(id, 'user id');

      axios.delete(`http://localhost:8881/tasks/${id}/${taskId}`)
        .then(function() {
          self.getTasks();
        }).catch(function(error) {
          console.log(error);
        });
    },

    clearList: function() {

    }


  }

}
</script>

<style scoped>
.tasks {
  margin: 5%;
}

.form-tasks {
  margin-bottom: 2%;
}

.wrap {
  height: 50vh;
  display: flex;
}

main {
  flex: 1;
  display: flex;
}

aside {
  overflow-y: scroll;
  padding: 2em;
}


aside {
  flex: 1;
}

</style>
