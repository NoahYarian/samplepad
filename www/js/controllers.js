'use strict';

angular.module('samplePad.controllers', [])

  .controller('headerController', ['$scope', '$location', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
      return $location.path().indexOf(viewLocation) == 0;
    };

  }])

  .controller('mainController', ['$scope', function ($scope) {

    $scope.message = "hello";

  }])

  .controller('myboardsController', ['$scope', function ($scope) {

    $scope.message = "myboards";

  }])

  .controller('createController', ['$scope', function ($scope) {

    $scope.message = "create";
    $scope.user =   {
      "_id": "55fdd37c2f8cf520ea1bd251",
      "email": "a@b.com",
      "name": "Bob",
      "__v": 0
    };

  }]);
