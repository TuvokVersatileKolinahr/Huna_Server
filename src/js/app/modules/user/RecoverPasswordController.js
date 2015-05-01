/**
 * Recovers your password, requested by email address
 */
app.controller('RecoverPasswordController', function($scope){

  $scope.recovery = false;

  $scope.recover = function(){
    $scope.recovery = true;
  };

});