app.service('ChartService', function($q){

  /**
   * Returns all domains which the current user is registered to
   */
  var data = {
      'elgervanboxtel.nl': [
        ['warnings', 30, 200, 100, 300, 150, 250],
        ['errors'  , 50,  20,  10,  40,  15,  25],
        ['info'    , 80,  75, 157,  86, 136, 182]
      ],
      'wouterroosendaal.nl': [
        ['warnings', 50, 150, 120, 280, 80, 20],
        ['errors'  , 50,  50,  10,  60,  15,  25],
        ['info'    , 80,  50, 157,  77, 26, 88]
      ],
      'tuvok.nl': [
        ['warnings', 60, 80, 30, 130, 148, 66],
        ['errors'  , 20,  50,  40,  10,  6,  20],
        ['info'    , 90,  56, 78,  120, 80, 99]
      ]
  },
  getData = function(host){
    console.log("ChartService: Load data for host " + host);
    return $q(function(resolve, reject) {
      resolve({columns: data[host]});
    });
  };

  return {
    getData:getData
  };

});