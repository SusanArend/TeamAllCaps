var db = require("../models");

module.exports =  function(app){
	app.get("/profile/:name", function(req, res){
		var hbsObject = {
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
	})
};