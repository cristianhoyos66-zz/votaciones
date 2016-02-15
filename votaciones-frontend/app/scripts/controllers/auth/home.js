'use strict';

/**
 * @ngdoc function
 * @name votacionesFrontendApp.controller:AuthHomeCtrl
 * @description
 * # AuthHomeCtrl
 * Controller of the votacionesFrontendApp
 */
angular.module('votacionesFrontendApp')
  .controller('AuthHomeCtrl', [
    'serviceRatings',
    'serviceMessages',
    '$timeout',
    '$rootScope',
    '$state',
    'serviceUsers',
    AuthHomeCtrl
  ]);

function AuthHomeCtrl(serviceRatings, serviceMessages, $timeout, $rootScope, $state, serviceUsers) {

  var homeVm = this;

  function errorGetRatings() {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function notifyGetRatings(ratings) {
    homeVm.personerosList = [];
    homeVm.comptrollerList = [];
    for (var i = 0; i < ratings.length; i++) {
      if (ratings[i].idType === 1) {
	homeVm.personerosList = ratings[i];
      }
      if (ratings[i].idType === 2) {
	homeVm.comptrollerList = ratings[i];
      }
    }
  }

  function resolveRefreshRating() {
    serviceMessages.generalMessage('Votación reiniciada', 'La votación se reinició exitosamente', 'success'); 
  }

  function errorRefreshRating() {
    serviceMessages.generalMessage('Error', 'No se pudo reiniciar la votación', 'success'); 
  }

  function refreshRating(idTypeRating) {
    swal({   
      title: '¿Estás seguro?',   
      text: 'Al reiniciar todo se habrá perdido',   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#F0AD4E",   
      confirmButtonText: 'Sí, reiniciar',   
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#EF5350",
      closeOnConfirm: false 
    }, function() {   
      if (idTypeRating) {
	serviceRatings.refreshRating(idTypeRating).then(resolveRefreshRating, errorRefreshRating);
      }
    });
  }

  function errorStartRating(error) {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function errorStopRating(error) {
    serviceMessages.generalMessage('Error', 'Error de operación', "error");
  }

  function resolveStartRating(resolve) {

  }

  function resolveStopRating(resolve) {
    
  }

  function startRating(idTypeRating) {
    serviceRatings.startRating(idTypeRating).then(resolveStartRating, errorStartRating);
  }

  function stopRating(idTypeRating) {
    serviceRatings.stopRating(idTypeRating).then(resolveStopRating, errorStopRating);
  }

  function resolveRate(resolve) {
    serviceMessages.generalMessage('¡Muy bien!', 'Tu votación se ha efectuado con éxito', "success");
  }

  function errorRate(resolve) {
    serviceMessages.generalMessage('Error', 'No se pudo efectuar tu votación', "error");
  }

  function rate(selectedUser, idTypeRating) {
    if ((idTypeRating === 1 && $rootScope.loggedUser.profile.canVoteByPersonero) || (idTypeRating === 2 && $rootScope.loggedUser.profile.canVoteByComptroller)) {
      swal({   
	title: '¿Estás seguro de tu decisión?',   
	text: 'No se puede volver a votar',   
	type: "warning",   
	showCancelButton: true,   
	confirmButtonColor: "#F0AD4E",   
	confirmButtonText: 'Sí, votar',   
	cancelButtonText: 'Cancelar',
	cancelButtonColor: "#EF5350",
	closeOnConfirm: false 
      }, function() {   
	if (selectedUser) {
	  var config = {
	    idType: idTypeRating,
	    idSelectedCandidate: selectedUser._id ? selectedUser._id : '0'
	  };
	  serviceRatings.rate(config).then(resolveRate, errorRate);
	 //$state.go($state.current, {}, {reload: true});
	}
      });   
    }
  }

  serviceRatings.getRatings().then(0, errorGetRatings, notifyGetRatings);

  serviceUsers.whoIsLoggedSub().then(0, 0, function(loggedUser) {
    $timeout(function() {
      $rootScope.$apply(function() {
	$rootScope.loggedUser = loggedUser[0];
      });
    })
  });

  homeVm.startRating = startRating;
  homeVm.stopRating = stopRating;
  homeVm.refreshRating = refreshRating;
  homeVm.rate = rate;
}
