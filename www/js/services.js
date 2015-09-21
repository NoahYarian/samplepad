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
      load: function(board_id) {
        return $http.get('api/boards/' + board_id);  //1. this returns promise
      }
    };
  }]);
