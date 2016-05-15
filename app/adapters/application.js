import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';
import ENV from 'pool-request/config/environment';
import DS from 'ember-data';

const { inject } = Ember;

const FIREBASE_ADAPTER = FirebaseAdapter.extend({
  firebase: inject.service(),
});

const DEFAULT_ADAPTER = DS.JSONAPIAdapter.extend({});

export default (ENV.environment === 'production') ? FIREBASE_ADAPTER: DEFAULT_ADAPTER;
