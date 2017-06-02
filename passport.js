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
      db.employ_basic.findOne({ 
        where: {
          email: username
        },
        include:[db.employ_option]
      }).then(function (data) {
          if (!data) { 
            console.log("no user")
            return done(null, false, { message: 'This email is not in internal system' })
          }
        var user = data.dataValues;
        if(user.employ_option){
            var userpassword = user.employ_option.dataValues.password
            bcrypt.compare(password,userpassword, function(err, res) {
              if (err)
                  throw err;
              if (res){
                console.log("logged in")
                return done(null, user)
              }else{
                console.log("wrong password")
                return done(null, false, { message: 'Incorrect credentials. please login again' })
              }
            })
        }else{return done(null, false, { message: "You didn't register before, please sign up" })}
     
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



  passport.serializeUser(function(user, done){
    done(null, user.id)
  });

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