'use strict';

describe('Service: serviceUpload', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var serviceUpload;
  beforeEach(inject(function (_serviceUpload_) {
    serviceUpload = _serviceUpload_;
  }));

  it('should do something', function () {
    expect(!!serviceUpload).toBe(true);
  });

});
