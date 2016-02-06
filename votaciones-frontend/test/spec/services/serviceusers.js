'use strict';

describe('Service: serviceUsers', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var serviceUsers;
  beforeEach(inject(function (_serviceUsers_) {
    serviceUsers = _serviceUsers_;
  }));

  it('should do something', function () {
    expect(!!serviceUsers).toBe(true);
  });

});
