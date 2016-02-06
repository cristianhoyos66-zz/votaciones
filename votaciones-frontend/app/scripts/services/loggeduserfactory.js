'use strict';

/**
 * @ngdoc service
 * @name votacionesFrontendApp.loggedUserFactory
 * @description
 * # loggedUserFactory
 * Factory in the votacionesFrontendApp.
 */
angular.module('votacionesFrontendApp')
  .factory('loggedUserFactory', function () {
   
    var sharedData = {
      loggedUser: {}
    };

    return {
      sharedData
    };
  });
