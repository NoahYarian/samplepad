'use strict';

angular.module('samplePad.services', [])

  .factory('Board', ['$http', function($http) {   // These methods return promises
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
      }
    };
  }])

  .factory('EditMode', ['$rootScope', function($rootScope) {
    var service = {};
    service.status = false;
    service.updateEditMode = function(status) {
      this.status = status;
      $rootScope.$broadcast("editModeUpdated");
    }
    return service;
  }])
