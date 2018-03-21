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
  })

module.exports = router;
