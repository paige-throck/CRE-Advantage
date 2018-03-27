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
      console.log(results, 'MMMMMM');
      res.send(results);
    });
});


// get user location
router.get('/user/:id', function(req, res) {
  knex('users').where('id', req.params.id).select('city')
    .then(function(results) {
      console.log(results, 'i am a userrrrrrrr');
      res.send(results);
    });
});


// get individual property info
router.get('/:id/:prop_id', function(req, res) {
  console.log('WTF');
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
          console.log(resultsArr, 'RESULTS FROM SUITES');
          res.send(resultsArr);
        });
    });
});









// edit suite
router.patch('/suite/:suite_id', function(req, res) {
  console.log(req.body, 'HEY SUITE REQ BODY IN THE SUITE PATCH');
  console.log(req.params, 'HEY SUITE REQ PARAMS IN THE SUITE PATCH');


  knex('suites').where('id', req.params.suite_id)
    .update(req.body)
    .then(function(results) {
      if (results == 1) {
        console.log('HEY SUITE PATCH WORKED');
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
});


// edit existing note
router.patch('/note/:id', function(req, res) {
  let editNote = req.body;
  console.log(req.body, 'THE BODY THE BODY');

  knex('property_notes').where('id', req.params.id)
    .then(function(results) {
      results[0].notes[editNote.noteIndex] = editNote.content;

      knex('property_notes').where('id', req.params.id)
        .update({
          notes: results[0].notes
        })
        .then(function(results) {
          console.log(results, 'hey results in the note patch');
          if (results == 1) {
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        });
    }).catch(function(error) {
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
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
});


// save a new property to a user's database from map
router.post('/save', function(req, res) {
  let property = {
    lat: req.body.latitude,
    lang: req.body.longitude,
    address: req.body.address,
    prospective_prop: req.body.prospective_prop,
    user_id: req.body.id
  };

  return knex('properties').insert(property)
    .then(function(results) {
      console.log('HEY I INSERTED A PROPERTY');
      res.send(results);
    });
});



// save a new property to a user's database from form
router.post('/new', function(req, res) {
  console.log(req.body, 'ASFLKJASFL;KAFSKLJSFKJLSFADKLJAFSLJKAFSLKJASFLKJ');
  return knex('properties').insert(req.body)
    .then(function(results) {
      console.log('HEY I INSERTED A PROPERTY in the newwwww');
      res.send(results);
    });
});





// save a new note for a property
router.post('/note/new', function(req, res) {
  let newNote = req.body.content;
  let id = req.body.id
  let prop_id = req.body.prop_id
  let newNoteArr = []

  newNoteArr.push(newNote)
  console.log(req.body, 'HEY I AM THE BODY IN THE NOTE');

  if (id !== "") {


    // check to see if note id exists in the table
    knex('property_notes').where('id', id)
      .then(function(results) {

        let existingNotes = results[0].notes;
        existingNotes.push(newNote);

        return knex('property_notes').where('id', id)
          .update({
            notes: existingNotes
          });
      })
      .then(function(results) {
        console.log('WOO YOU FINALLY WORKED');
        res.sendStatus(200);
      });

  } else {
    knex('property_notes').insert({
      // id: id,
      prop_id: prop_id,
      notes: newNoteArr
    })
    .then(function(results) {
      console.log('WOO JESUS NOTE');
      res.sendStatus(200);
    });
  }
});






router.post('/suite/new', function(req, res) {
  console.log(req.body, 'hey i am the body in your new suite post')

  return knex('suites').insert(req.body)
    .then(function(results) {
      console.log(results, 'HEY RESULTS IN THE POST BODY SUITE');

      // knex('properties').where('id', req.body.prop_id)
      //   .then(function(results) {
      //     console.log(results, 'HEY RESULTS');
      //
      //     knex('properties').where('id', req.body.prop_id)
      //       .update({
      //         num_suites: results[0].num_suites + 1
      //       })
      //       .then(function(results) {
      if (results) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
      //     });
      // });
    });
});


// delete a property
router.delete('/:prop_id', function(req, res) {
  knex('properties').where('id', req.params.prop_id)
    .del()
    .then(function(results) {
      console.log('heyyyy delete');
      if (results == 1) {
        console.log('HEY SUITE DELETE WORKED');
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
});




// delete suite
router.delete('/suite/:suite_id', function(req, res) {
  console.log(req.body, 'HEY SUITE REQ BODY IN THE SUITE DELETE');
  console.log(req.params, 'HEY SUITE REQ PARAMS IN THE SUITE DELETE');


  knex('suites').where('id', req.params.suite_id)
    .del()
    .then(function(results) {
      if (results == 1) {
        console.log('HEY SUITE DELETE WORKED');
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
});




// delete a note
router.delete('/note/:notes_id/:note_index', function(req, res) {
  console.log(req.params.note_index, 'NOTE INDEX');
  knex('property_notes').where('id', req.params.notes_id)
    .then(function(results) {
      results[0].notes.splice(req.params.note_index, 1);

      knex('property_notes').where('id', req.params.notes_id)
        .update({
          notes: results[0].notes
        })
        .then(function(results) {
          console.log(results, 'hey results in the note patch');
          if (results == 1) {
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        });
    }).catch(function(error) {
      console.log('THERE BE AN ERROR IN YOUR NOTE PATCH');
    });
});




module.exports = router;
