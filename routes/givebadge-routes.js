var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.post("/badge/post", 
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req,res){
		//TODO: implement an if/else check to make sure all data exists - including a read query to check for recipient name?  unless its done beforehand.
		db.employ_badge.create({
			sender_name: req.user.name,
			recipient_name: req.body.recipient_name,
			badgeid: req.body.badgeid,
			//TODO: get badgeurl, implement case switch here or @ givebadge.js
			badgeurl: req.body.badgeurl,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/index");
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