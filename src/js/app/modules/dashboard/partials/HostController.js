/**
 * Any registered user can add a new host.
 */
app.controller('HostController', function($scope, $window, $location, $http){

  $scope.cancel = function(){
    $window.history.back();
  };

  $scope.add_host = function() {
    $http({
      method: 'POST',
      url: '/api/host',
      data: {
        name: $scope.form.hostname.$modelValue.replace(/^https?:\/\//,'')
      }
    }).success(function(data, status, headers, config) {
        console.log("data, status, headers, config", data, status, headers, config);
        $window.history.back();
      }).
      error(function(data, status, headers, config) {
        console.log("data, status, headers, config", data, status, headers, config);
        $scope.error = data.summary;
    });
  };
});