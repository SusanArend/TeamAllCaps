var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.get("/givebadge", function(req, res){
		res.render("givebadge");
	})

	app.post("/badge/post", 
		require('connect-ensure-login').ensureLoggedIn(),
		function(req,res){
		var hbsObject= {
			user : req.user //feed info into main.handlebars
		};
		db.employ_badge.create({
			sender_name: req.user.name,
			recipient_name: req.body.recipient,
			badgeid: req.body.badgeid,
			badgeurl: req.body.badgeurl,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/display", hbsObject)
		})
	});
}