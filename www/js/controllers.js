angular.module('samplePad.controllers', [])

  .controller('mainController', ['$scope', function ($scope) {

    $scope.message = "hello";

  }])

  .controller('myboardsController', ['$scope', function ($scope) {

    $scope.message = "myboards";

  }])

  .controller('createController', ['$scope', function ($scope) {

    $scope.message = "create";

  }]);
