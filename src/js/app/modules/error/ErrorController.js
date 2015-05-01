/**
 * Main controller for the Huna JS app. Shows the main (index) page
 */
app.controller('ErrorController', function($scope, $interval){

  var stop;
  $scope.timeout = "";
  $scope.busy = false;

  $scope.parseError = function(){
    countDown();
    var a = "";
    a.asdf = asdf;
  };

  $scope.syntaxError = function(){
    countDown();
    eval("var a = b;"); // jshint ignore:line
  };

  $scope.uncaughtException = function(){
    countDown();
    throw new Error("Uncaught Exception...");
  };

  $scope.stop = function(){
    if (angular.isDefined(stop)){
      $interval.cancel(stop);
      stop = undefined;
      $scope.timeout = "";
      $scope.busy = false;
    }
  };

  function countDown(){
    $scope.busy = true;
    $scope.timeout = 8;
    stop = $interval(function(){
      $scope.timeout--;
      if ($scope.timeout <= 0){
        $scope.stop();
      }
    }, 1000);
  }


  $scope.$on('$destroy', function() {
    $scope.stop();
  });

});