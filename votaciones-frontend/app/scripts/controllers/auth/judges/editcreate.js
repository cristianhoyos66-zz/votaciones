'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthJudgesEditcreateCtrl
 * @description
 * # AuthJudgesEditcreateCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthJudgesEditcreateCtrl', [
    '$uibModalInstance',
    'resolveData',
    'serviceUsers',
    'serviceMessages',
    AuthJudgesEditcreateCtrl
  ]);

function AuthJudgesEditcreateCtrl($uibModalInstance, resolveData, serviceUsers, serviceMessages) {

  var editcreateVm = this;

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
  }

  function errorCreateUpdateUser(error) {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function save() {
    if (!editcreateVm.judge._id) {
      editcreateVm.judge.profile.idProfile = 1;
      serviceUsers.create(editcreateVm.judge).then(resolveCreateUpdateUser, errorCreateUpdateUser); 
    }else{
      serviceUsers.update(editcreateVm.judge).then(resolveCreateUpdateUser, errorCreateUpdateUser);
    }
  }

  editcreateVm.judge = resolveData;
  editcreateVm.close = close;
  editcreateVm.save = save;
  
}
