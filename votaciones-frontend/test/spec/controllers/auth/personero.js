'use strict';

describe('Controller: AuthPersoneroCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthPersoneroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthPersoneroCtrl = $controller('AuthPersoneroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthPersoneroCtrl.awesomeThings.length).toBe(3);
  });
});
