import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['name'],
  name: null,

  filteredGames: Ember.computed('model.[]', 'name', function() {
    const name = this.get('name');
    let games = this.get('model');

    if (name) {
      games = games.filter(function(game) {
        return game.get('name-one') === name || game.get('name-two') === name;
      });
    }

    return games.sortBy('date').reverse();
  })
});
