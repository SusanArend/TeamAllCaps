var db = require("../models");

module.exports =  function(app){
	app.get("/faq", 
	require('connect-ensure-login').ensureLoggedIn("/login"),
	function(req, res){
		var hbsObject = {
			user : req.user, //feed logged in user info into main.handlebars
		}
		res.render("faq", hbsObject);
	})
}
