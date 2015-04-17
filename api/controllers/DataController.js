/**
 * DataController
 *
 * @description :: Server-side logic for fetching error data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mockData =   [
  {
    "host":"elgervanboxtel.nl",
    "errordata": [
    {
      "errorComponent":"RegisterController.js",
      "line":23,
      "column":64,
      "ip":"206.45.67.30",
      "occurrences":1523
    },{
      "errorComponent":"RegisterController.js",
      "line":128,
      "column":99,
      "ip":"127.0.0.1",
      "occurrences":1478
    },{
      "errorComponent":"RegisterController.js",
      "line":542,
      "column":33,
      "ip":"172.56.52.13",
      "occurrences":892
    },{
      "errorComponent":"app.js",
      "line":150,
      "column":30,
      "ip":"127.0.0.1",
      "occurrences":253
    },{
      "errorComponent":"LoginController.js",
      "line":1501,
      "column":20,
      "ip":"82.26.64.3",
      "occurrences":240
    },{
      "errorComponent":"RegisterController.js",
      "line":88,
      "column":126,
      "ip":"72.62.84.2",
      "occurrences":55
    },{
      "errorComponent":"RegisterController.js",
      "line":23,
      "column":64,
      "ip":"98.26.35.2",
      "occurrences":12
    }]
  },
  {
    "host":"wouterroosendaal.nl",
    "errordata": [
    {
      "errorComponent":"TargetController.js",
      "line":16,
      "column":44,
      "ip":"206.45.67.30",
      "occurrences":1409
    },{
      "errorComponent":"TargetController.js",
      "line":222,
      "column":69,
      "ip":"127.0.0.1",
      "occurrences":1253
    },{
      "errorComponent":"TargetController.js",
      "line":857,
      "column":82,
      "ip":"172.56.52.13",
      "occurrences":398
    },{
      "errorComponent":"app.js",
      "line":150,
      "column":30,
      "ip":"127.0.0.1",
      "occurrences":309
    },{
      "errorComponent":"app.js",
      "line":1501,
      "column":20,
      "ip":"82.26.64.3",
      "occurrences":210
    },{
      "errorComponent":"MockService.js",
      "line":88,
      "column":126,
      "ip":"72.62.84.2",
      "occurrences":109
    },{
      "errorComponent":"MockService.js",
      "line":23,
      "column":64,
      "ip":"98.26.35.2",
      "occurrences":94
    }]
  },
  {
    "host":"tuvok.nl",
    "errordata": [
    {
      "errorComponent":"StarfleetController.js",
      "line":76,
      "column":12,
      "ip":"206.45.67.30",
      "occurrences":1809
    },{
      "errorComponent":"StarfleetController.js",
      "line":45,
      "column":21,
      "ip":"127.0.0.1",
      "occurrences":1478
    },{
      "errorComponent":"StarfleetController.js",
      "line":35,
      "column":12,
      "ip":"172.56.52.13",
      "occurrences":1209
    },{
      "errorComponent":"app.js",
      "line":76,
      "column":45,
      "ip":"127.0.0.1",
      "occurrences":987
    },{
      "errorComponent":"LoginController.js",
      "line":12,
      "column":33,
      "ip":"82.26.64.3",
      "occurrences":876
    },{
      "errorComponent":"StarfleetController.js",
      "line":66,
      "column":67,
      "ip":"72.62.84.2",
      "occurrences":654
    },{
      "errorComponent":"StarfleetController.js",
      "line":12,
      "column":123,
      "ip":"98.26.35.2",
      "occurrences":43
    }]
  }
];
module.exports = {
  mockdata: function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/huna-dev';
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('mockdata');

        // Find all data
        collection.find({ "host": req.options.values.criteria.name })
          .limit(1)
          .toArray(function(err, d) {
            db.close();
            res.json(d);
        });
      });
  },
  forhost: function(req, res) {
    //TODO: this doesn't feel right
    var done = false;
    for (var i = 0; i < mockData.length; i++) {
      if (mockData[i].host === req.options.values.criteria.name) {
        done = true;
        res.status(200).json({errordata: mockData[i].errordata});
      }
    }
    if (!done){
      res.status(404).json({message: "host not found"});
    }
  }
};

