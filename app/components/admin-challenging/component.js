import Ember from 'ember';
import moment from 'moment';

const ONE_WEEK_IN_MILLIS = 1000 * 60 * 60 * 24 * 7;

export default Ember.Component.extend({
  classNames: ['admin-container'],
  challenger1: null,
  challenger2: null,
  expiry: moment(moment() + ONE_WEEK_IN_MILLIS).format('YYYY-MM-DD'),

  challengerTwo: Ember.computed('challenger2', 'possibleChallengers.[]', 'possibleChallengers.@each.value', function() {
    // User input
    const challenger2 = this.get('challenger2');
    if (challenger2) {
      return challenger2;
    }

    // first not disabled
    for (let i = 0; i < this.get('possibleChallengers.length'); i++) {
      const challenger = this.get('possibleChallengers').objectAt(i);
      if (!challenger.get('disabled')) {
        return challenger.get('value');
      }
    }
  }),

  unchallengedPlayers: Ember.computed('model.[]', 'model.@each.challenging', function() {
    let players = this.get('model');
    return players.map((player, i) => {
        const selected = (i === 0);
        return this.dropdownFormat(player, selected, false);
    }).filter((player) => !player.get('challenged'));
  }),

  possibleChallengers: Ember.computed('challenger1', function() {
    if (!this.get('challenger1')) {
      return [];
    }
    const players = this.get('model');
    const position = players.findBy('name', this.get('challenger1')).get('position');

    const possibleChallengers = [];
    let hasSelectedPlayer = false;
    [
      { isValid: position - 2 >= 1, diff: -2 },
      { isValid: position - 1 >= 1, diff: -1 },
      { isValid: position + 1 <= players.get('length'), diff: 1 },
      { isValid: position + 2 <= players.get('length'), diff: 2 }
    ].forEach((challenger) => {
      if (challenger.isValid) {
        const player = players.findBy('position', position + challenger.diff);
        if (player) {
          const disabled = !!player.get('challenging');
          const isSelected = !hasSelectedPlayer && !disabled;
          possibleChallengers.push(this.dropdownFormat(player, isSelected, disabled));
          if (isSelected) {
            hasSelectedPlayer = true;
          }
        }
      }
    });

    return possibleChallengers;
  }),

  dropdownFormat(player, selected, disabled) {
    return Ember.Object.create({
      display: player.get('name'),
      challenged: !!player.get('challenging'),
      value: player.get('name'),
      selected,
      disabled
    });
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
      const challenger2 = this.get('challengerTwo');
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
