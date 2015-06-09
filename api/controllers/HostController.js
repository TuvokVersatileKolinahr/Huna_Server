/**
 * HostsController
 *
 * @description :: Server-side logic for managing hosts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    console.log("User: ", req.user);
    var newhost = req.body;
    newhost.owner = req.user;
    Host.create(newhost).exec(function(err, host){
      if (err) {
        console.log("Jammer. Create host failed", err);
        res.status(500).json({ error: "Error creating host" });
      }
      else res.status(200).json({ host: host });
    });
  }
};
