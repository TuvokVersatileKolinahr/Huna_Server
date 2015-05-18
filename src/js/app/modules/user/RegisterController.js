/**
 * Registers a new user. After signing up, the user gets an activation code per mail. With this 
 * code, the user can activate his account.
 */
app.controller('RegisterController', function($scope, $location, $http){
  /**
   * Cancels the registration and takes the user back to the main page
   */
	$scope.cancel = function(){
    $location.path('/'); // redirect to the home page
  };

	$scope.register = function(){
    $http({
      method: 'POST',
      url: '/api/user/create',
      data: {
        username: $scope.user.username,
        email: $scope.user.email,
        password: $scope.user.password
      }
    })
    .success(function(data, status, headers, config) {
      $scope.registered = !$scope.registered;
    })
    .error(function(data, status, headers, config) {
      // #32 error handling
      if (status === 409){
        $scope.error = "User already exists. Please pick another username.";

        // empty field and set focus
        delete $scope.user.username;
        document.getElementById('username').focus();
        document.getElementById('username').scrollIntoView();
      }
      else{
        $scope.error = "Registering the user " + data.user.username + " failed. Please try again later." ;
        console.error($scope.error);
      }
    });

	};

});