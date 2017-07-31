
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Determine our connection
// =============================================================
if (PORT === 8080) {
    var authentication = require("./config/authentication.js");
} else {
    console.log("Heroku connection");
    var authentication = process.env
};

// *** Dependencies
// =============================================================
var bodyParser = require("body-parser");
var setupPassport = require('./passport.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars");
var flash=require("connect-flash");

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
app.use(flash());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
//Note: Above should do same as:  app.use(express.static("./public")); process.cwd() reads current directory


// Routes =============================================================


// Initialize Passport and restore authentication state, if any, from the
// session.
setupPassport(app);

// Set Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
//======


require("./routes/display-routes.js")(app);
require("./routes/givebadge-routes.js")(app);
require("./routes/landing-routes.js")(app);
require("./routes/faq-routes.js")(app);
require("./routes/profile-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
    });
});
