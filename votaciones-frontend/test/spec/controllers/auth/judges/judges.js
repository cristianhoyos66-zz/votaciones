'use strict';

describe('Controller: AuthJudgesJudgesCtrl', function () {

  // load the controller's module
  beforeEach(module('votacionesFrontendApp'));

  var AuthJudgesJudgesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthJudgesJudgesCtrl = $controller('AuthJudgesJudgesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthJudgesJudgesCtrl.awesomeThings.length).toBe(3);
  });
});
