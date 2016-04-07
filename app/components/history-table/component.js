import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: 'history',
  games: null,
  isEmpty: Ember.computed('games.length', function() {
    return this.get('games.length') === 0;
  })
});
