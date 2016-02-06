'use strict';

describe('Controller: AuthJudgesEditcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthJudgesEditcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthJudgesEditcreateCtrl = $controller('AuthJudgesEditcreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthJudgesEditcreateCtrl.awesomeThings.length).toBe(3);
  });
});
