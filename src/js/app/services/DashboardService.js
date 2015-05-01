app.service('DashboardService', function($q, $http){
  var getHosts = function() {
    return $http.get('/api/host');
  },
  getData = function(host) {
    return $http.get('/api/data/forhost', {
      params: { name: host }
    });
  };
  return {
    getData:getData,
    getHosts:getHosts
  };

});