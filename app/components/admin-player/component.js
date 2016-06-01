import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['admin-container'],
  playerName: null,

  numberOfPlayers: Ember.computed.alias('model.length'),

  createNewPerson() {
    return {
      position: this.get('numberOfPlayers') + 1,
      name: this.get('playerName'),
      games: Ember.Object.create({
        wins: 0,
        losses: 0
      }),
      frames: Ember.Object.create({
        wins: 0,
        losses: 0
      }),
      challenging: null
    };
  },

  actions: {
    addPlayers() {
      this.get('store').findAll('person').then((players) => {
        players.forEach((player) => {
          if (player.get('name') === this.get('playerName')) {
            throw new Error('Player already exsists');
          }
        });

        this.get('store').createRecord('person', this.createNewPerson())
          .save().then(() => {
          this.set('playerName', '');
          this.sendAction('transitionToGame');
        }).catch((error) => this.sendAction('setError', error));
      })
      .catch((error) => this.sendAction('setError', error));
    }
  }
});
