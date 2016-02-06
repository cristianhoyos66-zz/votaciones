'use strict';

describe('Service: serviceMessages', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var serviceMessages;
  beforeEach(inject(function (_serviceMessages_) {
    serviceMessages = _serviceMessages_;
  }));

  it('should do something', function () {
    expect(!!serviceMessages).toBe(true);
  });

});
