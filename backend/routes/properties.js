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


router.get('/', function(req, res) {
  knex('properties')
    .then(function(results) {
      res.send(results)
    })
})

router.post('/', function(req, res) {
  console.log(req.body, 'REQ PARAMS IN ROUTE');
  let property = {
    lat: req.body.latitude,
    lang: req.body.longitude,
    address: req.body.address,
    prospective_prop: req.body.prospective_prop
  }

  return knex('properties').insert(property)
    .then(function(){
      console.log('HEY I INSERTED A PROPERTY');
    })
})



module.exports = router;
