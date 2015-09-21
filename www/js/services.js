'use strict';

angular.module('samplePad.services', [])

  // .service('Board', ['$http', function ($http) {
  //   this.load = function (board_id) {
  //     $http.get('/api/boards/' + board_id)
  //       .then(function(response) {

  //       }, function(response) {

  //       });
  //   };

  // }]);

  .factory('Board', ['$http', function($http) {
    return {
      create: function() {
        return $http.post('/api/boards');
      },
      load: function(board_id) {
        return $http.get('api/boards/' + board_id);  // returns a promise
      },
      save: function(board) {
        return $http.put('api/boards/' + board._id);  // returns a promise
      },
      delete: function(board_id) {
        return $http.delete('api/boards/' + board_id);  // returns a promise
      }
    };
  }]);
