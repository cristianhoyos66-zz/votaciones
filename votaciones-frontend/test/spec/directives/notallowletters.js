'use strict';

describe('Directive: notallowletters', function () {

  // load the directive's module
  beforeEach(module('votacionesFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<notallowletters></notallowletters>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the notallowletters directive');
  }));
});
