import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: 'ladder',
  people: null,
  displayedPeople: Ember.computed('people.[]', function() {
    return this.get('people').map((person, i) => {
      // Extend?
      let tmp = Ember.Object.create({
        position: i + 1,
        name: person.get('name'),
        frames: person.get('frames'),
        games: person.get('games'),
        challenging: person.get('challenging')
      });
      let gameWins = person.get('games.wins'),
          gameLosses = person.get('games.losses'),
          frameWins = person.get('frames.wins'),
          frameLosses = person.get('frames.losses');

      tmp.set('games.played', gameWins + gameLosses);
      tmp.set('frames.played', frameWins + frameLosses);

      tmp.set('challenging', person.get('challenging') === null ? null : (person.get('challenging') + 1));

      let gameRatio = {
        winLoss: this._winLossRatio(gameWins, gameLosses),
        winPercent: this._winPercent(gameWins, gameLosses)
      };
      let framesRatio = {
        winLoss: this._winLossRatio(frameWins, frameLosses),
        winPercent: this._winPercent(frameWins, frameLosses)
      };

      tmp.set('games.ratio', gameRatio);
      tmp.set('frames.ratio', framesRatio);

      let classNames = tmp.get('challenging') === null ? 'challengeable' : 'unchallengeable';
      classNames += ' person' + tmp.get('position');
      tmp.set('classNames', classNames);

      return tmp;
    });
  }),

  _winLossRatio(wins, losses) {
    return (losses === 0 ? wins : wins / losses).toFixed(2);
  },

  _winPercent(wins, losses) {
    return ((wins / (wins + losses)).toFixed(2) * 100) + '%';
  }
});
