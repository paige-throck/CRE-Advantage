'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
// const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 8881;
const http = require('http');


const cors = require('cors')
const expressCors = require('express-cors')



const login = require('./routes/login')
const signup = require('./routes/signup')
const profile = require('./routes/profile')
const properties = require('./routes/properties')
const tasks = require('./routes/tasks')
const maps = require('./routes/maps')



app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))
app.use(morgan("dev"));
app.use(cors())
app.use(expressCors({
    allowedOrigins: [
        'http://localhost:3000/'
    ]
}))
console.log("HEY WHAT the helll is going on?????????");
//Setting up session
app.use(session({
    secret: 'drinking all the wine',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.all('*', function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

});



app.use('/login', login);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/properties', properties);
app.use('/tasks', tasks);
app.use('/maps', maps);



app.set('port', port);
// Create HTTP server.

const server = http.createServer(app);

// Listen on provided port, on all network interfaces.

server.listen(port);

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// app.get('/', (req, res, next) => {
//     if (req.session.userID) {
//         res.redirect(`/profiles/${req.session.userID}`);
//     } else {
//         next();
//     }
// });


app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    console.log(err)
    res.status(err.status || 500)
    res.json(err)
})



module.exports = app
