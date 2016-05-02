import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  isAuthenticated: Ember.computed('authenticated', function() {
    return this.get('authenticated');
  }),
  onInit: Ember.on('init', function() {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    let authData = ref.getAuth();

    if (authData) {
      this.set('authenticated', true);
    } else {
      this.set('authenticated', false);
    }
  }),
  authenticate(email, password) {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    ref.authWithPassword({
      email : email,
      password : password
    }, (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        this.set('authenticated', true);
      }
    }, {
      remember: "sessionOnly"
    });
  },
  unAuthenticate() {
    let ref = new Firebase("https://popping-heat-7651.firebaseio.com");
    ref.unauth();
    this.set('authenticated', false);
  },
  adminEmail: '',
  adminPassword: '',
  nameOne: null,
  scoreOne: 2,
  nameTwo: null,
  scoreTwo: 0,
  date: moment().format('YYYY-MM-DD'),
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
    login() {
      let email = this.get('adminEmail');
      let password = this.get('adminPassword');
      this.authenticate(email, password);
    },
    logout() {
      this.unAuthenticate();
    },
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
    },
    addGame() {
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
