var bcrypt = require('bcryptjs');
var EmployOption = require('./models/employ_option.js');

module.exports.show = function(req, res) {
  res.render('landing')
}

module.exports.signup = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var favorite = req.body.favorite;
  //TODO: var id = ??? how are we pulling in id from Employ_Basic
  
  if (!email || !password || !password2 || !favorite) {
    // TODO:  Throw error to fill in all fields
    res.redirect('landing')
  }
  
  if (password !== password2) {
    // TODO:  Throw error that passwords must match
    res.redirect('landing')
  }
  
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB. 
      var newUser = {
        email: email,
        password: hash,
        favorite: favorite,
        id: id
      } 
            //TODO:  CUrrently this CREATES a user in the employ option table.  Is this correct, and then we fill in the id field as well?
  EmployOption.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    //TODO:  Can delete or update the following line.  
    // This cactches an error in signup, could use flash middleware or similar to display it
     // req.flash('error', "Please, choose a different username.")
    res.redirect('/landing')
  })

    });
});
}