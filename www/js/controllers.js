'use strict';

angular.module('samplePad.controllers', [])

  .controller('headerController', ['$scope', '$location', 'Board', 'EditMode', function ($scope, $location, Board, EditMode) {

    $scope.editMode = false;

    $scope.$on('editModeUpdated', function() {
      $scope.editMode = EditMode.status;
    });

    $scope.isActive = function (viewLocation) {
      return $location.path().indexOf(viewLocation) == 0;
    }

    $scope.createBoard = function() {
      Board.create()
        .then(function(response) {
          console.log(response.data.message);
          $location.path('/boards/' + response.data.board_id);
        });
    }

    $scope.deleteBoard = function () {
      var board_id = $location.path().split('/')[2];
      Board.delete(board_id)
        .then(function(response) {
          console.log(response.data.message);
          EditMode.updateEditMode(false);
          $location.path('/');
        });
    }

  }])

  .controller('mainController', ['$scope', function ($scope) {

    $scope.message = "hello";

  }])

  .controller('boardController', ['$scope', '$timeout', '$routeParams', '$location', 'Board', 'EditMode',
    function ($scope, $timeout, $routeParams, $location, Board, EditMode) {

    $scope.editMode = false;

    $scope.$watch('editMode', function() {
      EditMode.updateEditMode($scope.editMode);
    });

    $scope.$on('editModeUpdated', function() {
      $scope.editMode = EditMode.status;
    });

    Board.load($routeParams.id)
      .then(function(response) {
        $scope.board = response.data;
      });

    $scope.saveBoard = function () {
      Board.save($scope.board)
        .then(function(response) {
          console.log(response.data.message);
        });
    }

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
        $scope.saveBoard();
        $scope.editMode = false;
      } else {
        $edges.css("background-color", "#76FF03");
        $span
          .css("color", "#76FF03")
          .text('SAVE');
        $scope.editMode = true;
      }

    }

    $scope.editPad = function (padNum, $event) {

      return "3";
    }

  }]);
