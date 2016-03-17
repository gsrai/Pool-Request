import DS from 'ember-data';

export default DS.Model.extend({
  'name-one': DS.attr('string'),
  'score-one': DS.attr('number'),
  'name-two': DS.attr('string'),
  'score-two': DS.attr('number')
});
