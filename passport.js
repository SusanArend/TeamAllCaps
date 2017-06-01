var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    // EmployBasic = require('./models/employ_basic.js') may not need this at all
    db = require('./models')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  // passport.use(new LocalStrategy(
  //   function(email, password, done) {
  //     console.log("hitting passport")
  //     db.employ_option.findOne({
  //       where: {
  //         'email': email
  //       }
  //     }).then(function (user) {
  //       if (user == null) {
  //         console.log("no user")
  //         return done(null, false, { message: 'Incorrect credentials.' })
  //       }
  //       //TODO:  delete these 2 lines and uncomment the bcrypt lines once using bcrypt
  //       if (user.password === password) {
  //         console.log("logged in")
  //         return done(null, user)
  //       }

  //       // bcrypt.compare(password, user.password, function(err, res) {
  //       //   console.log(res);
  //       //   if (res){
  //       //     return done(null, user)
  //       //   }
  //       // });

  //       //TODO: THE FOLLOWING is the sync version for bcrypt can remove once async works.
  //       // var hashedPassword = bcrypt.hashSync(password, user.salt)
        
  //       // if (user.password === hashedPassword) {
  //       //   return done(null, user)
  //       // }
  //       console.log("wrong password")
  //       return done(null, false, { message: 'Incorrect credentials.' })
  //     })
  //   }
  // ))

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // process.nextTick(function() {
      // console.log("hitting passport")
      console.log(username)
      db.employ_option.findOne({ 
        where: {
          email: username
        }
      }).then(function (user) {
        if (user == null) { 
          console.log("no user")
          return done(null, false, { message: 'Incorrect credentials.' })
        }
        //TODO:  delete these 2 lines and uncomment the bcrypt lines once using bcrypt
        // if (user.password == password) {
        //   console.log("logged in")
        //   return done(null, user)
        // }

        // bcrypt.compare(password, user.password, function(err, res) {
        //   console.log(res);
        //   if (res){
        //     console.log("logged in")
        //     return done(null, user)
        //   }
        // });

        bcrypt.compare(password, user.password, function(err, res) {
          console.log(res);
          if (err)
              throw err;
          if (res){
            console.log("logged in")
            return done(null, user)
          }
          console.log("wrong password")
        return done(null, false, { message: 'Incorrect credentials.' })
        })
        // .then(function(data){

        

        //TODO: THE FOLLOWING is the sync version for bcrypt can remove once async works.
        // var hashedPassword = bcrypt.hashSync(password, user.salt)
        
        // if (user.password === hashedPassword) {
        //   return done(null, user)
        // }
        // })
        })

    // })
    }
  ))



  passport.serializeUser(function(user, done) {
    done(null, user.email)
  });

  passport.deserializeUser(function(email, done) {
    db.employ_basic.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }      
      done(null, user)
    })
  })
}