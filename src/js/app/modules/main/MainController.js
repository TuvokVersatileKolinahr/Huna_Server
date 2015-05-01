/**
 * Main controller for the Huna JS app. Shows the main (index) page
 */
app.controller('MainController', function($scope, $location){

	$scope.register = function(){
		$location.path('/user/register');
	};

});