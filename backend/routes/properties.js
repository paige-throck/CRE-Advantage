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



// get all properties that a user has saved
router.get('/:id', function(req, res) {
  knex('properties').where('user_id', req.params.id)
    .then(function(results) {
      res.send(results);
    });
});


// get individual property info
router.get('/:id/:prop_id', function(req, res) {
  let resultsArr = [];
  knex('properties').where('user_id', req.params.id)
  .andWhere('properties.id', req.params.prop_id)
  .then(function(results) {
    resultsArr.push(results);
  })
  .then(function() {
    knex('suites').where('prop_id', req.params.prop_id)
    .then(function(results) {
      resultsArr.push(results);
    });
  })
  .then(function() {
    knex('property_notes').where('prop_id', req.params.prop_id)
    .then(function(results) {
      resultsArr.push(results);
      console.log(resultsArr, 'RESULTS PROPERTY NOTES');
      res.send(resultsArr);
    });
  });
});


// edit existing note
router.patch('/note/:id', function(req, res) {
  let editNote = req.body;
  console.log(req.body, 'THE BODY THE BODY');

  knex('property_notes').where('id', req.params.id)
    .then(function(results){
      results[0].notes[editNote.noteIndex] = editNote.content;

      knex('property_notes').where('id', req.params.id)
        .update({
          notes: results[0].notes
        })
        .then(function(results) {
          console.log(results, 'hey results in the note patch');
          if(results == 1) {
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        });
    }).catch(function(error){
      console.log('THERE BE AN ERROR IN YOUR NOTE PATCH');
    });
});


// edit existing property
router.patch('/:id/:prop_id', function(req, res) {
  console.log(req.body, 'HEY REQ BODY IN THE PATCH');
  console.log(req.params, 'HEY REQ PARAMS IN THE PATCH');


  knex('properties').where('user_id', req.params.id)
    .andWhere('properties.id', req.params.prop_id)
    .update(req.body)
    .then(function(results) {
      if (results == 1) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
})


// save a new property to a user's database
router.post('/save', function(req, res) {
  let property = {
    lat: req.body.latitude,
    lang: req.body.longitude,
    address: req.body.address,
    prospective_prop: req.body.prospective_prop,
    user_id: req.body.id
  };

  return knex('properties').insert(property)
    .then(function(results){
      console.log('HEY I INSERTED A PROPERTY');
      res.send(results);
    });
});


// save a new note for a property
router.post('/note/:id', function(req, res) {
  let newNote = req.body.content;

  // check to see if property id exists in the table
  knex('property_notes').where('id', req.params.id)
    .then(function(results) {
      if (results) {
        let existingNotes = results[0].notes;
        existingNotes.push(newNote);
        return knex('property_notes').where('id', req.params.id)
        .update({
          notes: existingNotes
        });
      } else {
        return knex('property_notes').insert({
          id: req.params.id,
          notes: newNote
        });
      }
    })
    .then(function(results) {
      console.log('WOO YOU FINALLY WORKED');
      res.sendStatus(200);
    });
});


// delte a note
router.delete('/note/:notes_id/:note_index', function(req, res) {
console.log(req.params.note_index, 'NOTE INDEX');
  knex('property_notes').where('id', req.params.notes_id)
    .then(function(results){
      results[0].notes.splice(req.params.note_index, 1)

      knex('property_notes').where('id', req.params.notes_id)
        .update({
          notes: results[0].notes
        })
        .then(function(results) {
          console.log(results, 'hey results in the note patch');
          if(results == 1) {
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        });
    }).catch(function(error){
      console.log('THERE BE AN ERROR IN YOUR NOTE PATCH');
    });
});





module.exports = router;
