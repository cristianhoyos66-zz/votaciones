'use strict';

describe('Controller: AuthStudentsEditcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthStudentsEditcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthStudentsEditcreateCtrl = $controller('AuthStudentsEditcreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthStudentsEditcreateCtrl.awesomeThings.length).toBe(3);
  });
});
