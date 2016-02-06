'use strict';

describe('Service: serviceRatings', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var serviceRatings;
  beforeEach(inject(function (_serviceRatings_) {
    serviceRatings = _serviceRatings_;
  }));

  it('should do something', function () {
    expect(!!serviceRatings).toBe(true);
  });

});
