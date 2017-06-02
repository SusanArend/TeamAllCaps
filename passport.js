var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    db = require('./models')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())


//Declares passport-local as the login strategy, authentication happens via local server/db checks.
  passport.use(new LocalStrategy(
    function(username, password, done) {
      //Finds user in db based on username (which is the email in db)
      db.employ_basic.findOne({ 
        where: {
          email: username
        },
        include:[db.employ_option]
      }).then(function (data) {
          //Returns error if there is no user when login attempted.
          if (!data) { 
            return done(null, false, { message: 'This email is not in the system.' })
          }
        var user = data.dataValues;
        if(user.employ_option){
            var userpassword = user.employ_option.dataValues.password
            //Encrypts the password the user entered in login attempt, checks it against the encrypted string stored in database to see if a match.
            //Original user password is never known/shown for security.
            bcrypt.compare(password,userpassword, function(err, res) {
              if (err)
                  throw err;
              if (res){
                console.log("logged in")
                return done(null, user)
              }else{
                return done(null, false, { message: 'Incorrect credentials. please login again.' })
              }
            })
        }else{return done(null, false, { message: "This email is not in the system." })}
     

        })
    }
  ))


//Serializes user as their UserID
  passport.serializeUser(function(user, done){
    done(null, user.id)
  });

 //Deserializes user on page load using their UserID to get full user info, which can be used with req.user
  passport.deserializeUser(function(id, done) {
    db.employ_basic.findOne({
      where: {
        id: id
      }
    },{include:[{model:db.employ_options}]
  }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }      
      done(null, user)
    })
  })
}
