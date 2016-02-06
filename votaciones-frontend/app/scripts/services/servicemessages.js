'use strict';

/**
 * @ngdoc service
 * @name votacionesFrontendApp.serviceMessages
 * @description
 * # serviceMessages
 * Service in the votacionesFrontendApp.
 */
angular.module('votacionesFrontendApp')
  .service('serviceMessages', serviceMessages);

function serviceMessages() {

  this.generalMessage = function (title, text, type) {
      swal({
  	title: title,   
  	text: text,   
  	type: type,
  	timer: 2000,   
  	showConfirmButton: false
      }); 
    };
  
}
