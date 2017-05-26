// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Plaudit model
var db = require("../models");

//SUPER IMPORTANT TBD:  Create 'user' file in /models directory similar to 'plaudit' file linking the user table from sql
//IMPORTANT TBD:  Edit 'plaudit' file in /models directory to use the correct sql data.

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the recent plaudits
  app.get("/api/plaudits/", function(req, res) {
    db.Plaudit.findAll({})
    .then(function(dbPlaudit) {
      res.json(dbPlaudit);
    });
  });

 // Get route for returning plaudits of a specific user
  app.get("/api/plaudits/user/:user", function(req, res) {
    db.Plaudit.findAll({
      where: {
        // TODO: use correct search info.  For example, could be: 
        // user: req.params.user
      }
    })
    .then(function(dbPlaudit) {
      res.json(dbPlaudit);
    });
  });

//OPTIONAL:
  // Get route for returning badges of a specific category
  // app.get("/api/plaudits/category/:category", function(req, res) {
  //   db.Plaudit.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //   .then(function(dbPlaudit) {
  //     res.json(dbPlaudit);
  //   });
  // });

  // POST route for saving a new plaudit
  app.post("/api/plaudits", function(req, res) {
    console.log(req.body);
    db.Plaudit.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
    .then(function(dbPlaudit) {
      res.json(dbPlaudit);
    });
  });

  //  DELETE route for deleting a plaudit
  app.delete("/api/plaudits/", function(req, res) {
    db.Plaudit.destroy(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbPlaudit) {
      res.json(dbPlaudit);
    });
  });

  // PUT route for updating plaudits
  app.put("/api/plaudits", function(req, res) {
    db.Plaudit.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbPlaudit) {
      res.json(dbPlaudit);
    });
  });

//=======================================================
//Following is by user

  app.get("/api/user", function(req, res) {
    // 1. Add a join to include all of each Users Plaudits
    db.User.findAll({
      include: [db.Plaudit],
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    // 2; Add a join to include all of a User's Plaudits here
    db.User.findOne({
      include: [db.Plaudit],
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //**Following are commented out unless we decide we want option to add/update/delete a user from within app rather than db.

  // app.post("/api/user", function(req, res) {
  //   db.User.create(req.body).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  //   // PUT route for updating users
  // app.put("/api/user", function(req, res) {
  //   db.User.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //   .then(function(dbUser) {
  //     res.json(dbUser);
  //   });

  // app.delete("/api/user/:id", function(req, res) {
  //   db.User.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  } ;





};
