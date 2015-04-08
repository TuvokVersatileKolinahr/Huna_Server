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
    // res.status(400).json({ error: 'Invalid password' });
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
          // console.log("Form pass hash: ", User.hash_string(req.body.password));
          // console.log("DB pass hash:   ", user.password);
          if (User.hash_string(req.body.password) === user.password) {
            // password match
            // req.session.user = user;
            // return res.redirect('/account')
            res.status(200).json({ user: user });
          } else {
            // invalid password
            // if (req.session.user) req.session.user = null;
            // req.session.message = "Invalid password";
            // return res.redirect('/login')
            res.status(422).json({ error: 'Invalid password' });
          }
        } else {
          // if (req.session.user) req.session.user = null;
          // req.session.message = "User not found";
          // return res.redirect('/login')
          res.status(404).json({ error: 'User not found' });
        }
    });
  }

};

