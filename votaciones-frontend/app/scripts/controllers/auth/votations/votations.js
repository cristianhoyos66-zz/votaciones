'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthVotationsVotationsCtrl
 * @description
 * # AuthVotationsVotationsCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthVotationsVotationsCtrl',[
    'serviceRatings',
    'serviceMessages',
    AuthVotationsVotationsCtrl
  ]);

function AuthVotationsVotationsCtrl(serviceRatings, serviceMessages) {

  var votationsVm = this;

  function errorGetAllRatings(error) {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetAllRatings(ratings) {
    votationsVm.personerosList = [];
    votationsVm.comptrollerList = [];
    for (var i = 0; i < ratings.length; i++) {
      if (ratings[i].idType === 1) {
	votationsVm.personerosList = ratings[i];
	votationsVm.totalPersonerosRates = ratings[i].total;
      }
      if (ratings[i].idType === 2) {
	votationsVm.comptrollerList = ratings[i];
	votationsVm.totalComptrollerRates = ratings[i].total;
      }
    }
  }

  serviceRatings.getAllRatings().then(0, errorGetAllRatings, notifyGetAllRatings);
  
}
