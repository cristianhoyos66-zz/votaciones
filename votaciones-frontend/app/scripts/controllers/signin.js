'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('SigninCtrl', [
    'loginService',
    'serviceMessages',
    'serviceUsers',
    '$rootScope',
    '$state',
    SigninCtrl
  ]);

function SigninCtrl(loginService, serviceMessages, serviceUsers, $rootScope, $state) {

  var signinVm = this;

  function signin() {
    loginService.login(signinVm.user).then(function (success) {
      serviceUsers.whoIsLogged().then(function (loggedUser) {
	$rootScope.loggedUser = loggedUser;
	var config = {
	  idUser: loggedUser.user._id,
	  isAdmin: !signinVm.user.password ? false : true
	}
	serviceUsers.setAdminOrVoter(config).then(function(success) {
	  serviceMessages.generalMessage('Bienvenido', 'Ojalá tu estadía aquí sea la mejor', 'success'); 
    	  $state.go('auth.home');
	});	
      }); 
    }, function (error) {
      serviceMessages.generalMessage('Error', 'Revisa que el número de documento o contraseña estén bien escritos', "error"); 
    });
  };

  signinVm.signin = signin
  
}
