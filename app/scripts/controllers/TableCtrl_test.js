describe('TableCtrl', function() {
  'use strict';
  var scope, $httpBackend;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, $rootScope) {

    var primesService = {
      primes: [2, 3, 13, 25]
    };

    scope = $rootScope.$new();
    $controller('TableCtrl', {
      '$scope': scope,
      primesService: primesService
    });

  }));

  it('should generate multiplication table data', function() {

    // testing the behaviour - event driven, implementation is hidden
    scope.$broadcast('generateTable', {input: 2});
    expect(scope.rows).toEqual([ [ 4, 6 ], [ 6, 9 ] ]);

    scope.$broadcast('generateTable', {input: 4});
    expect(scope.rows).toEqual([ [ 4, 6, 26, 50 ], [ 6, 9, 39, 75 ], [ 26, 39, 169, 325 ], [ 50, 75, 325, 625 ] ]);

  });

});