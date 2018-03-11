const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8888;


const usersRoute = require('./routes/users.js');
const propertiesRoute = require('./routes/properties.js');
const tasksRoute = require('./routes/tasks.js');
const mapsRoute = require('./routes/maps.js');

// Disabling the x-powered-by: Express header, for security.
app.disable('x-powered-by');

// Telling the application that when the status route is used, it will look in the public folder for resources.
app.use('/static', express.static(path.join(__dirname, 'public')));


// Middleware. Body-Parser and Morgan.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

// Middleware. Setting up session.
app.use(session({
  secret: 'market advantage',
  resave: false,
  saveUninitialized: true,
  cookie : {
    secure : false
  }
}));

app.use('/users', usersRoute);
app.use('/properties', propertiesRoute);
app.use('/tasks', tasksRoute);
app.use('/maps', mapsRoute);

// Middleware if user is logged in, passing them to /bits/:id if they are.
app.get('/', (req, res, next) => {
  if (req.session.userID) {
    res.redirect(`/profile/${req.session.userID}`);
  } else {
    next();
  }
});


// Turning on listening on the specified port.
app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
