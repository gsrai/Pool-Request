import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('game-rules', { path: 'rules/game' });
  this.route('ladder-rules', { path: 'rules/ladder' });
  this.route('ladder');
  this.route('history');
  this.route('admin-challenging', { path: '/admin/challenging'});
  this.route('admin-game', { path: '/admin/game'});
  this.route('admin-player', { path: '/admin/player'});
});

export default Router;
