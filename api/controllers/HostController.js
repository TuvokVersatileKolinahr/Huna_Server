/**
 * HostsController
 *
 * @description :: Server-side logic for managing hosts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    var accessToken = req.get('Authorization').split(" ")[1];
    User.findOne( { token: accessToken }, function(err, user) {
      if (err) {
        console.log("Find user on host create failed.", err);
        res.status(500).json({ error: 'DB error' });
      }
      else {
        console.log("create host for user", user);
        res.status(200).json({ host: 'true' });
      }
    });
  }
};
