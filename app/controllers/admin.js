import Ember from 'ember';

export default Ember.Controller.extend({
  playerName: '',
  playerWins: 0,
  playerLosses: 0,
  actions: {
    submit() {
      this.store.createRecord('person', {
        name: this.get('playerName'),
        wins: this.get('playerWins'),
        losses: this.get('playerLosses'),
        challenging: null
      }).save().then(() => {
        this.set('playerName', '');
        this.set('playerWins', 0);
        this.set('playerLosses', 0);
        this.transitionToRoute('ladder');
      }).catch(function(error) {
        // TODO maybe should show there was an error on screen
        console.log('caught: ' + error);
      });
    }
  }
});
