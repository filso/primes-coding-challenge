describe('AppCtrl', function() {
  'use strict';
  var scope, $httpBackend;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();
    $controller('TableCtrl', {
      '$scope': scope
    });

  }));

  it('should ', function() {

  });


});