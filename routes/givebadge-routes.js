var db = require("../models");
var authentication = require("../config/authentication.js");
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: authentication
});

module.exports = function(app) {
    app.post("/badge/post",
        require('connect-ensure-login').ensureLoggedIn("/login"),
        function(req, res) {
            //TODO: implement an if/else check to make sure all data exists - including a read query to check for recipient name? unless its done beforehand.
            // SEE NOTE BELOW AT /checkname ROUTE.
            db.employ_badge.create({
                sender_name: req.user.name,
                recipient_name: req.body.recipient_name,
                badgeid: req.body.badgeid,
                badgeurl: req.body.badgeurl,
                comment: req.body.comment
            }).then(function() {
                res.redirect("/index");
            })
            db.employ_basic.findOne({
                where: {
                    name: req.body.recipient_name
                }
            }).then(function(data) {
                var mailOptions = {
                    to: data.email,
                    subject: "Congrats " + data.name + "! A Plaudit Badge Awaits",
                    text: "Hi " + data.name + "! You got a Plaudit Badge from" + req.user.name + "for your good work at the office.",
                    html: "<body style='background-color: #ffda21; text-align: center; padding-bottom: 15px; padding-top: 15px; font-family: Georgia; font-style: normal; font-size: 1.6rem;'><p style='color: #fffbe4; font-style: italic; font-size: 2.6rem;'>Plaudit!</p><p style='color: #fffbe4;'>Congrats, <b>" + data.name + "!</b></p><p style='color: #fffbe4; font-size: 1.6rem;'>You received a Plaudit Badge from " + req.user.name + " for your awesome work. <p><a href='https://plaudit.herokuapp.com/' target='blank' style='color: #00CB88; font-size: 1.3rem; font-style: italic;'>Log in to Plaudit to see details.</p></body>"
                };
                smtpTransport.sendMail(mailOptions, function(error, response) {
                    if (error) {
                        console.log(error);
                        res.send("error");
                    } else {
                        console.log("Message sent to: " + data.email);
                        var sendObject = { status: "sent" };
                        console.log("sendObject: ", sendObject)
                        res.send(sendObject);
                    }
                })
                db.employ_basic.findOne({
                    where: {
                        manager_id: data.manager_id
                    }
                }).then(function(data) {
                    var mailOptions = {
                        to: data.email,
                        subject: "A Plaudit Badge For Your Employee!",
                        text: "Hi " + data.name + "! One of your employees got a Plaudit Badge for their good work at the office.",
                        html: "<body style='background-color: #ffda21; text-align: center; padding-bottom: 15px; padding-top: 15px; font-family: Georgia; font-style: normal; font-size: 1.6rem;'><p style='color: #fffbe4; font-style: italic; font-size: 2.6rem;'>Plaudit!</p><p style='color: #fffbe4;'>Hi, <b>" + newPassword + "!</b></p><p style='color: #fffbe4; font-size: 1.6rem;'>One of your employees received a Plaudit Badge for their awesome work. We thought you might like to know!</p><p><a href='https://plaudit.herokuapp.com/' target='blank' style='color: #00CB88; font-size: 1.3rem; font-style: italic;'>Log in to Plaudit to see details.</p></body>"
                    };
                    smtpTransport.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log(error);
                            res.send("error");
                        } else {
                            console.log("Message sent to: " + data.email);
                            var sendObject = { status: "sent" };
                            console.log("sendObject: ", sendObject)
                            res.send(sendObject);
                        }
                    })

                })
            })
        });

    app.get("/givebadge",
        require('connect-ensure-login').ensureLoggedIn("/login"),
        function(req, res) {
            var hbsObject = {
                user: req.user
            }
            res.render("givebadge", hbsObject);
        })
};

// Having trouble validating user name because can't read name input in givebadge.js
// Maybe this can be integrated into app.post("/badge/post") route?
//   app.post('/checkname', function(req, res) {
//        db.employ_basic.findOne({
//            attributes: ['name'],
//            where: {
//                name: // how to collect badgeRecipient???
//            }
//        }).then(function(data) {
//              // can we use this type of validation for name check???
//            var valid_email = [];
//            for (key in data) {
//                valid_email.push(data[key].dataValues.email)
//            };
//            if (valid_email.indexOf(req.body.email) !== -1) {
//                res.send(true)
//            } else {
//                res.send("invalid");
//            }
//        });
//    });
// };
