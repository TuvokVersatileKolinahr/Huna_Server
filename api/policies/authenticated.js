/**
 * Allow any authenticated user.
 */
var passport = require('passport');

module.exports = function (req, res, done) {
  passport.authenticate('bearer', {session: false}, function(err, user, info) {
    if (err) return done(err);
    if (user) {
      req.user = user;
      return done(null, user, info);
    }

    return res.send(403, {message: "You are not permitted to perform this action."});
  })(req, res);
};