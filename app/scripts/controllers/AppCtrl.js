angular.module('app')
  .controller('AppCtrl', function($scope, $interval, primesService, iface) {

    var primes = primesService.primes;

    // primes.unshift(1); // add 1 in front for easy multiplication

    function printTable() {
      $scope.$broadcast('generateTable', {input: $scope.inputNumber});
    }

    $scope.primes = primesService.primes;

    $scope.go = function() {
      if ($scope.inputNumber > 30) {
        iface.message('The chosen number is too big - max 30');

        // if we calculated enough prime numbers, show user this prime number in sequence
        if ($scope.inputNumber < primesService.primes.length) {
          iface.message('The ' + $scope.inputNumber + 'th prime is ' + primesService.primes[$scope.inputNumber]);
        }

        $scope.inputNumber = 10;
        return;
      }
      printTable();
    };

    // run digest every second to refresh counter
    // digest isn't run after each generated prime number for perfomance reasons
    $interval(function() {}, 1000);

    (function init() {
      // initialise with default and print table
      $scope.inputNumber = 10;
      printTable();
    })();

  });