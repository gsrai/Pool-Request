import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['name'],
  name: null,

  filteredGames: Ember.computed('model', 'name', function() {
    var name = this.get('name');
    var games = this.get('model');

    if (name) {
      return games.filter(function(game) {
        return game.get('name-one') === name || game.get('name-two') === name;
      });
    }
    return games;
  })
});
