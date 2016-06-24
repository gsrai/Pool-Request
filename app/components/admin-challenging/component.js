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
        const selected = (i === 0);
        return this.dropdownFormat(player, selected, false);
    }).filter((player) => !player.challenged);
  }),

  posibleChallengers: Ember.computed('challenger1', function() {
    if (!this.get('challenger1')) {
      this.set('challenger2', null);
      return [];
    }
    const players = this.get('model');
    const position = players.findBy('name', this.get('challenger1')).get('position');

    const posibleChallengers = [
      { isValid: position - 2 >= 1, diff: -2 },
      { isValid: position - 1 >= 1, diff: -1 },
      { isValid: position + 1 <= players.get('length'), diff: 1 },
      { isValid: position + 2 <= players.get('length'), diff: 2 }
    ];

    const challengers = [];
    let selectedPlayer = null;
    posibleChallengers.forEach((challenger) => {
      if (challenger.isValid) {
        let player = players.findBy('position', position + challenger.diff);
        if (player) {
          const disabled = !!player.get('challenging');
          const isSelected = !selectedPlayer && !disabled;
          if (!selectedPlayer && isSelected) {
            selectedPlayer = player.get('name');
          }
          challengers.push(this.dropdownFormat(player, isSelected, disabled));
        }
      }
    });

    this.set('challenger2', selectedPlayer);

    return challengers;
  }),

  dropdownFormat(player, selected, disabled) {
    return {
      display: player.get('name'),
      challenged: !!player.get('challenging'),
      value: player.get('name'),
      selected,
      disabled
    };
  },

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
        if (!challenger1 || !challenger2) {
          throw new Error('Invalid challengers');
        }
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
