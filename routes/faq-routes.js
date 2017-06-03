var db = require("../models");
var authentication = require("../config/authentication.js");

module.exports =  function(app){
	app.get("/faq", 
	require('connect-ensure-login').ensureLoggedIn("/login"),
	function(req, res){
		res.render("faq");
	})
}
