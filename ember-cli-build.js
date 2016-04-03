/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/moment/moment.js');
  app.import(app.bowerDirectory + '/ember-cli-moment-shim/moment-shim.js', {
    exports: {
      moment: ['default']
    }
  });

  return app.toTree();
};
