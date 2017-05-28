// // *********************************************************************************
// // html-routes.js - this file offers a set of routes for sending users to the various html pages
// // *********************************************************************************

// // Dependencies
// // =============================================================
var path = require("path");

// // Routes
// // =============================================================
module.exports = function(app) {

//IMPORTANT NOTE:  FOR ALL ROUTES OTHER THAN LOGIN/LOGOUT:  make sure to include connect-ensure-login as a parameter, as in the following example:
// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
  //     res.render('profile', { user: req.user });
//   });

//Think this isn't necessary, since not using a seperate login page.
// app.get('/login', 
//    function(req, res){
//     //TODO:  Adust the following line of code as needed to use handlebars viewing
//     res.render('landing');
//   });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/landing' }),
  function(req, res) {
    //TODO:  Adust the following line of code as needed to use handlebars viewing
    res.redirect('/index');
  });
  
app.get('/logout',
  function(req, res){
    //TODO:  Adust the following line of code as needed to use handlebars viewing
    req.logout();
    res.redirect('/landing');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   //TODO:  Adust the following line of code as needed to use handlebars viewing 
   //res.render('profile', { user: req.user });
  });

app.get('/index',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   //TODO:  Adust the following line of code as needed to use handlebars viewing 
   //res.render('feed', { user: req.user });  });
};

app.get('/givebadge',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
   //TODO:  Adust the following line of code as needed to use handlebars viewing 
   //res.render('givebadge', { user: req.user });  });
};

app.get('/faq',
  function(req, res){
    //TODO:  Adust the following line of code as needed to use handlebars viewing
    // res.render('faq');
});










// // *********************************************************************************
// // html-routes.js - this file offers a set of routes for sending users to the various html pages
// // *********************************************************************************

// // Dependencies
// // =============================================================
// var path = require("path");

// // Routes
// // =============================================================
// module.exports = function(app) {

//   // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/blog.html"));
//   });

//   // cms route loads cms.html
//   app.get("/cms", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/cms.html"));
//   });

//   // blog route loads blog.html
//   app.get("/blog", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/blog.html"));
//   });

//   // authors route loads author-manager.html
//   app.get("/authors", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//   });

// };
