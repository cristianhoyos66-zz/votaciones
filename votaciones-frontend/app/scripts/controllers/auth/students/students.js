'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthStudentsCtrl
 * @description
 * # AuthStudentsCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthStudentsCtrl', [
    '$uibModal',
    '$timeout',
    'serviceUsers',
    'serviceMessages',
    AuthStudentsCtrl
  ]);

function AuthStudentsCtrl($uibModal, $timeout, serviceUsers, serviceMessages) {

  var studentsVm = this;

  function instanceStudentsModal(student) {
    $uibModal.open({
      animation: true,
      templateUrl: 'views/auth/students/editcreate.html',
      size: 'lg',
      controller: 'AuthStudentsEditcreateCtrl as editcreateVm',
      backdrop: false,
      resolve: {
	resolveData: function() {
	  return student;
	}
      }
    });
  }

  function newStudent() {
    instanceStudentsModal();
  }

  function editStudent(student) {
    instanceStudentsModal(angular.copy(student));
  }

  function resolveRemoveStudent (resolve) {
    serviceMessages.generalMessage('Eliminado', 'Registro eliminado con éxito', "success"); 
  }

  function errorRemoveStudent() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function removeStudent(student) {
    swal({   
      title: '¿Estás seguro?',   
      text: 'Si eliminas este registro, no se podrá recuperar',   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#F0AD4E",   
      confirmButtonText: 'Sí, eliminar',   
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#EF5350",
      closeOnConfirm: false 
    }, function() {   
      if (student) {
	serviceUsers.remove(student._id).then(resolveRemoveStudent, errorRemoveStudent);
      }
    });
  }

  function redrawFootable() {
    $timeout(function() {
      $('.footable').trigger('footable_redraw');
    }, 1);
  }

  function errorGetAllUsers() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetAllUsers(users) {
    redrawFootable();
    studentsVm.students = users;
  }

  serviceUsers.getAll().then(0, errorGetAllUsers, notifyGetAllUsers);
  redrawFootable();
  studentsVm.newStudent = newStudent;
  studentsVm.editStudent = editStudent;
  studentsVm.removeStudent = removeStudent;
  
}












