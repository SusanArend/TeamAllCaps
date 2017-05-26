var express = require('express');
var nodemailer = require("nodemailer");
var mysql = require("mysql");
var app = express();
var PORT = process.env.PORT || 3000;
var authentication = require("../config/authentication.js");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "plaudit_test"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Here we are configuring our SMTP Server details.
// STMP is mail server which is responsible for sending and recieving email.

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: authentication
});
//------------------SMTP Over-----------------------------//

//------------------Routing Started ----------------------//

app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res) {
    res.sendFile('forgot_password.html', { root: __dirname });
});
app.get('/send', function(req, res) {
    connection.query("SELECT employee_password FROM employees WHERE employee_email=?", [req.query.address], function(err, result) {
        if (err) throw err;
        var mailOptions = {
            to: req.query.address,
            subject: "Recover Your Plaudit Password",
            html: "Here is your Plaudit password: <p><b>" + result[0].employee_password + "</b></p><p><a href='#'>Log in to Plaudit now!</p>"
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
            console.log("Message sent to: " + req.query.address);
            res.end("sent");
            }
        });
    });
});

//--------------------Routing Over----------------------------//

app.listen(PORT, function() {
    console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
});

// Source: https://codeforgeek.com/2014/07/send-e-mail-node-js/
