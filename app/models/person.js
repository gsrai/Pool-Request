import DS from 'ember-data';

export default DS.Model.extend({
  position:  DS.attr('number'),
  name: DS.attr('string'),
  challenging: DS.attr('number')
});
