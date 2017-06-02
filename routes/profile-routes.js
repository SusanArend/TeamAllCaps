var db = require("../models");

module.exports =  function(app){
	app.get("/profile/:name", 
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res){			
		console.log("routehit", req.params.name);
		db.employ_basic.findOne({
			where: {
				name: req.params.name
			}
		}).then(function(employee){	
			console.log("employee", employee)
			// if(valid_names.indexOf(req.params.name)!==-1){
			if (employee) {
				db.employ_badge.findAll({ where: {
						$or: [{sender_name: employee.name}, {recipient_name: employee.name}]
					}, order: 'createdAt DESC', limit:10
				}).then(function(badges){
					var hbsObject = {
						user : req.user, //feed logged in user info into main.handlebars
						name: employee.name,
						title: employee.title,
						phone: employee.phone,
						email: employee.email,
						linkedin_url: employee.linkedin_url,
						img_url : employee.photo_path,
						badges: badges
					}
					console.log(hbsObject);
					res.render("profile", hbsObject)	
				});

		}else{
			res.send("Invalid name.");
			res.redirect("/index");
		}
		
		});
	});
}
