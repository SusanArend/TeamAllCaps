var db = require("../models");

module.exports =  function(app){
	app.get("/profile/:name", 
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res){
		var valid_names = db.employ_basic.findAll({attributes:name});
		if(valid_names.indexOf(req.params.name)!==-1){
			var hbsObject = {
				user : req.user, //feed logged in user info into main.handlebars
				name: req.params.name,
				img_url : db.employ_basic.findOne({
					where: {
						name: req.params.name
					}
				}).then(function(data){
					return data.photo_path;
				}),
				badges: db.employ_badge.findAll({
					where: {
						$or: [{sender_name: this.name}, {recipient_name: this.name}]
					}, order: 'createdAt DESC', limit:10
				})
			}
		}else{
			res.send("invalid name");
		}
		
	})
};