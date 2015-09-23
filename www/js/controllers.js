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

    $scope.googleInit = function() {
      gapi.signin2.render('g-signin2', {
        'scope': 'email',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': $scope.onSignIn(googleUser)
      });
    }
    $scope.googleInit();

    $scope.onSignIn = function (googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }

    $scope.signOut = function () {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }

  }])

  .controller('boardController', ['$scope', '$timeout', '$routeParams', '$location', 'Board', 'EditMode',
    function ($scope, $timeout, $routeParams, $location, Board, EditMode) {

    $scope.board = {};
    $scope.charCodeArr = [];
    $scope.editMode = false;
    $scope.padNumBeingEdited = '';
    $scope.editingBoardName = false;
    $scope.oldBoardName = '';

    $scope.initBoard = function() {
      Board.load($routeParams.id)
        .then(function(response) {
          console.log(response);
          $scope.board = response.data;

          // load pad sounds
          lowLag.init({sm2url: "lib/sm2/swf/"});
          for (var i = 1; i < 13; i++) {
            $scope.loadSound(i, $scope.board.pads[i-1].src);
          }

          $scope.updateCharCodeArr();

        });

    }

    $scope.initBoard();

    // Event Listeners
    $scope.$watch('editMode', function() {
      EditMode.updateEditMode($scope.editMode);
    });

    $('body').keydown(function(event) {
      if ($scope.charCodeArr.indexOf(event.which) !== -1) {
        $scope.triggerPad($scope.charCodeArr.indexOf(event.which) + 1);
      }
    });
    //////////////


    $scope.loadSound = function(padNum, src) {
      lowLag.load(src, padNum)
    }

    $scope.updateCharCodeArr = function () {   // default is [49,50,51,52,81,87,69,82,65,83,68,70];
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

    $scope.triggerPad = function(padNum) {

      if (!$scope.editMode && !$scope.editingBoardName) {

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

        // I modified lowLag.js to accept an optional callback
        // to play() that fires on the 'ended' event.

        lowLag.play(padNum, function () {
          $edges.css("background-color", "#651FFF");
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

        $(document).off("click");

        $edges.css("background-color", "#FF3D00");
        $span
          .css("color", "#FF3D00")
          .text('EDIT');
        $scope.saveBoard();
        $scope.editMode = false;

      } else {

        $(document).click(function(event) {
          var $element = $(event.target);
          $element.prevAll('.edit-pad-button').click();
        });

        $edges.css("background-color", "#76FF03");
        $span
          .css("color", "#76FF03")
          .text('SAVE');
        $scope.editMode = true;
      }

    }

    $scope.editPad = function (padNum) {
      $scope.padNumBeingEdited = padNum;
      $scope.padDetails = {
        name: $scope.board.pads[padNum-1].name,
        src: $scope.board.pads[padNum-1].src,
        hotkey: $scope.board.pads[padNum-1].hotkey
      }
      $('#modal').modal('show');

      $(document).keydown(function(e) {
        if (e.keyCode == 27) {   // esc
          $('.cancel-pad-edits-button').click();
          $(document).off("keydown");
        }
      });

    };

    $scope.submitPadEdits = function (padDetails) {
      $scope.board.pads[$scope.padNumBeingEdited-1] = {
        name: padDetails.name,
        src: padDetails.src,
        hotkey: padDetails.hotkey
      }
      $scope.loadSound($scope.padNumBeingEdited, padDetails.src);
      $scope.updateCharCodeArr();
      $scope.padNumBeingEdited = '';
      $('#modal').modal('hide');
    }

    $scope.cancelPadEdits = function() {
      $scope.padNumBeingEdited = '';
      $(document).off("keydown");
    }

    $scope.editBoardName = function() {
      $scope.editingBoardName = true;
      $scope.oldBoardName = $scope.board.name;
      $(document).keydown(function(e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {       // enter
          $scope.$apply(function() {
            $scope.submitBoardNameEdit();
          });
          $(document).off("keydown");
        }
        if (e.keyCode == 27) {       // esc
          $scope.$apply(function () {
            $scope.cancelBoardNameEdit();
          });
          $(document).off("keydown");
        }
      });
    }

    $scope.submitBoardNameEdit = function () {
      $scope.editingBoardName = false;
      $scope.oldBoardName = '';
      $scope.saveBoard();
    }

    $scope.cancelBoardNameEdit = function () {
      $scope.board.name = $scope.oldBoardName;
      $scope.editingBoardName = false;
    }

  }]);
