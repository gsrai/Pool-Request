import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('rules');
  this.route('ladder');
  this.route('history', {path: 'person'});
});

export default Router;
