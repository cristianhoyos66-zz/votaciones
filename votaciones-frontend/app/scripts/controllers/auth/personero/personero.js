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

  //RECORDAR CAMBIAR LOS NÚMEROS DE IDENTIFICACIÓN DE LOS ESTUDIANTES
  function notifyGetAllUsers(users) {
    personerosVm.students = [];
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      switch (user.username) {
      case '1001226011':
	personerosVm.students.push(user);
	break;
      case '1000292830':
	personerosVm.students.push(user);
	break;
      case '1000189695':
	personerosVm.students.push(user);
	break;
      case '99042706481':
	personerosVm.students.push(user);
	break;
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
