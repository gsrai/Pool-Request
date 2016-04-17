import Ember from 'ember';

export default Ember.Controller.extend({
  playerName: '',
  playerGameWins: 0,
  playerGameLosses: 0,
  playerFrameWins: 0,
  playerFrameLosses: 0,
  challenger1: null,
  challenger2: null,
  numberOfPlayers: Ember.computed('model.[]', function() {
    return this.get('model').get('length');
  }),
  unchallengedPlayers: Ember.computed('model.[]', function() {
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
        this.store.findAll('person').then(function(players) {
            let player = players.findBy('name', challenger1);
            player.set('challenging', challenger2);
            player = players.findBy('name', challenger2);
            player.set('challenging', challenger1);
            players.save();
        }).then(() => this.transitionToRoute('ladder'));
    },
    addPlayers() {
      this.store.createRecord('person', {
        position: this.get('numberOfPlayers') + 1,
        name: this.get('playerName'),
        games: {
            wins: this.get('playerGameWins'),
            losses: this.get('playerGameLosses')
        },
        frames: {
            wins: this.get('playerFrameWins'),
            losses: this.get('playerFrameLosses')
        },
        challenging: null
      }).save().then(() => {
        this.set('playerName', '');
        this.set('playerGameWins', 0);
        this.set('playerGameLosses', 0);
        this.set('playerFrameWins', 0);
        this.set('playerFrameLosses', 0);
        this.transitionToRoute('ladder');
      }).catch(function(error) {
        // TODO maybe should show there was an error on screen
        console.log('caught: ' + error);
      });
    }
  }
});
