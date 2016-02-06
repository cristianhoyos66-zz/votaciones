'use strict';

/**
 * @ngdoc service
 * @name votacionesFrontendApp.loginService
 * @description
 * # loginService
 * Service in the votacionesFrontendApp.
 */
angular.module('votacionesFrontendApp')
  .service('loginService', [
    'vbaService',
    'constantMeteorConfig',
    '$q',
    loginService
  ]);

function loginService(vbaService, cmc, $q) {
  
  this.login = function (user) {
    var promise = vbaService.get().loginWithPassword(user.username, user.password || ' ');
    return $q.when(promise);
  };

  this.exit = function () {
    var promise = vbaService.get().logout();
    return $q.when(promise);
  };
  
}
