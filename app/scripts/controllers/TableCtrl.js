angular.module('app')
  .controller('TableCtrl', function($scope, primesService) {

    function generateRows(primes, count) {
      var rows = [];
      for (var i = 0; i < count; i++) {
        var row = rows[i] = [];
        for (var j = 0; j < count; j++) {
          // multiply primes
          console.log(j);
          rows[i].push(primes[i] * primes[j]);
        }
      }
      return rows;
    }

    $scope.$on('generateTable', function(event, obj) {
      // console.log(obj.input);
      $scope.rows = generateRows(primesService.primes, obj.input);
    });


  });