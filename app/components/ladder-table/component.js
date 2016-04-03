import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: 'ladder',
  people: null,
  displayedPeople: Ember.computed('people.[]', function() {
    return this.get('people').map((person, i) => {
      let tmp = Ember.Object.create({
        position: i + 1,
        name: person.get('name'),
        frames: person.get('frames'),
        games: person.get('games'),
        challenging: person.get('challenging')
      });

      tmp.set('challenging', person.get('challenging') === null ? null : (person.get('challenging') + 1));

      let gameRatio = {
        winLoss: this._winLossRatio(person.get('games.wins'), person.get('games.losses')),
        winPercent: this._winPercent(person.get('games.wins'), person.get('games.losses'))
      };
      let framesRatio = {
        winLoss: this._winLossRatio(person.get('frames.wins'), person.get('frames.losses')),
        winPercent: this._winPercent(person.get('frames.wins'), person.get('frames.losses'))
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
