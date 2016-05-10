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
          this.set('nameTwo', playerTwo.get('challenging'));
        });
    },

    addGame() {
      let p1 = {name: this.get('nameOne'), score: Number(this.get('scoreOne'))};
      let p2 = {name: this.get('nameTwo'), score: Number(this.get('scoreTwo'))};
      this.get('store').findAll('person').then(function(players) {
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
        let highPosition = Math.max(wp, lp);
        let lowerPosition = Math.min(wp, lp);

        this.incrementProperty(winner, highPosition, winnerScore, loserScore);

        this.incrementProperty(loser, lowerPosition, loserScore, winnerScore);

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
          this.sendAction('transitionToGame');
        }).catch(function(error) {
          // TODO maybe should show there was an error on screen
          console.log('caught: ' + error);
        });
      });
    }
  }
});
