/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  register: function (req, res) {
    if (req.body.password === req.body.password) {
      var newUser = User.create(req, res);
      console.log("newUser", newUser);
      res.json({ success: 'yay' });
    }
  },

  create: function(req, res) {
    // console.log("req.body", req.body);
    if (req.body.password === req.body.retypepassword) {
      User.create(req.body).exec(function(err, result){
        if (err) {
          //Handle Error
        }
        console.log("Created user: ", result);
        req.session.user = result;
        return res.redirect('/account')
      });
    } else {
      //TODO: return something
      console.log("passwords niet gelijk");
      req.session.message = "Passwords do not match";
      // res.status(400).json({ error: 'Invalid password' });
      return res.redirect('/register')
    }
  },

  logout: function(req, res) {
    req.session.user = null;
    req.session.message = "logged out";
    // res.status(400).json({ error: 'Invalid password' });
    return res.redirect('/login')
  },

  login: function (req, res) {
  // var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email).exec(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        // compare the hashed password in the db with the one in the form
        // console.log("Form pass hash: ", User.hash_string(req.body.password));
        // console.log("DB pass hash:   ", user.password);
        if (User.hash_string(req.body.password) === user.password) {
          // password match
          req.session.user = user;
          // res.json(user);
          return res.redirect('/account')
        } else {
          // invalid password
          if (req.session.user) req.session.user = null;
          req.session.message = "Invalid password";
          // res.status(400).json({ error: 'Invalid password' });
          return res.redirect('/login')
        }
      } else {
        // res.status(404).json({ error: 'User not found' });
        if (req.session.user) req.session.user = null;
        req.session.message = "User not found";
        return res.redirect('/login')
      }
    });
  }

};

