var db = require("../models");

module.exports = function(app){
	// Render landing.html at route "/"
	app.get("/display/:email", function(req,res){
		var hbsObject= {
			name  : db.employ_basic.findOne({
				where: {
					email: req.params.email
				}
			}).then(function(data){
				return data.name
			}),
			badges : db.employ_badge.findAll({order: 'createdAt DESC', limit: 10})
		};
		res.render("index",hbsObject);
	});