'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthComptrollerCtrl
 * @description
 * # AuthComptrollerCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthComptrollerCtrl', [
    'serviceUsers',
    'serviceMessages',
    AuthComptrollerCtrl
  ]);

function AuthComptrollerCtrl(serviceUsers, serviceMessages) {

  var comptrollersVm = this;

  function errorGetAllUsers() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetAllUsers(users) {
    comptrollersVm.students = users;
    for (var i = 0; i < comptrollersVm.students.length; i++) {
      for (var j = 0; j < comptrollersVm.comptrollerCandidates.length; j++) {
	if (comptrollersVm.students[i]._id === comptrollersVm.comptrollerCandidates[j]._id) {
	  comptrollersVm.students.splice(i, 1);
	}
      }
    }
  }

  function errorGetComptrollersCandidates() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetComptrollersCandidates(users) {
    comptrollersVm.comptrollerCandidates = users;
  }

  function addCandidates(user) {
    serviceUsers.setUserAsComptroller(user._id);
  }

  function removeCandidates(user) {
    serviceUsers.removeUserAsComptroller(user._id);
  }

  
  serviceUsers.getUsersComptrollerCandidates().then(0, errorGetComptrollersCandidates, notifyGetComptrollersCandidates);

  serviceUsers.getAll().then(0, errorGetAllUsers, notifyGetAllUsers);
  
  comptrollersVm.addCandidates = addCandidates;

  comptrollersVm.removeCandidates = removeCandidates;
  
}
