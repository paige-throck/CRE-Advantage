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

///////GET ALL TASKS
router.get('/:id', (req, res, next)=>{
  const userId = filterInt(req.params.id);
  knex('tasks').where(userId, 'user_id').select('*')
  .then((tasks) => {
    console.log(tasks);
    res.json(tasks);
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


  /////////CREATE NEW TASK

  router.post('/:id'(req,res,next)=>{
    const task = req.params;

    knex('tasks').insert({
      user_id:task.user_id,
      item:task.item,
      task_date: task.date,
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



  /////////////EDIT SINGLE TASK




////////////DELETE SIGNLE TASK





module.exports = router;
