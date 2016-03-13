import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  people: null,
  displayedPeople: Ember.computed('people', function() {
    return this.get('people').map(function(person, i) {
      let tmp = person;

      tmp.position = (i + 1);

      tmp.ratio = tmp.get('losses') === 0 ? tmp.get('wins') : (tmp.get('wins') / tmp.get('losses'));

      let classNames = tmp.get('challenging') === null ? '' : 'unchallengeable ';
      classNames += "person" + tmp.get('position');
      tmp.classNames = classNames;
      return tmp;
    });
  })
});
