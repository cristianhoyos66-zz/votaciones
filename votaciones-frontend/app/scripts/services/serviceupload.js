'use strict';

/**
 * @ngdoc service
 * @name votacionesFrontendApp.serviceUpload
 * @description
 * # serviceUpload
 * Service in the votacionesFrontendApp.
 */
angular.module('votacionesFrontendApp')
  .service('serviceUpload', [
    'vbaService',
    'constantMeteorConfig',
    serviceUpload
  ]);

function serviceUpload(vbaService, cmc) {

  this.uploadFile = function (data) {
    return vbaService.call(cmc.methods.uploads.uploadFile, data);
  };
  
}
