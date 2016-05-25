import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['admin-container'],
  challenger1: null,
  challenger2: null,

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
      let challenger1 = this.get('challenger1');
      let challenger2 = this.get('challenger2');

      this.get('store').findAll('person').then(function(players) {
        if (challenger1 === challenger2) {
          throw new Error('Can not challenge yourself');
        }
        let player = players.findBy('name', challenger1);
        player.set('challenging', challenger2);
        player = players.findBy('name', challenger2);
        player.set('challenging', challenger1);
        players.save();
      }, (error) => this.sendAction('setError', error))
      .then(() => this.sendAction('transitionToGame'),
        (error) => this.sendAction('setError', error));
    }
  }
});
