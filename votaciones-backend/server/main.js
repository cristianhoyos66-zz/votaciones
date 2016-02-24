'use strict';
Meteor.startup(function () {
  Methods.createFirstUser();
  Meteor.methods(Methods);
  initPublications();
  Accounts.removeDefaultRateLimit();
});

var initPublications = function () {
  var keys = Object.keys(Publications);
  for (var i = 0; i < keys.length; i++) {
    var publish = keys[i];
    Utils.publish(Publications[publish]);
  }
};
