'use strict';
// Setting up express, express-session, path, and body parser.
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8081;

// Requiring the code for the accounts, profile, properties, tasks and map routes.
// const accountsRoute = require('./routes/accounts.js');
// const profileRoute = require('./routes/profile.js');
// const propertiesRoute = require('./routes/properties.js');
// const tasksRoute = require('./routes/tasks.js');
// const mapsRoute = require('./routes/maps.js');


// Disabling the x-powered-by: Express header, for security.
app.disable('x-powered-by');


// Middleware. Body-Parser and Morgan.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

// Middleware. Setting up session.
app.use(session({
  secret: 'commerical real estate',
  resave: false,
  saveUninitialized: true,
  cookie : {
    secure : false
  }
}));

// app.use('/accounts', accountsRoute);
// app.use('/profile', profileRoute);
// app.use('/properties', propertiesRoute);
// app.use('/tasks', tasksRoute);
// app.use('/maps', mapsRoute);


console.log('Are you working?');

// Turning on listening on the specified port.
app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
