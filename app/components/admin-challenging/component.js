import Ember from 'ember';
import moment from 'moment';

const ONE_WEEK_IN_MILLIS = 1000 * 60 * 60 * 24 * 7;

export default Ember.Component.extend({
  classNames: ['admin-container'],
  challenger1: null,
  challenger2: null,
  expiry: moment(moment() + ONE_WEEK_IN_MILLIS).format('YYYY-MM-DD'),

  unchallengedPlayers: Ember.computed('model.[]', 'model.@each.challenging', function() {
    let players = this.get('model');
    return players.map((player, i) => {
        let selected = (i === 0);
        return {
          display: player.get('name'),
          challenged: !!player.get('challenging'),
          value: player.get('name'),
          selected
        };
    }).filter((player) => !player.challenged);
  }),

  actions: {
    selectChallenger1(challenger) {
      this.set('challenger1', challenger);
    },

    selectChallenger2(challenger) {
      this.set('challenger2', challenger);
    },

    addChallenged() {
      const challenger1 = this.get('challenger1');
      const challenger2 = this.get('challenger2');
      const expiry = new Date(this.get('expiry'));

      this.get('store').findAll('person').then(function(players) {
        if (challenger1 === challenger2) {
          throw new Error('Can not challenge yourself');
        }
        if (expiry < new Date()) {
          throw new Error('Date has to be in the future');
        }
        let player = players.findBy('name', challenger1);
        player.set('challenging', challenger2);
        player.set('expiry', expiry);

        player = players.findBy('name', challenger2);
        player.set('challenging', challenger1);
        player.set('expiry', expiry);

        players.save();
      }, (error) => this.sendAction('setError', error))
      .then(() => this.sendAction('transitionToGame'),
        (error) => this.sendAction('setError', error));
    }
  }
});
