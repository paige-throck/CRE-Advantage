const config = require('../knexfile.js')['development'];
// const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const session = require('express-session');

// filterInt - The function from MDN that confirms a particular value is actually an integer. Because parseInt isn't quite strict enough.
const filterInt = function(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
};

///////////GET ALL TASKS

router.get('/:id', (req, res, next)=>{
  let taskArr = [];
  let DateArr = [];
  const userId = filterInt(req.params.id);
  console.log(userId);
  knex('tasks').where('user_id', userId).select('*')
  .orderBy('id', 'asc')
  .then((tasks) => {
    console.log(tasks, 'bakend taks date');
  taskArr.push(tasks)
    res.json(taskArr);
  })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
  })

///////////GET SINGLE TASK

router.get('/:id/taskId', (req, res, next)=>{
  const userId = filterInt(req.params.id);
  const taskId = filterInt(req.params.taskId);

  knex('tasks').where(taskId, 'id').select('*')
  .then((task) => {
    console.log(task);
    res.json(task);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
  })


///////////CREATE NEW TASK

  router.post('/:id', (req,res,next)=>{
    console.log(req.body, 'body object');
    const task = req.body;
    const userId = filterInt(req.body.user_id)

    if (task.task_date === ""){
      task.task_date =  null
    } else {
      task.task_date = req.body.task_date;
    }

    knex('tasks').insert({
      user_id:userId,
      item:task.item,
      task_date: task.task_date,
    })
    .returning('*')
    .then((task)=>{
      res.json(task);
    })
    .catch((error)=>{
      console.log(error);
      res.sendStatus(500);
    })
  })


//////////////EDIT SINGLE TASK
router.put('/:id/:taskId/update', (req,res,next)=>{

  const userId = filterInt(req.params.id);
  const taskId = filterInt(req.params.taskId);
console.log(req.body);
  const item = req.body.item;
  const date = req.body.task_date;

  knex('tasks').where('id', taskId).update({'item':item, 'task_date':date})
  .then(() => {
    res.sendStatus(200);
  })
  .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
})


///////////////////Complete-Uncomplete TASK

router.put('/:id/:taskId/completeTask', (req,res,next)=>{

  const userId = filterInt(req.params.id);
  const taskId = filterInt(req.params.taskId);

  knex('tasks').where('id', taskId).select('*')
  .then(function(task){
    console.log(task[0], 'complete tasks');
    if (task[0].completed === true){

      return knex('tasks').where('id', task[0].id).update({completed: false})
    } else {
      console.log("Is my ifffff working");
      return knex('tasks').where('id', task[0].id).update({completed: true})
    }
  }).then(() => {
    res.sendStatus(200);
  })
  .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })

})


/////////////DELETE SINGLE TASK

router.delete('/:id/:taskId', (req, res, next)=>{
  const userId = filterInt(req.params.id);
  const taskId = filterInt(req.params.taskId);

  knex('tasks').where('id', taskId).del('*')
  .then(() => {
    res.send(200);
  })
  .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
  })


/////////////////////////Clear All Tasks
  router.delete('/clearCompletedTasks', (req, res, next)=>{
    console.log(req.body, "clear tasks");

    knex('tasks').where('completed', true).del('*')
    .then(() => {
      res.send(200);
    })
    .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      })
    })



module.exports = router;
