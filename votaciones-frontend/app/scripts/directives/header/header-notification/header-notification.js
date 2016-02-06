'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('votacionesFrontendApp')
  .directive('headerNotification',function(){
    return {
      templateUrl:'scripts/directives/header/header-notification/header-notification.html',
      controller: 'HeaderCtrl as headerVm',
      restrict: 'E',
      replace: true,
    }
  });


