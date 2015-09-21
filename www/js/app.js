'use strict';

angular.module('samplePad', [
  'samplePad.controllers',
  // 'samplePad.filters',
  'samplePad.services',
  // 'samplePad.directives',
  'ngRoute',
  'ui.bootstrap'])

.config(function($routeProvider) {
  $routeProvider

    .when('/main', {
      templateUrl : 'main.html',
      controller  : 'mainController'
    })

    .when('/boards/:id', {
      templateUrl : 'board.html',
      controller  : 'boardController'
    })

    .otherwise({
      redirectTo: '/main'
    });
});
