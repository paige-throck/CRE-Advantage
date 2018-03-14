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

function restrict(req, res, next) {
    try {
        if (req.session.email) {
            next();
        } else {
            res.send('failed');
            res.end();
        }
    } catch (err) {
        res.send('failed');
        res.end();
    }
};


router.post('/', (req, res) => {
    let userObj = req.body;
    console.log(userObj);
    knex.select('*').from('users').where('email', userObj.email)
        .then((result) => {
            console.log(result, "login post result");
            if (result.length === 0) {
                return res.send('no account with that email');
            }
            return bcrypt.compare(userObj.password, result[0].password)
                .then((loginCheck) => {
                    if (loginCheck) { // If the passwords match, login and redirect to their bits page.
                        res.cookie('user', '1', {
                            maxAge: 900000,
                            httpOnly: true,
                            expries: false
                        });
                        req.session.user_id = result[0].id;
                        req.session.email = result[0].email;


                        console.log('Session id', req.session.id);

                        // return res.redirect(`/profiles/${req.session.userID}`);
                        res.send({
                            id: req.session.user_id,
                            email: req.session.email
                        })

                    } else { // If passwords don't match, send a 401.
                        return res.sendStatus(401);
                    }
                })
        })
});


module.exports = router;
