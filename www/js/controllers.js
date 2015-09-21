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

    $scope.editMode = false;

    $scope.play = function(audioElement, $event) {

      // $(audioElement)[0].load();
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

    $scope.toggleEditMode = function ($event) {

      // Change appearance of button and toggle $scope.editMode
      var $editModeButton = $('#edit-mode-button');

      var $span = $editModeButton.find("span");
      var $edges = $editModeButton.parent().find(".face").not(".tp");
      var $top = $editModeButton.find(".tp");

      if ($scope.editMode) {
        $edges.css("background-color", "#FF3D00");
        $span
          .css("color", "#FF3D00")
          .text('EDIT');
        $scope.editMode = false;
      } else {
        $edges.css("background-color", "#76FF03");
        $span
          .css("color", "#76FF03")
          .text('SAVE');
        $scope.editMode = true;
      }

    }

    $scope.getPadName = function (padNum) {
      return "Pad Name";
    }

    $scope.getHotkey = function (padNum) {
      return "3";
    }

  }]);
