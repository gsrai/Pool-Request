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
      let p1 = {name: this.get('nameOne'), score: Number(this.get('scoreOne'))};
      let p2 = {name: this.get('nameTwo'), score: Number(this.get('scoreTwo'))};
      this.store.findAll('person').then(function(players) {
        // assuming nameOne is the winner
        let winner = players.findBy('name', p1.name);
        let loser = players.findBy('name', p2.name);

        let wp = winner.get('position');
        let lp = loser.get('position');
        // if the winner is the challenger then swap positions
        winner.set('position', (wp > lp) ? lp : wp);
        winner.set('games', {
          wins: winner.get('games.wins') + 1,
          losses: winner.get('games.losses')
        });
        winner.set('frames', {
          wins: winner.get('frames.wins') + p1.score,
          losses: winner.get('frames.losses') + p2.score
        });
        winner.set('challenging', null);

        loser.set('position', (wp > lp) ? wp : lp);
        loser.set('games', {
          wins: loser.get('games.wins'),
          losses: loser.get('games.losses') + 1
        });
        loser.set('frames', {
          wins: loser.get('frames.wins') + p2.score,
          losses: loser.get('frames.losses') + p1.score
        });
        loser.set('challenging', null);
        players.save();
      }).then(() => {
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
      });
    }
  }
});