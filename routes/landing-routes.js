var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs')
// var authentication = require("../config/authentication.js");

// Determine our connection
// =============================================================|
if (!process.env.PORT) {
    var authentication = require("../config/authentication.js");
} else {
    console.log("Heroku connection");
    var authentication = process.env
};

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: authentication.user,
      pass: authentication.pass
    }
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

    app.get("/login", function(req, res) { //catches in case passport redirects to the default /login if any session issues occur, redirects to our own login
        res.redirect('/');
    });


function updatePassword(email, password){
    console.log("email", email)
    console.log("password", password)   
    var dataObject = {email: email, password : password}
    $.ajax({
            method: "PUT",
            url: "/api/updatePassword",
            // dataType: "JSON",
            data: dataObject
        })
};

    app.put('/api/updatePassword', function(req, res) {
        console.log("body", req.body.password);
        var newPassword = req.body.password; 
        var email = req.body.email;
        console.log(newPassword, email);
        var hashedPassword;
        var salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(req.body.password, salt);
       //  bcrypt.genSalt(10, function(err, salt) {
       //      bcrypt.hash(newPassword, salt, function(err, hash) {
       //          hashedPassword = hash;
       //          });
       // })
        db.employ_basic.findOne({
            where:{
                email:email
            }
        }).then(function(data){
            if(data){
                var employ_id = data.dataValues.id;
                db.employ_option.update({
                    password: hashedPassword,
                },{
                    where: {
                        employBasicId :employ_id
                    }
                }).then(function() {
                    res.send(true);
                });
            }else{
                res.send("invalid email");
            }
        })
    });

    //Sends a new password to user's email if they forgot password.
    //TODO In a future build, would like to send an authentication link that would redirect user to a password update screen instead of generating a new, random password.
    app.post('/sendemail', function(req, res) {        
    var newPassword = randomstring.generate(8);
    var email = req.body.email;
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
                    if(data){
                    var mailOptions = {
                        to: email,
                        subject: "Your Plaudit Password Request",
                        text: "Here is your new Plaudit password: " + newPassword,
                        html: "<body style='background-color: #ffda21; text-align: center; padding-bottom: 15px; padding-top: 15px; font-family: Georgia; font-style: normal; font-size: 1.6rem;'><p style='color: #fffbe4; font-style: italic; font-size: 2.6rem;'>Plaudit!</p><p style='color: #fffbe4;'>Here is your new Plaudit password: </p><b>" + newPassword + "</b></p><p><a href='https://plaudit.herokuapp.com/' target='blank' style='color: #00CB88; font-size: 1.3rem; font-style: italic;'>Log in to Plaudit</p></body>"
                    }
                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if (error){
                            console.log(error);
                            res.send("error");
                        }else{
                            console.log("Message sent to: " + req.body.email);
                            var sendObject = {status: "sent", password: newPassword};
                            console.log("sendObject: ", sendObject)
                            res.send(sendObject);
                            }
                    });
                    }else{
                        res.send("invalid user")
                    };
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
        var salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(req.body.password, salt);
       //  bcrypt.genSalt(10, function(err, salt) {
       //      bcrypt.hash(newPassword, salt, function(err, hash) {
       //          hashedPassword = hash;
       //          });
       // })
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
                    if(!data) {
                        db.employ_option.create({
                            employBasicId:employ_id,
                            password: hashedPassword,
                            favorite: req.body.favorite
                        }).then(function() {
                            res.send(true);
                            });
                    } else {
                        res.send("exist user");
                    }
                })
            }else{
                res.send('invalid email');
            }
        })
    });

    app.post('/checkemail', function(req, res){ 
        db.employ_basic.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(data){
            if(data){
                var employ_id = data.dataValues.id;
                db.employ_option.findOne({
                    where:{
                        employBasicId :employ_id
                    }
                }).then(function(data){
                    if(data){
                        res.send("exist user")
                    } else  res.send(true)
                });
            } else {
                res.send("invalid email");
            }
        });
    });
};
