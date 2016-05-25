import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['admin-container'],
  nameOne: null,
  scoreOne: 2,
  nameTwo: null,
  scoreTwo: 0,
  date: moment().format('YYYY-MM-DD'),

  players: Ember.computed('model.[]', 'model.@each.challenging', function() {
    let players = this.get('model');
    return players.map((player, i) => {
        let selected = (i === 0);
        return {
            display: player.get('name'),
            challenged: !!player.get('challenging'),
            value: player.get('name'),
            selected
        };
    }).filter((player) => player.challenged);
  }),

  incrementResults(player, position, framesWon, framesLost) {
    player.set('position', position);
    player.incrementProperty('games.wins', 1);
    player.incrementProperty('frames.wins', framesWon);
    player.incrementProperty('frames.losses', framesLost);
    player.set('challenging', null);
  },

  actions: {
    selectPlayer1(player) {
        this.set('nameOne', player);
        this.get('store').findAll('person').then((players) => {
          let playerTwo = players.findBy('name', player);
          let nameTwo = playerTwo ? playerTwo.get('challenging') : 'no challenger found';
          this.set('nameTwo', nameTwo);
        }).catch((error) => this.sendAction('setError', error));
    },

    addGame() {
      let p1 = {name: this.get('nameOne'), score: Number(this.get('scoreOne'))};
      let p2 = {name: this.get('nameTwo'), score: Number(this.get('scoreTwo'))};
      this.get('store').findAll('person').then((players) => {
        // Start with assuming nameOne is the winner
        let winner = players.findBy('name', p1.name);
        let loser = players.findBy('name', p2.name);

        if (p2.score > p1.score) {
          let tmp = winner;
          winner = loser;
          loser = tmp;
        }

        let winnerScore = Math.max(p1.score, p2.score);
        let loserScore = Math.min(p1.score, p2.score);
        let wp = winner.get('position');
        let lp = loser.get('position');
        let topPosition = Math.min(wp, lp);
        let lowerPosition = Math.max(wp, lp);

        if (winnerScore > 3 || winnerScore < 0 || loserScore > 3 || loserScore < 0) {
            throw new Error('Scores should be between 0 and 3');
        }
        if (winnerScore === loserScore) {
          throw new Error('There should be a winner');
        }

        this.incrementResults(winner, topPosition, winnerScore, loserScore);
        this.incrementResults(loser, lowerPosition, loserScore, winnerScore);

        players.save();
      }).then(() => {
        this.get('store').createRecord('game', {
          'name-one': this.get('nameOne'),
          'score-one': this.get('scoreOne'),
          'name-two': this.get('nameTwo'),
          'score-two': this.get('scoreTwo'),
          'date': new Date(this.get('date'))
        }).save().then(() => {
          this.set('nameOne', '');
          this.set('nameTwo', '');
          this.sendAction('setError', '');
          this.sendAction('transitionToGame');
        }).catch((error) => this.sendAction('setError', error));
      }).catch((error) => this.sendAction('setError', error));
    }
  }
});
