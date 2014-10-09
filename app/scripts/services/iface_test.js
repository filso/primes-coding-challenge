describe('iface', function() {
  'use strict';
  var scope, $httpBackend, iface;

  beforeEach(module('app'));

  beforeEach(inject(function(_iface_) {
    iface = _iface_;
  }));

  it('shows message', inject(function($window) {
    var arg = 'SAMPLE_MESSAGE';

    spyOn($window, 'alert');
    iface.message(arg);
    expect($window.alert).toHaveBeenCalledWith(arg);

  }));

});