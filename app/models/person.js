import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  challenging: DS.attr('number'),
  games: DS.attr(),
  frames: DS.attr()
});
