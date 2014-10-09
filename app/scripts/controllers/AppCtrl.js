angular.module('app')
  .controller('AppCtrl', function($scope, $interval, primesService, iface) {

    var primes = primesService.primes;

    // primes.unshift(1); // add 1 in front for easy multiplication

    function runTable() {
      $scope.$broadcast('generateTable', {input: $scope.inputNumber});
    }

    $scope.primes = primesService.primes;

    $scope.go = function() {
      if ($scope.inputNumber > 30) {
        iface.message('The chosen number is too big - max 30');
        $scope.inputNumber = 10;
        return;
      }
      runTable();
    };

    // run digest every second to refresh counter
    $interval(function() {}, 1000);

    (function init() {
      $scope.inputNumber = 10;
      runTable();
    })();


  });