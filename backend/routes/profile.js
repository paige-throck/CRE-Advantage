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


router.get('/:id', (req, res, next)=>{
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

  router.put('/:id/email', (req, res, next)=>{
    const id = filterInt(req.params.id);
    const email = req.body.email
    knex('users').where('id', id).update({email: email})
    .then(() => {
      res.sendStatus(200);
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      })
    });

  router.put('/:id/info', (req, res, next)=>{
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

      router.put('/:id/password', (req, res, next)=>{
        console.log(req.body, "body");
        const id = filterInt(req.params.id);

        const oldPass = req.body.oldPassword;

        const newPass = req.body.newPass;

        knex('users').where('id', id).select('password')
        .then(function(password){
            return  bcrypt.compare(password, oldPass)
            console.log(bcrypt.compare(password, oldPass));
        })
        .then(() => {
          res.sendStatus(200);
          })
          .catch(function(error) {
            console.log(error);
            res.sendStatus(500);
          })
        });

module.exports = router;
