import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  nameOne: null,
  scoreOne: 2,
  nameTwo: null,
  scoreTwo: 0,
  date: moment().format('YYYY-MM-DD'),
  actions: {
    submit() {
      this.store.createRecord('game', {
        'name-one': this.get('nameOne'),
        'score-one': this.get('scoreOne'),
        'name-two': this.get('nameTwo'),
        'score-two': this.get('scoreTwo'),
        'date': new Date(this.get('date'))
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
