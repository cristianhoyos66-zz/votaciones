'use strict';

/**
 * @ngdoc overview
 * @name votacionesFrontendApp
 * @description
 * # votacionesFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('votacionesFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui.footable',
    'virtualbeamsAsteroid',
    'ui.select'
  ]);

angular.module('votacionesFrontendApp').run([
  '$rootScope',
  'constantMeteorConfig',
  '$state',
  'vbaService',
  'serviceUsers',
  'serviceMessages',
  '$timeout',
  votacionesFrontendRun
]);

angular.module('votacionesFrontendApp')
  .config([
    'vbaConfigProvider', 
    'constantMeteorConfig', 
    votacionesFrontendConfig
  ]);

function votacionesFrontendConfig(vbaConfigProvider, constantMeteorConfig) {
  var activeDebug = location.host.match('127.0.0.1') ? true : false;
  //virtual beams asteroid
  vbaConfigProvider.host(constantMeteorConfig.url);
  vbaConfigProvider.logError(activeDebug);
  vbaConfigProvider.log(activeDebug);
  vbaConfigProvider.loginRequiredInCalls(true);
  vbaConfigProvider.loginRequiredInSubscribes(true);
  vbaConfigProvider.stopSubscriptionsOnLogout(true);
}

function votacionesFrontendRun($rootScope, constantMeteorConfig, $state, vbaService, serviceUsers, serviceMessages, $timeout) {

  serviceUsers.whoIsLoggedSub().then(0, 0, function(loggedUser) {
    $timeout(function() {
      $rootScope.$apply(function() {
	$rootScope.loggedUser = loggedUser[0];
      });
    })
  });
   
  //get current state
  $rootScope.$on('$stateChangeSuccess', function(event, toState, fromState, toParams, fromParams) {
    $rootScope.currentState = toState;
    vbaService.get()._tryResumeLogin();
  });  
  //get global url to the server
  $rootScope.urlServer = constantMeteorConfig.urlServer;

  //event that listen when there's error login and with token
  $rootScope.$on('virtualbeamsAsteroidLoginError', function (error) {
    $state.go('signin');
  });

  $rootScope.$on('virtualbeamsAsteroidDisconnected', function () {
    serviceMessages.generalMessage('Sin conexión', 'El servidor está inactivo', "warning");
  });  
  
}

