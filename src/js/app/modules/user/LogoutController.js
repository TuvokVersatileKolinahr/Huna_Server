/**
 * Sign out
 */
app.controller('LogoutController', function($scope, $http, $location, AuthService){

  $scope.logout = function(){
    $http({
      method: 'POST',
      url: '/api/logout'
    }).success(function(data, status, headers, config) {
      AuthService.clearLogin();
      $location.url("/");
    }).error(function(data, status, headers, config) {
      console.log("Logout failed ... ", data);
    });
  };
	
});