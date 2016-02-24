'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthPersoneroCtrl
 * @description
 * # AuthPersoneroCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthPersoneroCtrl', [
    'serviceUsers',
    'serviceMessages',
    AuthPersoneroCtrl
  ]);

function AuthPersoneroCtrl(serviceUsers, serviceMessages) {

  var personerosVm = this;

  function errorGetAllUsers() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetAllUsers(users) {
    personerosVm.students = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].profile.grade === 'Ac'){
	personerosVm.students.push(users[i]);
      }
    }
    for (var i = 0; i < personerosVm.students.length; i++) {
      for (var j = 0; j < personerosVm.personerosCandidates.length; j++) {
	if (personerosVm.students[i]._id === personerosVm.personerosCandidates[j]._id) {
	  personerosVm.students.splice(i, 1);
	}
      }
    }
  }

  function errorGetPersonerosCandidates() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetPersonerosCandidates(users) {
    personerosVm.personerosCandidates = users;
  }

  function addCandidates(user) {
    serviceUsers.setUserAsPersonero(user._id);
  }

  function removeCandidates(user) {
    serviceUsers.removeUserAsPersonero(user._id);
  }

  

  serviceUsers.getUsersPersonerosCandidates().then(0, errorGetPersonerosCandidates, notifyGetPersonerosCandidates);

  serviceUsers.getAll().then(0, errorGetAllUsers, notifyGetAllUsers);

  personerosVm.addCandidates = addCandidates;

  personerosVm.removeCandidates = removeCandidates;
  
}
