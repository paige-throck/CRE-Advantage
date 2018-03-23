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

////Get Tasks for profile

router.get('/:id/tasks', (req, res, next)=>{
console.log("Are you working???");
  const userId = filterInt(req.params.id);

  console.log(userId);
  knex('tasks').where('user_id', userId)
  .whereIn('completed', false)
  .select('*')
  .orderBy('id', 'asc')
  .then((tasks) => {
    res.json(tasks);
  })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
  })


//// Get user for update account
router.get('/:id', (req, res, next) => {
    const id = filterInt(req.params.id);

    knex('users').where('id', id).select('*')
        .then((user) => {
            res.json(user);
        })
        .catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        })
});


/////Update Email
router.patch('/email/:id', (req, res, next) => {
    const id = filterInt(req.params.id);
    const email = req.body.email;
                knex('users').where('id', id).update({
                        email: email
                    })
                    .then(function(results) {
                        res.sendStatus(200)
                        })
                        .catch(function(error) {
                            console.log(error);
                            res.sendStatus(500);
                          })

});



///////Update info
router.put('/:id/info', (req, res, next) => {
    const id = filterInt(req.params.id);
    let name = req.body.name;
    let city = req.body.city + ", " + req.body.state;

    knex('users').where('id', id).update({
            name: name,
            city: city
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        })
});


///////////Update Password
router.put('/:id/password', (req, res, next) => {
    console.log(req.body, "body");
    const id = filterInt(req.params.id);

    const passObj = req.body
    const newHash = bcrypt.hashSync(passObj.newPassword, 10)

    knex('users').select('*').where('id', id)
    .then(function(result){
      return bcrypt.compare(passObj.oldPassword, result[0].password)
      .then(function(passCheck){
        console.log(passCheck, "what is this thing?");
        if (passCheck){
          return knex('users').where('id', id).update({password:newHash})
        } else { // If passwords don't match, send a 401.
          return res.sendStatus(401);
        }
      })
      .then(function(){
        res.sendStatus(200)
      })
      .catch(function(error) {
          console.log(error);
          res.sendStatus(500);
      })
    })
});
////////////// Update Task

router.put('/updateTask/:id/:taskId', (req,res,next)=>{

  const userId = filterInt(req.params.id);
  const taskId = filterInt(req.params.taskId);
  const complete = req.body.completed;

  knex('tasks').where('id', taskId).update({'completed':true})
  .then(() => {
    res.sendStatus(200);
  })
  .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
  })


module.exports = router;
