'use strict';

describe('Controller: AuthComptrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthComptrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthComptrollerCtrl = $controller('AuthComptrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthComptrollerCtrl.awesomeThings.length).toBe(3);
  });
});
