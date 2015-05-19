app.service('DashboardService', function($q, $http){
  var getHosts = function() {
    console.log('Get all hosts');
    return $http.get('/api/host');
  },
  getData = function(host) {
    console.log('Get data for host ' + host);
    return $http.get('/api/data/forhost', {
      params: { name: host }
    });
  };
  return {
    getData:getData,
    getHosts:getHosts
  };

});