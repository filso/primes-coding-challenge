angular.module('app')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'template/table.html',
        controller: 'TableCtrl'
      });

  });