import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  challenging: DS.attr('number'),
  wins: DS.attr('number'),
  losses: DS.attr('number')
});
