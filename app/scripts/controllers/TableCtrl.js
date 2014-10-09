angular.module('app')
  .controller('TableCtrl', function($scope, primesService) {

    function generateRows(primes, count) {
      var rows = [];
      for (var i = 0; i < count; i++) {
        var row = rows[i] = [];
        for (var j = 0; j < count; j++) {
          // multiply primes
          rows[i].push(primes[i] * primes[j]);
        }
      }
      return rows;
    }

    $scope.$on('generateTable', function(event, obj) {
      $scope.rows = generateRows(primesService.primes, obj.input);
    });


  });