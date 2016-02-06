'use strict';

describe('Controller: AuthVotationsVotationsCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthVotationsVotationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthVotationsVotationsCtrl = $controller('AuthVotationsVotationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthVotationsVotationsCtrl.awesomeThings.length).toBe(3);
  });
});
