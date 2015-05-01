/**
 * DataController
 *
 * @description :: Server-side logic for fetching error data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  forhost: function(req, res) {
    var MongoClient = require('mongodb').MongoClient;

    //TODO: this is mockdata directly from the mongo database. It should be replaced by real data.
    var url = 'mongodb://';
    if (process.env.DB_USER) {
      url = url + process.env.DB_USER+':'+process.env.DB_PASS+'@';
    }
    url = url + process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('mockdata');

        // Find all data
        collection.find({ "host": req.options.values.criteria.name })
          .limit(1)
          .toArray(function(err, d) {
            db.close();
            if (err != null) {
              res.json({});
            }
            else {
              if (d.length > 0) {
                d[0].count = d[0].errordata.length;
              }
              res.json(d);
            }
        });
      });
  }
};

