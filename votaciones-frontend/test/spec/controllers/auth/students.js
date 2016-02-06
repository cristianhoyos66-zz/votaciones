'use strict';

describe('Controller: AuthStudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthStudentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthStudentsCtrl = $controller('AuthStudentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthStudentsCtrl.awesomeThings.length).toBe(3);
  });
});
