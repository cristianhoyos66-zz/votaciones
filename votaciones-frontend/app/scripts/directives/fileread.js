'use strict';

/**
 * @ngdoc directive
 * @name votacionesFrontendApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('votacionesFrontendApp')
  .directive('fileread', function () {
     return {
      scope: {
        fileread: '&',
      },
      link: function (scope, element) {
	element[0].style.display = 'none';
        element.bind('change', function (evt) {
          scope.$apply(function () {
	    scope.fileread({files: evt.target.files});
          });
        });
      }
    };
  });
