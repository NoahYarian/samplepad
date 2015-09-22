'use strict';

angular.module('samplePad.controllers', [])

  .controller('headerController', ['$scope', '$location', 'Board', 'EditMode', function ($scope, $location, Board, EditMode) {

    $scope.editMode = false;
    $scope.boards = [];

    Board.getAll()
      .then(function(response) {
        $scope.boards = response.data;
      });

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
          $scope.boards
          $location.path('/boards/' + response.data.board_id);
        });
    }

    $scope.deleteBoard = function () {    //TODO: add confirmation for delete
      var board_id = $location.path().split('/')[2];
      Board.delete(board_id)
        .then(function(response) {
          console.log(response.data.message);
          EditMode.updateEditMode(false);
          $scope.boards
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
    $scope.board = {};
    $scope.sounds = [];
    $scope.charCodeArr = [];

    $scope.initBoard = function() {
      Board.load($routeParams.id)
        .then(function(response) {
          console.log(response);
          $scope.board = response.data;

          soundManager.setup({
            url: '/lib/soundmanager2/swf/',
            onready: function() {
              for (var i = 1; i < 13; i++) {
                $scope.loadSound(i, $scope.board.pads[i-1].src);
              }
            }
          });

          $scope.makeCharCodeArr();

        });

    }

    $scope.initBoard();

    // Event Listeners
    $scope.$watch('editMode', function() {
      EditMode.updateEditMode($scope.editMode);
    });

    $('body').keypress(function(event) {
      if ($scope.charCodeArr.indexOf(event.which) !== -1) {
        $scope.triggerPad($scope.charCodeArr.indexOf(event.which) + 1);
      }
    });
    //////////////


    $scope.loadSound = function(padNum, src) {
      $scope.sounds[padNum-1] = soundManager.createSound({
        url: $scope.board.pads[padNum-1].src
      });
    }

    $scope.makeCharCodeArr = function () {   // default is [49,50,51,52,81,87,69,82,65,83,68,70];
      $scope.board.pads.forEach(function(pad, i) {
        $scope.charCodeArr[i] = pad.hotkey.charCodeAt(0);
      });
    }


    $scope.saveBoard = function () {
      Board.save($scope.board)
        .then(function(response) {
          console.log(response.data.message);
        });
    }

    $scope.triggerPad = function(padNum, $event) {

      if (!$scope.editMode) {

        var $padCuboid = $('#pad-' + padNum).parent();
        var $edges = $padCuboid.find(".face").not(".tp")

        // change edge color when triggered
        $edges.css("background-color", "#76FF03");

        // button pressed appearance
        var observedTransform = $padCuboid.css("transform");
        var observedTransformArr = observedTransform.split(',');
        observedTransformArr[13] = " -14";
        var pressedTransform = observedTransformArr.join(',');
        $padCuboid.css("transform", pressedTransform);

        // fixed issue with multiple clicks within 200ms
        var initialTransformArr = observedTransform.split(',');
        initialTransformArr[13] = " -21";
        var initialTransform = initialTransformArr.join(',');

        $timeout(function() {
          $padCuboid.css("transform", initialTransform);
        }, 200);

        // play the sound and change the edge color back after it finishes
        $scope.sounds[padNum-1].play({
          onfinish: function() {
            $edges.css("background-color", "#651FFF");
          }
        });

        // TODO: it would be nice to use mouse down and mouse up events to keep the pad pressed
        // down as long as the mouse button is held, even though there would be no functional value.
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
