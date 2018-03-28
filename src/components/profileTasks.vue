<template>
<div class="col proTasks">

    <div class = "row">
    <ul class="list-group" id="taskList" v-for="protask in protasksArr" v-model="protasksArr">
      <li class="list-group-items clearfix task">

          {{protask.item}}

          <button class="btn btn-info btn-xs pull-right"><span class="glyphicon glyphicon-ok"
            v-on:click="proCompleteTask($event, protask.id)"></span></button>


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


$("#taskList li").each(function(task) {
  console.log('heyyyy');
    $(this).delay(100 * task).fadeIn(500);
});

</script>




<style scoped>
.proTasks {
  /* margin: 5%; */
  /* width: 100%; */
}

ul {
  list-style: none;
  margin-bottom: 3%;
}

.task {
  background-color: lightgoldenrodyellow;
  border-radius: 1%;
  box-shadow: 0px 0.5px 3px #202020;
  /* margin-bottom: 1%; */
  padding: 2%;
  animation-duration: .5s;
  animation-name: fadein;
}

@keyframes fadein {
  from {
    opacity: 0;
    width: 100%
  }

  to {
    opacity: 100%;
    width: 100%
  }
}
.btn {
  margin-left: 2%;
}




</style>
