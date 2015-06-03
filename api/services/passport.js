var passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy;

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use('bearer', new BearerStrategy(
  function(accessToken, done) {
    // console.log("accessToken", accessToken);
    User.findOne( { token: accessToken }, function(err, user) {
      if (err) return done(err);
      // console.log("Request by user: ", user.username);
      var info = { scope: '*' };
      done(null, user, info);
    });
  }
));