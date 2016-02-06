'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('HeaderCtrl', [
    'loginService',
    '$state',
    '$rootScope',
    'serviceUsers',
    HeaderCtrl
  ]);

function HeaderCtrl(loginService, $state, $rootScope, serviceUsers) {

  var headerVm = this;

  function exit() {
    loginService.exit().then(function(success) {
      $state.go('signin');
    });
  }
  
  headerVm.exit = exit;

  serviceUsers.whoIsLogged().then(function (loggedUser) {
    $rootScope.loggedUser = loggedUser.user;
  });
  
}
