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

      var padCuboid = $event.srcElement.parentElement.parentElement;
      var $edges = $(padCuboid).find(".face").not(".tp")
      $edges.css("background-color", "#76FF03");

      //$edges.css("height", "0.5em");
      //TODO: translate buttons correctly based on perspective

      $(audioElement).on("ended", function () {
        $edges.css("background-color", "#651FFF");
      });

    };

  }]);
