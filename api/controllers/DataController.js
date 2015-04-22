/**
 * DataController
 *
 * @description :: Server-side logic for fetching error data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  forhost: function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/huna-dev';
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('mockdata');

        // Find all data
        collection.find({ "host": req.options.values.criteria.name })
          .limit(1)
          .toArray(function(err, d) {
            d[0].count = d[0].errordata.length;
            db.close();
            res.json(d);
        });
      });
  }
};

