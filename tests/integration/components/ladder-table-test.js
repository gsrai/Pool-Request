import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ladder-table', 'Integration | Component | ladder table', {
  integration: true
});

test('it renders table correctly', function(assert) {
  assert.expect(25);
  let people = [
    Ember.Object.create({
      name: 'foo',
      position:1,
      challenging: null,
      games: Ember.Object.create({
        wins: 3,
        losses: 1
      }),
      frames: Ember.Object.create({
        wins: 9,
        losses: 2
      })
    }),

    Ember.Object.create({
      name: 'bar',
      position: 2,
      challenging: 'Bob',
      expiry: 10,
      games: {
        wins: 2,
        losses: 0
      },
      frames: {}
    }),

    Ember.Object.create({
      name: 'Bob',
      position: 3,
      challenging: 'bar',
      expiry: 10,
      games: {
        wins: 0,
        losses: 4
      },
      frames: {}
    })
  ];
  this.set('people', people);

  this.render(hbs`{{ladder-table people=people}}`);

  assert.equal(this.$('.person1 .position').text().trim(), '1');
  assert.equal(this.$('.person1 .name').text().trim(), 'foo');
  assert.equal(this.$('.person1 .games.played').text().trim(), '4');
  assert.equal(this.$('.person1 .games.wins').text().trim(), '3');
  assert.equal(this.$('.person1 .games.losses').text().trim(), '1');
  assert.equal(this.$('.person1 .games.ratio.winLoss').text().trim(), '3.00');
  assert.equal(this.$('.person1 .games.ratio.winPercent').text().trim(), '75%');
  assert.equal(this.$('.person1 .frames.played').text().trim(), '11');
  assert.equal(this.$('.person1 .frames.wins').text().trim(), '9');
  assert.equal(this.$('.person1 .frames.losses').text().trim(), '2');
  assert.equal(this.$('.person1 .frames.ratio.winLoss').text().trim(), '4.50');
  assert.equal(this.$('.person1 .frames.ratio.winPercent').text().trim(), '82%');
  assert.equal(this.$('.person1 .challenging').text().trim(), '');
  assert.equal(this.$('.person1 .expiry').text().trim(), '');

  assert.equal(this.$('.unchallengeable').length, 2);

  assert.equal(this.$('.person2 .position').text().trim(), '2');
  assert.equal(this.$('.person2 .challenging').text().trim(), 'Bob');
  assert.equal(this.$('.person2 .expiry').text().trim(), '01/01/70');
  assert.equal(this.$('.person2 .games.ratio.winLoss').text().trim(), '2.00');
  assert.equal(this.$('.person2 .games.ratio.winPercent').text().trim(), '100%');
  assert.equal(this.$('.person3 .position').text().trim(), '3');
  assert.equal(this.$('.person3 .challenging').text().trim(), 'bar');
  assert.equal(this.$('.person3 .games.ratio.winLoss').text().trim(), '0.00');
  assert.equal(this.$('.person3 .games.ratio.winPercent').text().trim(), '0%');
  assert.equal(this.$('.person3 .expiry').text().trim(), '01/01/70');

});
