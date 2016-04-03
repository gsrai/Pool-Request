import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: 'ladder',
  people: null,
  displayedPeople: Ember.computed('people', function() {
    return this.get('people').map((person, i) => {
      let tmp = person;

      tmp.set('position', i + 1);
      tmp.set('challenging', person.get('challenging') === null ? null : (person.get('challenging') + 1));

      tmp.set('games.ratio', this._ratio(person.get('games.wins'), person.get('games.losses')));
      tmp.set('frames.ratio', this._ratio(person.get('frames.wins'), person.get('frames.losses')));

      let classNames = tmp.get('challenging') === null ? 'challengeable' : 'unchallengeable';
      classNames += ' person' + tmp.get('position');
      tmp.set('classNames', classNames);
      return tmp;
    });
  }),

  _ratio(wins, losses) {
    return (losses === 0 ? wins : wins / losses).toFixed(2);
  }
});
