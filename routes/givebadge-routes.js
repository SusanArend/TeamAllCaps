var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.post("/badge/post", 
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req,res){
		db.employ_badge.create({
			sender_name: req.user.name,
			recipient_name: req.body.recipient,
			badgeid: req.body.badgeid,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/display");
		})
	});

	app.get("/givebadge",
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req, res){
			var hbsObject = {
				user: req.user
			}
			res.render("givebadge",hbsObject);
		})
};