var db = require("../models");

module.exports = function(app){

	// Render landing.html at route "/"
	app.get("/index", 
		require('connect-ensure-login').ensureLoggedIn("/login"),
		function(req,res){
			db.employ_badge.findAll({order: 'createdAt DESC', limit:10}).then(function(data){
				var badges = [];
				console.log(data[0].dataValues);
				for (key in data){
					var badge = {
						sender_name:data[key].dataValues["sender_name"],
						recipient_name: data[key].dataValues["recipient_name"],
						badge_id: data[key].dataValues["badgeid"],
						badge_url:data[key].dataValues["badgeurl"],
						comment: data[key].dataValues["comment"]
					}
					badges.push(badge);	
				};
				var hbsObject= {
					name  : req.user.name,
					img_url: req.user.photo_path,
					badges: badges,
					user : req.user
				};
				console.log(badges);
				res.render("index",hbsObject);
			})
	});
}