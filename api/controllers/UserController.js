/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	  login: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        // compare the hashed password in the db with the one in the form
        console.log("Form pass hash: ", User.hash_string(req.body.password));
        console.log("DB pass hash:   ", user.password);
        // bcrypt.compare(req.body.password, user.password, function (err, match) {
        //   if (err) res.json({ error: 'Server error' }, 500);

        //   if (match) {
        //     // password match
        //     req.session.user = user.id;
        //     res.json(user);
        //   } else {
        //     // invalid password
        //     if (req.session.user) req.session.user = null;
        //     res.json({ error: 'Invalid password' }, 400);
        //   }
        // });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  }

};

