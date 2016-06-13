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
    const players = this.get('model');
    return players.map((player, i) => {
        const selected = (i === 0);
        return {
            display: player.get('name'),
            challenged: !!player.get('challenging'),
            value: player.get('name'),
            selected
        };
    }).filter((player) => player.challenged);
  }),

  _incrementResults(player, position, framesWon, framesLost) {
    const isWinner = framesWon > framesLost;
    const wins = isWinner ? player.get('games.wins') + 1 : player.get('games.wins');
    const losses = isWinner ? player.get('games.losses') : player.get('games.losses') + 1;

    player.setProperties({
      position,
      expiry: null,
      challenging: null,
      games: {
        wins,
        losses
      },
      frames: {
        wins: player.get('frames.wins') + framesWon,
        losses: player.get('frames.losses') + framesLost
      }
    });
  },

  _updateResults(players) {
    const p1 = {name: this.get('nameOne'), score: Number(this.get('scoreOne'))};
    const p2 = {name: this.get('nameTwo'), score: Number(this.get('scoreTwo'))};

    // Start with assuming nameOne is the winner
    let winner = players.findBy('name', p1.name);
    let loser = players.findBy('name', p2.name);

    if (p2.score > p1.score) {
      const tmp = winner;
      winner = loser;
      loser = tmp;
    }

    const winnerScore = Math.max(p1.score, p2.score);
    const loserScore = Math.min(p1.score, p2.score);
    const wp = winner.get('position');
    const lp = loser.get('position');
    const topPosition = Math.min(wp, lp);
    const lowerPosition = Math.max(wp, lp);

    if (winnerScore > 3 || winnerScore < 0 || loserScore > 3 || loserScore < 0) {
      throw new Error('Scores should be between 0 and 3');
    }
    if (winnerScore === loserScore) {
      throw new Error('There should be a winner');
    }

    this._incrementResults(winner, topPosition, winnerScore, loserScore);
    this._incrementResults(loser, lowerPosition, loserScore, winnerScore);

    return players.save();
  },

  _createGame() {
    return this.get('store').createRecord('game', {
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
    });
  },

  actions: {
    selectPlayer1(player) {
        this.set('nameOne', player);
        this.get('store').findAll('person').then((players) => {
          const playerTwo = players.findBy('name', player);
          const nameTwo = playerTwo ? playerTwo.get('challenging') : 'no challenger found';
          this.set('nameTwo', nameTwo);
        }).catch((error) => this.sendAction('setError', error));
    },

    addGame() {
      this.get('store').findAll('person')
        .then(this._updateResults.bind(this))
        .catch((error) => { throw new Error(error); })
        .then(this._createGame.bind(this))
        .catch((error) => this.sendAction('setError', error));
    }
  }
});
