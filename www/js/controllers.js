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

  .controller('padController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.editMode = false;

    $scope.play = function(audioElement, $event) {

      if (!$scope.editMode) {
        $(audioElement)[0].play();

        var padCuboid = $event.srcElement.parentElement.parentElement;
        var $edges = $(padCuboid).find(".face").not(".tp")
        $edges.css("background-color", "#76FF03");

        // button pressed appearance
        var observedTransform = $(padCuboid).css("transform");
        var observedTransformArr = observedTransform.split(',');
        observedTransformArr[13] = " -14";
        var pressedTransform = observedTransformArr.join(',');
        $(padCuboid).css("transform", pressedTransform);

        // this was necessary for multiple clicks before transform value was reset
        var initialTransformArr = observedTransform.split(',');
        initialTransformArr[13] = " -21";
        var initialTransform = initialTransformArr.join(',');

        $timeout(function() {
          $(padCuboid).css("transform", initialTransform);
        }, 200);

        // TODO: it would be nice to use mouse down and mouse up events to keep the pad pressed
        // down as long as the mouse button is held, even though there would be no functional value.

        $(audioElement).on("ended", function () {
          $edges.css("background-color", "#651FFF");
          // $(padCuboid).css("transform", initialTransform);
        });
      }

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
      return "Pad Name for " + padNum;
    }

    $scope.getHotkey = function (padNum) {
      return "3";
    }

    $scope.editPad = function (padNum, $event) {

      return "3";
    }

  }]);
