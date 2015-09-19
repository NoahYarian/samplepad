angular.module('samplePad', [
  'samplePad.controllers',
  // 'samplePad.filters',
  // 'samplePad.services',
  // 'samplePad.directives',
  'ngRoute',
  'ui.bootstrap'])

.config(function($routeProvider) {
  $routeProvider

    .when('/main', {
      templateUrl : 'main.html',
      controller  : 'mainController'
    })

    .when('/myboards', {
      templateUrl : 'myboards.html',
      controller  : 'myboardsController'
    })

    .when('/create', {
      templateUrl : 'create.html',
      controller  : 'createController'
    });

});
