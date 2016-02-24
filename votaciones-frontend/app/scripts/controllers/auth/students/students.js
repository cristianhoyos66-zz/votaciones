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
    'serviceUpload',
    '$rootScope',
    AuthStudentsCtrl
  ]);

function AuthStudentsCtrl($uibModal, $timeout, serviceUsers, serviceMessages, serviceUpload, $rootScope) {

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

  function resolveGetAllUsers(resolve) {
    redrawFootable();
    $rootScope.students = [];
    $rootScope.students.push.apply($rootScope.students, resolve.users);
  }

  function errorGetAllUsers() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  $rootScope.getAllStudents = function() {
    serviceUsers.getAllUsers().then(resolveGetAllUsers, errorGetAllUsers);
  };

  function newStudent() {
    instanceStudentsModal();
  }

  function editStudent(student) {
    instanceStudentsModal(angular.copy(student));
  }

  function resolveRemoveStudent (resolve) {
    serviceMessages.generalMessage('Eliminado', 'Registro eliminado con éxito', "success");
    $rootScope.getAllStudents();
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

  function fileSelected (files) {
    if (files && files.length > 0 && (files[0].type.indexOf("application") > -1)) {
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var data = {
          fileName: file.name,
          fileData: reader.result,
          folder: 1
        };
        serviceUpload.uploadFile(data).then(function (result) {
	  serviceUsers.saveUsersByExcelFile(result.fileName).then(function(resolve) {
	    angular.element('#file').val(null);
	    serviceMessages.generalMessage('Usuarios agregados', 'Los usuarios se agregaron correctamente', "success");
	    $rootScope.getAllStudents();
	  });
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  function selectFile() {
    angular.element('#file').trigger('click');    		
  };

  function resolveRemoveAllUsers(resolve) {
    serviceMessages.generalMessage('Eliminados', 'Registros eliminados con éxito', "success");
    $rootScope.getAllStudents();
  }

  function rejectRemoveAllUsers() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function removeAllUsers() {
    swal({   
      title: '¿Estás seguro?',   
      text: 'Si eliminas estos registros, no se podrán recuperar',   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#F0AD4E",   
      confirmButtonText: 'Sí, eliminar',   
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#EF5350",
      closeOnConfirm: false 
    }, function() {   
      serviceUsers.removeAllUsers().then(resolveRemoveAllUsers, rejectRemoveAllUsers);
    });
  }

  $rootScope.getAllStudents();
  
  //serviceUsers.getAll().then(0, errorGetAllUsers, notifyGetAllUsers);
  redrawFootable();
  studentsVm.newStudent = newStudent;
  studentsVm.editStudent = editStudent;
  studentsVm.removeStudent = removeStudent;
  studentsVm.fileSelected = fileSelected;
  studentsVm.selectFile = selectFile;
  studentsVm.removeAllUsers = removeAllUsers;
  
}












