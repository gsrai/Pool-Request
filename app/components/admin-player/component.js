import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['admin-container'],
  playerName: null,

  numberOfPlayers: Ember.computed.alias('model.length'),

  actions: {
    addPlayers() {
      this.get('store').createRecord('person', {
        position: this.get('numberOfPlayers') + 1,
        name: this.get('playerName'),
        games: Ember.Object.create({
          wins: 0,
          losses: 0
        }),
        frames: Ember.Object.create({
          wins: 0,
          losses: 0
        }),
        challenging: null
      }).save().then(() => {
        debugger;
        this.set('playerName', '');
        this.sendAction('transitionToGame');
      }).catch(function(error) {
        // TODO maybe should show there was an error on screen
        console.log('caught: ' + error);
      });
    }
  }
});
