var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    // EmployBasic = require('./models/employ_basic.js') may not need this at all
    db = require('./models')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    function(email, password, done) {
      db.employ_option.findOne({
        where: {
          'email': email
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' })
        }

        bcrypt.compare(password, user.password, function(err, res) {
          console.log(res);
          if (res){
            return done(null, user)
          }
        });

        //TODO: THE FOLLOWING is the sync version for bcrypt can remove once async works.
        // var hashedPassword = bcrypt.hashSync(password, user.salt)
        
        // if (user.password === hashedPassword) {
        //   return done(null, user)
        // }
        
        return done(null, false, { message: 'Incorrect credentials.' })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    db.employ_option.findOne({
      where: {
        'id': id
      },
      include: [db.employ_option]
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }      
      done(null, user)
    })
  })
}