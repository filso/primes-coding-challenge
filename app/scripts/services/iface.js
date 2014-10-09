angular.module('app')
  .factory('iface', function() {

    return {
      message: function(text) {
        alert(text);
      }
    };

  });
