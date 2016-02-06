'use strict';

describe('Service: constantMeteorConfig', function () {

  // load the service's module
  beforeEach(module('votacionesFrontendApp'));

  // instantiate service
  var constantMeteorConfig;
  beforeEach(inject(function (_constantMeteorConfig_) {
    constantMeteorConfig = _constantMeteorConfig_;
  }));

  it('should do something', function () {
    expect(!!constantMeteorConfig).toBe(true);
  });

});
