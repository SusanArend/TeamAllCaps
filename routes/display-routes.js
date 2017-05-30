var db = require("../models");

module.exports = function(app){

	// Render landing.html at route "/"
	app.get("/index", 
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req,res){
		var hbsObject= {
			name  : req.user.name,
			img_url: req.user.photo_path,
			badges : db.employ_badge.findAll({order: 'createdAt DESC', limit: 10}),
			user : req.user //feed info into main.handlebars
		};
		console.log(db.employ_badge.findAll({order: 'createdAt DESC', limit: 10}))
		res.render("index",hbsObject);
	});
}