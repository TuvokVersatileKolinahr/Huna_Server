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
    newhost.owner = req.user.id;
    console.log("newhost", newhost);
    Host.create(newhost).exec(function(err, host){
      if (err) {
        console.log("Create host failed", err);
        res.status(500).json({ error: "Error creating host" });
      }
      else res.status(200).json({ host: host });
    });
  },
  find: function(req, res) {
    Host.find({owner:req.user.id}).exec(function(err, hosts) {
      if (err) {
        console.log("error find hosts for ", req.user, err);
        res.status(500).json({ error: "Error finding host" });
      }
      else {
        console.log("hosts", hosts);
        res.status(200).json({ hosts: hosts });
      }
    });
  }
};
