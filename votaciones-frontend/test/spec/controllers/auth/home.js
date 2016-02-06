'use strict';

describe('Controller: AuthHomeCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthHomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthHomeCtrl = $controller('AuthHomeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthHomeCtrl.awesomeThings.length).toBe(3);
  });
});
