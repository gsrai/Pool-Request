import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  playerName: null,

  numberOfPlayers: Ember.computed.alias('model.length'),

  actions: {
    addPlayers() {
      this.store.createRecord('person', {
        position: this.get('numberOfPlayers') + 1,
        name: this.get('playerName'),
        games: {
            wins: 0,
            losses: 0
        },
        frames: {
            wins: 0,
            losses: 0
        },
        challenging: null
      }).save().then(() => {
        this.set('playerName', '');
      }).catch(function(error) {
        // TODO maybe should show there was an error on screen
        console.log('caught: ' + error);
      });
    }
  }
});
