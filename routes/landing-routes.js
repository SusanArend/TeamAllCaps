var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs')
var mysqlPassword = require("../config/mysqlPassword.js");
var authentication = require("../config/authentication.js");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: authentication
});
var randomstring = require("randomstring"); 
    
module.exports = function(app) {
    // Render landing.html at route "/"
    app.get("/", function(req, res) {
        res.render("landing", {layout:false, message: req.flash("error")});
    });
    //By submitting email,password, email and password value in employ_option table are checked.
    //If email and password matches, redirec to another page.
    //If email exist, but password doesn't match, return ture, alert user password is wrong in frontend.
    //If email doesn't exist, alert the client that the user is not registered in frontend.

    app.post('/login',
        passport.authenticate('local', 
            {failureRedirect: '/',
            failureFlash: true}),
        function(req, res) {
            res.redirect('/index');
        });


    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    // app.put('/api/updatePassword', function(req, res) {
    //     console.log("body", req.body.password);
    //     var newPassword = req.body.password; 
    //     var email = req.body.email;
    //     console.log(newPassword, email);
    //     var hashedPassword;
    //     var salt = bcrypt.genSaltSync(10);
    //     hashedPassword = bcrypt.hashSync(req.body.password, salt);
    //    //  bcrypt.genSalt(10, function(err, salt) {
    //    //      bcrypt.hash(newPassword, salt, function(err, hash) {
    //    //          hashedPassword = hash;
    //    //          });
    //    // })
    //     db.employ_option.update({
    //                 password: hashedPassword
    //             }, {
    //                 where: {
    //                     email: email
    //                 }
    //     });
    // });

    app.post('/sendemail', function(req, res) {        
    var newPassword = randomstring.generate(8);
    // var newPassword = 'apple';
    var email = req.body.email;
    db.employ_option.findOne({
        where: {
            email:email
        }
    }).then(function(data) {
        if(data){
            var mailOptions = {
            to: email,
            subject: "Your Plaudit Password Reset Request",
            text: "Here is your new Plaudit password: " + newPassword,
            html: "<body style='background-color: #ffe97c; text-align:center; padding-bottom: 15px; padding-top: 15px; color: #6DDDB8;'><h1 style='  font-family: 'Lobster', cursive;'><p>Plaudit!</h1></p><p>Here is your Plaudit password: </p><b><p>" + newPassword + "</b></p><p><a href='https://plaudit.herokuapp.com/' target='blank'>Log in to Plaudit now!</p></body>"
            };
            smtpTransport.sendMail(mailOptions, function(error, response) {
                if (error){
                    console.log(error);
                    res.send("error");
                }else{
                    console.log("Message sent to: " + req.body.email);
                    var sendObject = {status: "sent", password: newPassword};
                    console.log("sendObject: ", sendObject)
                    res.send(sendObject);
                    // res.send("sent")
                    }
            });
        }else{
            res.send("invalid email")
            };
        });
    });


    //If the user email is valid and the user hasn't registed before, 
    //user information will updated in employ_option table based on form information
    //If the user has been registed before, reture exist to the frontend
    //If the user is not in employ_baisc table, the user is not valid, returen 
    //not valid to frontend
    app.post("/newuser/post", function(req, res){
        var hashedPassword;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                hashedPassword = hash;
            });
        });           
        db.employ_basic.findOne({
            where:{
                email:req.body.email
            }
        }).then(function(data){
            if(data){
                var employ_id = data.dataValues.id;
                db.employ_option.findOne({
                    where:{
                        employBasicId :employ_id
                    }
                }).then(function(data){
                    if(!data){
                        console.log(employ_id);
                        db.employ_option.create({
                            employBasicId:employ_id,
                            password: hashedPassword,
                            favorite: req.body.favorite
                        }).then(function() {
                            res.send(true);
                            });
                    }else{
                        res.send("exist user");
                    }
                })
            }else{
                res.send('invalid email');
            }
        })
    });

// ADDING SMALL FEATURE TO PROVIDE USER FEEDBACK ON SIGN-UP SECTION
    app.post('/checkemail', function(req, res){
        db.employ_basic.findAll({
            where: {
                email: req.body.email
            }
        }).then(function(data){
            if(data){
                res.send(true)
            }else{
                res.send("invalid email");
            }
        });
    });
};
/// END NEW FEATURE

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

// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash(password, salt, function(err, hash) {
//       // Store hash in your password DB. 
//     var newUser = {
//       email: email,
//       password: hash,
//       favorite: favorite,
//       id: id
//     } 
//           //TODO:  CUrrently this CREATES a user in the employ option table.  Is this correct, and then we fill in the id field as well?
// EmployOption.create(newUser).then(function() {
//   res.redirect('/')
// }).catch(function(error) {
//   //TODO:  Can delete or update the following line.  
//   // This cactches an error in signup, could use flash middleware or similar to display it
//    // req.flash('error', "Please, choose a different username.")
//   res.redirect('/landing')
// })

//     });
// });
