/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, user){
      if (err) res.status(409).json({ error: 'user create error' });
      else res.status(200).json({ user: user });
    });
  },

  logout: function(req, res) {
    req.session.user = null;
    req.session.message = "logged out";
    return res.redirect('/login')
  },

  login: function (req, res) {
  // var bcrypt = require('bcrypt');
    User.findOne({ username: req.body.username }).exec(function (err, user) {
      // console.log("user", user);
      if (err) res.status(500).json({ error: 'DB error' });
      else
        if (user) {
          // compare the hashed password in the db with the one in the form
          if (User.hash_string(req.body.password) === user.password) {
            // password match
            var hat = require('hat');

            user.token = hat();
            user.last_login = new Date().toISOString();
            user.save();
            res.status(200).json({ user: user });
          } else {
            // invalid password
            res.status(422).json({ error: 'Invalid password' });
          }
        } else {
          // user not found
          res.status(404).json({ error: 'User not found' });
        }
    });
  }

};

