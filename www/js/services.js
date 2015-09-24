'use strict';

angular.module('samplePad.services', [])

  .factory('Board', ['$http', '$rootScope', function($http, $rootScope) {   // These methods return promises
    return {
      create: function() {
        return $http.post('/api/boards');
      },
      load: function(board_id) {
        return $http.get('api/boards/' + board_id);
      },
      save: function(board) {
        board.updated = Date();
        return $http.put('api/boards/' + board._id, board);
      },
      delete: function(board_id) {
        return $http.delete('api/boards/' + board_id);
      },
      getAll: function() {
        return $http.get('api/boards');
      },
      setBoards: function(boards) {
        $rootScope.boards = boards;
        $rootScope.$broadcast("boardsUpdated");
      },
      updateBoards: function() {
        this.getAll()
          .then(function(response) {
            $rootScope.boards = response.data;
            $rootScope.$broadcast("boardsUpdated");
          });
      }
    };
  }])

  .factory('BoardList', ['$rootScope', function($rootScope) {
    var service = {};
    service.boards = [];
    service.updateBoards = function(boards) {
      this.boards = boards;
      $rootScope.$broadcast("boardsUpdated");
    }
    return service;
  }])

  .factory('EditMode', ['$rootScope', function($rootScope) {
    var service = {};
    service.status = false;
    service.updateEditMode = function(status) {
      this.status = status;
      $rootScope.$broadcast("editModeUpdated");
    }
    return service;
  }]);



