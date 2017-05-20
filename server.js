var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var exphbs = require("express-handlebars")


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findbyusername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();

// Set Handlebars
var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
//Above should do same as:  app.use(express.static("./public")); process.cwd() reads current directory

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Routes
//======


require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our express app
//DONT USE FORCE TRUE FOR PRODUCTION
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


///TODO Delete:  This is initial test routing, now included in html-routes.js
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });

// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });
  
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
  
// app.get('/logout',
//   function(req, res){
//     req.logout();
//     res.redirect('/');
//   });

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });

// app.listen(3000);

// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));

// app.use(bodyParser.urlencoded({ extended: false }));

// // Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// // Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
// var routes = require("./controllers/burgers_controller.js");

// app.use("/", routes);





//TODO:  Delete below.  Sample text from old server.js files




// // *****************************************************************************
// // Server.js - This file is the initial starting point for the Node/Express server.
// //
// // ******************************************************************************
// // *** Dependencies
// // =============================================================
// var express = require("express");
// var bodyParser = require("body-parser");

// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = process.env.PORT || 8080;

// // Requiring our models for syncing
// var db = require("./models");

// // Sets up the Express app to handle data parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// // Static directory
// app.use(express.static("./public"));

// // Routes =============================================================

// require("./routes/html-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);

// // Syncing our sequelize models and then starting our express app
// //DONT USE FORCE TRUE FOR PRODUCTION
// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });
