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

  .controller('padController', ['$scope', function ($scope) {

    $scope.message = "pad";
    $scope.play = function(audioElement, $event) {

      $(audioElement)[0].play();

      var padCub = $event.srcElement.parentElement.parentElement;
      $(padCub).find(".face").not(".tp").css("background-color", "#FF9900");

      $(audioElement).on("ended", function () {
        console.log("done playing");
        $(padCub).find(".face").not(".tp").css("background-color", "#651FFF");
      });

    };

  }]);
