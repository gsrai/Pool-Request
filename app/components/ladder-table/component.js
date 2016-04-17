import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: 'ladder',
  people: null,
  displayedPeople: Ember.computed('people.[]', function() {
    let people = this.get('people').map((person, i) => {
      let tmp = Ember.Object.create({
        position: person.get('position'),
        name: person.get('name'),
        frames: person.get('frames'),
        games: person.get('games'),
        challenging: person.get('challenging')
      });

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
    return people.sort((a, b) => {
      return a.get('position') - b.get('position');
    });
  }),

  _winLossRatio(wins, losses) {
    return (losses === 0 ? wins : wins / losses).toFixed(2);
  },

  _winPercent(wins, losses) {
    if (wins === 0 && losses === 0) {
      return '0%';
    } else {
      return ((wins / (wins + losses)).toFixed(2) * 100) + '%';
    }
  }
});
