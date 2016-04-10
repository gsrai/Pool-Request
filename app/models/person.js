import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  challenging: DS.attr('string'),
  games: DS.attr(),
  frames: DS.attr()
});
