import Ember from 'ember';

export default Ember.Controller.extend({
  nameOne: null,
  scoreOne: 2,
  nameTwo: null,
  scoreTwo: 0,
  actions: {
    submit() {
      this.store.createRecord('game', {
        'name-one': this.get('nameOne'),
        'score-one': this.get('scoreOne'),
        'name-two': this.get('nameTwo'),
        'score-two': this.get('scoreTwo')
      }).save().then(() => {
        this.set('nameOne', '');
        this.set('nameTwo', '');
        this.transitionToRoute('history');
      }).catch(function(error) {
        // TODO maybe should show there was an error on screen
        console.log('caught: ' + error);
      });
    }
  }
});
