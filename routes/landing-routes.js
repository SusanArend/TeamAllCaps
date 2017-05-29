var path = require("path");
var db = require("../models");
var passport = require('passport');.

module.exports = function(app){
	// Render landing.html at route "/"
	app.get("/", function(req,res){
		res.sendFile(path.join(__dirname, "../views/landing.html"));
	});
	//By submitting email,password, email and password value in employ_option table are checked.
	//If email and password matches, redirec to another page.
	//If email exist, but password doesn't match, return ture, alert user password is wrong in frontend.
	//If email doesn't exist, alert the client that the user is not registered in frontend.
	



	app.post("/:email/:password", function(req,res){
		db.employ_basic.findOne({
			where: {
				email: req.params.email
			},
			include: [db.employ_option]
		}).then(function(dbemploy_basic){
			if (dbemploy_basic.password && req.params.password === dbemploy_basic.password){
				res.redirect("/app/profile/:email");
			} else if(dbemploy_basic.password & req.params.password !== dbemploy_basic.password){
				res.json(true);
			}else if(!dbemploy_basic.password){
				res.json(false);
			};
			
		})
	});
	//If the user email is valid and the user hasn't registed before, 
	//user information will updated in employ_option table based on form information
	//If the user has been registed before, reture exist to the frontend
	//If the user is not in employ_baisc table, the user is not valid, returen 
	//not valid to frontend
	app.post("/:email/:password/:favorite", function(req,res){
		var valid_email = db.employ_basic.findAll({attributes:email});
		var exist_email = db.employ_option.findAll({attributes:email});
		if(valid_email.indexOf(req.params.email)!==-1 && exist_email.indexOf(req.params.email)===-1){
			db.employ_option.create({
				email:req.params.email,
				password: req.params.password,
				favorite: req.params.favorite
			});
		}else if(exist_email.indexOf(req.params.email)!==-1){
			res.json("exist");
		}else if(valid_email.indexOf(req.params.email)===-1){
			res.json("not valid");
		};
		
	});
};

//IMPORTANT TODO: Need to merge following code to the new sign up route.  
//MOST IMPORTANT IS THE bcrypt.GENSALT LINE (and everything below) - this hashes password
//   var email = req.body.email;
//   var password = req.body.password;
//   var password2 = req.body.password2;
//   var favorite = req.body.favorite;
//   //TODO: var id = ??? how are we pulling in id from Employ_Basic
  
//   if (!email || !password || !password2 || !favorite) {
//     // TODO:  Throw error to fill in all fields
//     res.redirect('landing')
//   }
  
//   if (password !== password2) {
//     // TODO:  Throw error that passwords must match
//     res.redirect('landing')
//   }
  
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         // Store hash in your password DB. 
//       var newUser = {
//         email: email,
//         password: hash,
//         favorite: favorite,
//         id: id
//       } 
//             //TODO:  CUrrently this CREATES a user in the employ option table.  Is this correct, and then we fill in the id field as well?
//   EmployOption.create(newUser).then(function() {
//     res.redirect('/')
//   }).catch(function(error) {
//     //TODO:  Can delete or update the following line.  
//     // This cactches an error in signup, could use flash middleware or similar to display it
//      // req.flash('error', "Please, choose a different username.")
//     res.redirect('/landing')
//   })

//     });
// });