var db = require("../models");

module.exports = function(app){

	// Render landing.html at route "/"
	app.get("/index", 
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req,res){
			db.employ_badge.findAll({order: 'createdAt DESC', limit:10}).then(function(data){
				var badges = [];
				for (key in data){
					badges.push(key);
				};
				var hbsObject= {
					name  : req.user.name,
					img_url: req.user.photo_path,
					badges: badges,
					user : req.user
				};
				res.render("index",hbsObject);
			})
	});
}