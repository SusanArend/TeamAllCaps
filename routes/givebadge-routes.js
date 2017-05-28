var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.post("/badge/post", function(req,res){
		db.employ_badge.create({
			sender_name: req.body.sender,
			recipient_name: req.body.recipient,
			badge: req.body.badge,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/display")
		})
	});