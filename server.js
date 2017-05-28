
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// *** Dependencies
// =============================================================
var bodyParser = require("body-parser");
var setupPassport = require('./passport.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars");


// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//Setting up login session
app.use(cookieParser())
app.use(session({ secret: 'friedbanana', resave: false, saveUninitialized: false }))

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
require("./routes/landing-routes.js")(app);
//Note: Above should do same as:  app.use(express.static("./public")); process.cwd() reads current directory


// Routes =============================================================


// Initialize Passport and restore authentication state, if any, from the
// session.
setupPassport(app);

// Set Handlebars
var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//Routes
//======


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
//IMPORTANT TODO:  DONT USE FORCE TRUE FOR PRODUCTION

// require("./routes/html-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
