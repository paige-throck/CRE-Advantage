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

router.post('/', (req, res) => {
    console.log(req.body, 'body object');
    let newUserObj = req.body;

    knex.select('email').from('users').where('email', newUserObj.email)
        .then((result) => {
            if (result.length !== 0) {
                return res.send('Email exists');
            }
            return bcrypt.hash(newUserObj.password, 10, (err, hash) => {
                    newUserObj.hashpw = hash;
                    knex('users').returning('*').insert({
                            name: newUserObj.name,
                            city: newUserObj.city,
                            email: newUserObj.email,
                            password: newUserObj.hashpw
                        })
                        .then(() => {
                            console.log('did it work?');
                        })
                })
                .then(() => {
                    res.sendStatus(200);
                });
        })

        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
});





module.exports = router;
