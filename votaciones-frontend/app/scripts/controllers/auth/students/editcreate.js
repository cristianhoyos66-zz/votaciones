'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthStudentsEditcreateCtrl
 * @description
 * # AuthStudentsEditcreateCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthStudentsEditcreateCtrl', [
    '$uibModalInstance',
    'resolveData',
    'serviceUsers',
    'serviceMessages',
    'serviceUpload',
    '$rootScope',
    AuthStudentsEditcreateCtrl
  ]);

function AuthStudentsEditcreateCtrl($uibModalInstance, resolveData, serviceUsers, serviceMessages, serviceUpload, $rootScope) {

  var editcreateVm = this;

  function imageSelected (files) {
    if (files && files.length > 0 && (files[0].type.indexOf("image") > -1)) {
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var data = {
          fileName: file.name,
          fileData: reader.result,
          folder: 0
        };
        serviceUpload.uploadFile(data).then(function (result){
	  editcreateVm.student.profile.previewImg = result.filePath;
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  function selectImage() {
    angular.element('#img').trigger('click');    		
  };
  
  function close() {
    $uibModalInstance.dismiss('cancel');
  }

  function resolveCreateUpdateUser(resolve) {
    close();    
    switch(resolve.operation) {
    case 1:
      serviceMessages.generalMessage('Creado', 'Registro creado con éxito', "success");
      break;
    case 2:
      serviceMessages.generalMessage('Actualizado', 'Registro actualizado con éxito', "success");
      break;
    }
    $rootScope.getAllStudents();
  }

  function errorCreateUpdateUser(error) {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function save() {
    if (!editcreateVm.student._id) {
      editcreateVm.student.profile.idProfile = 2;
      serviceUsers.create(editcreateVm.student).then(resolveCreateUpdateUser, errorCreateUpdateUser); 
    }else{
      serviceUsers.update(editcreateVm.student).then(resolveCreateUpdateUser, errorCreateUpdateUser);
    }
  }

  editcreateVm.student = resolveData;
  editcreateVm.close = close;
  editcreateVm.save = save;
  editcreateVm.imageSelected = imageSelected;
  editcreateVm.selectImage = selectImage;
}
