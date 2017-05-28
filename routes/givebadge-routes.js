var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.post("/badge/post", 
		require('connect-ensure-login').ensureLoggedIn(),
		function(req,res){
		db.employ_badge.create({
			sender_name: req.user.name,
			recipient_name: req.body.recipient,
			badgeid: req.body.badgeid,
			badgeurl: req.body.badgeurl,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/display")
		})
	});
}