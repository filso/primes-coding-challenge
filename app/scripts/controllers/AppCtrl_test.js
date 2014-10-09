describe('AppCtrl', function() {
  'use strict';
  var scope, $httpBackend, iface;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, $rootScope) {

    iface = jasmine.createSpyObj('iface', ['message']);
    scope = $rootScope.$new();

    // to check broadcast event
    spyOn(scope, '$broadcast');

    $controller('AppCtrl', {
      '$scope': scope,
      'iface': iface
    });

  }));

  it('should initialise scope', inject(function(primesService) {
    expect(primesService.primes).toBe(scope.primes);
    expect(scope.inputNumber).toEqual(10);
  }));

  it('should handle user interaction', function() {

    scope.$broadcast.reset();
    scope.go();
    expect(scope.$broadcast).toHaveBeenCalledWith('generateTable', { input : 10 });

    scope.inputNumber = 30;
    scope.$broadcast.reset();
    scope.go();
    expect(scope.$broadcast).toHaveBeenCalledWith('generateTable', { input : 30 });




    scope.inputNumber = 60;
    scope.$broadcast.reset();
    scope.go();
    expect(scope.$broadcast).not.toHaveBeenCalled();

    // message - number to big
    expect(iface.message).toHaveBeenCalledWith('The chosen number is too big - max 30');

  });


});