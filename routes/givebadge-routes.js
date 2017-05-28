var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.post("/:badge/post", function(req,res){
		db.employ_badge.create({
			sender_id: req.body.sender,
			recipient_id: req.body.recipient,
			req.params.badge: 1,
			comment: req.body.comment
		}).then(function(){
			res.redirect("/display")
		})
	});