/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, user){
      if (err) {
        console.log("err.code", err.code);
        if (err.code === 'E_VALIDATION') {
          for (var i = err.invalidAttributes.username.length - 1; i >= 0; i--) {
            if (err.invalidAttributes.username[i].rule === 'uniqueUser') {
              err.status = 409;
              err.summary = 'Error creating user';
            }
          };
          res.status(err.status).json({ error: err.model + ' ' + err.summary, invalidAttributes: err.invalidAttributes });
        }
        else {
          console.log("Create user failed", err);
          res.status(500).json({ error: "Error creating user" });
        }
      }
      else res.status(200).json({ user: user });
    });
  },

  logout: function(req, res) {
    var accessToken = req.get('Authorization').split(" ")[1];
    User.findOne( { token: accessToken }, function(err, user) {
      if (err) {
        console.log("Find user on logout failed.", err);
        res.status(500).json({ error: 'DB error' });
      }
      else {
        delete user.token;
        console.log("logged out user", user);
        req.session.user = null;
        res.status(200).json({ logout: 'true' });
      }
    });
  },

  login: function (req, res) {
  // var bcrypt = require('bcrypt');
    User.findOne({ username: req.body.username }).exec(function (err, user) {
      // console.log("user", user);
      if (err) {
        console.log("Find user on login failed.", err);
        res.status(500).json({ error: 'DB error' });
      }
      else
        if (user) {
          // compare the hashed password in the db with the one in the form
          if (User.hash_string(req.body.password) === user.password) {
            // password match
            var hat = require('hat');

            user.token = hat();
            user.last_login = new Date().toISOString();
            //update user in the database
            User.update(
              {username: user.username},
              {token: user.token, last_login: user.last_login}
            ).exec(function afterwards(err,updated){
              if (err) {
                console.log("Update on login failed.", err);
                res.status(500).json({ error: 'DB error' });
                return;
              }
              res.status(200).json({ user: user });
            });
          } else {
            // invalid password
            res.status(422).json({ error: 'Error signing in' });
          }
        } else {
          // user not found
          res.status(404).json({ error: 'Error signing in' });
        }
    });
  }

};

