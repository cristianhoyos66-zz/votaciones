'use strict';

var votaciones = 'Votaciones';

angular.module('votacionesFrontendApp')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider,
	      $urlRouterProvider) {
      
      $urlRouterProvider
	.when('/home', '/')
	.otherwise('/');
      
      $stateProvider

	.state('signin', {
	  url: '/signin',
	  templateUrl: 'views/login.html',
	  controller: 'SigninCtrl as signinVm',
	})
      
	.state('auth', {
	  url: '',
	  abstract: true,
	  controller: 'AuthCtrl as authVm',
	  templateUrl: 'views/auth.html'
	})

      	.state('auth.home', {
	  page_title: votaciones,
	  url: '/',
	  controller: 'AuthHomeCtrl as homeVm',
	  templateUrl: 'views/auth/home.html'
	})

	.state('auth.students', {
	  abstract: true,
	  url: '/students',
	  template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
	})

	.state('auth.students.main', {
	  page_title: votaciones,
	  url: '',
	  controller: 'AuthStudentsCtrl as studentsVm',
	  templateUrl: 'views/auth/students/students.html'
	})

      
	.state('auth.personero', {
	  abstract: true,
	  url: '/personero',
	  template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
	})

	.state('auth.personero.main', {
	  page_title: votaciones,
	  url: '',
	  controller: 'AuthPersoneroCtrl as personerosVm',
	  templateUrl: 'views/auth/personero/personero.html'
	})

      	.state('auth.comptroller', {
	  abstract: true,
	  url: '/comptroller',
	  template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
	})

	.state('auth.comptroller.main', {
	  page_title: votaciones,
	  url: '',
	  controller: 'AuthComptrollerCtrl as comptrollersVm',
	  templateUrl: 'views/auth/comptroller/comptroller.html'
	})

	.state('auth.judges', {
	  abstract: true,
	  url: '/judges',
	  template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
	})

	.state('auth.judges.main', {
	  page_title: votaciones,
	  url: '',
	  controller: 'AuthJudgesJudgesCtrl as judgesVm',
	  templateUrl: 'views/auth/judges/judges.html'
	})

	.state('auth.votations_details', {
	  abstract: true,
	  url: '/votations_detail',
	  template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
	})

	.state('auth.votations_details.main', {
	  page_title: votaciones,
	  url: '',
	  controller: 'AuthVotationsVotationsCtrl as votationsVm',
	  templateUrl: 'views/auth/votations/votations.html'
	});
      
    }]);
