/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pool-request',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    firebase: 'https://popping-heat-7651.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    torii: {
      sessionServiceName: 'session',
      providers: {
        'firebase-simple-auth': {
        }
      }
    },
    'ember-simple-auth': {
      authenticationRoute: 'session',
      routeAfterAuthentication: 'admin'
    },
    EmberENV: {
      FEATURES: { }
    },

    APP: { }
  };

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
