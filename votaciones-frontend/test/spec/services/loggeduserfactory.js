'use strict';

describe('Service: loggedUserFactory', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var loggedUserFactory;
  beforeEach(inject(function (_loggedUserFactory_) {
    loggedUserFactory = _loggedUserFactory_;
  }));

  it('should do something', function () {
    expect(!!loggedUserFactory).toBe(true);
  });

});
