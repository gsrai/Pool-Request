import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  people: null,
  displayedPeople: Ember.computed('people', function() {
    return this.get('people').map(function(person, i) {
      let tmp = person;
      tmp.position = (i + 1);
      return tmp;
    });
  })
});
