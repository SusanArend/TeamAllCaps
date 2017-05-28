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
			badge : db.employ_badge.findAll({order: 'createdAt DESC', limit: 10, 
				include:[{
					model: employ_basic,
					where:{
						id: Sequelize.col(senderid)
					}
				}]
			})


		};
		res.render("index",hbsObject);
	});