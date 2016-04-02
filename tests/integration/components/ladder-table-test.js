import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ladder-table', 'Integration | Component | ladder table', {
  integration: true
});

test('it renders table correctly', function(assert) {
  assert.expect(13);
  let people = [
    Ember.Object.create({
      name: 'foo',
      challenging: null,
      wins: 3,
      losses: 1
    }),

    Ember.Object.create({
      name: 'bar',
      challenging: 2,
      wins: 2,
      losses: 0
    }),

    Ember.Object.create({
      name: 'Bob',
      challenging: 1,
      wins: 0,
      losses: 4
    })
  ];
  this.set('people', people);

  this.render(hbs`{{ladder-table people=people}}`);

  assert.equal(this.$('.person1 .position').text().trim(), '1');
  assert.equal(this.$('.person1 .name').text().trim(), 'foo');
  assert.equal(this.$('.person1 .wins').text().trim(), '3');
  assert.equal(this.$('.person1 .losses').text().trim(), '1');
  assert.equal(this.$('.person1 .ratio').text().trim(), '3');
  assert.equal(this.$('.person1 .challenging').text().trim(), '');

  assert.equal(this.$('.unchallengeable').length, 2);

  assert.equal(this.$('.person2 .position').text().trim(), '2');
  assert.equal(this.$('.person2 .challenging').text().trim(), '3');
  assert.equal(this.$('.person2 .ratio').text().trim(), '2');
  assert.equal(this.$('.person3 .position').text().trim(), '3');
  assert.equal(this.$('.person3 .challenging').text().trim(), '2');
  assert.equal(this.$('.person3 .ratio').text().trim(), '0');

});
