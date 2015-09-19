angular.module('samplePad', [
  'samplePad.controllers',
  // 'samplePad.filters',
  // 'samplePad.services',
  // 'samplePad.directives',
  'ngRoute',
  'ui.bootstrap'])

.config(function($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl : 'main.html',
      controller  : 'mainController'
    });

});
