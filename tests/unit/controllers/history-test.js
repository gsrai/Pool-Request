import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:history', 'Unit | Controller | history', {
});


test('it does not filter when no name is specified', function(assert) {
  let games = [
    Ember.Object.create({
      'name-one': 'foo',
      'score-one': 0,
      'name-two': 'bar',
      'score-two': 3
    }),
    Ember.Object.create({
      'name-one': 'bar',
      'score-one': 2,
      'name-two': 'baz',
      'score-two': 1
    })
  ];
  let subject = this.subject({
    model: games
  });

  assert.equal(subject.get('filteredGames'), games);
});

test('it filters when name is specified', function(assert) {
  assert.expect(3);
  let name = 'bar';
  let games = [
    Ember.Object.create({
      'name-one': 'foo',
      'score-one': 0,
      'name-two': 'bar',
      'score-two': 3
    }),
    Ember.Object.create({
      'name-one': 'bar',
      'score-one': 2,
      'name-two': 'baz',
      'score-two': 1
    }),
    Ember.Object.create({
      'name-one': 'foo',
      'score-one': 2,
      'name-two': 'baz',
      'score-two': 1
    })
  ];
  let subject = this.subject({
    model: games,
    name
  });

  assert.equal(subject.get('filteredGames.length'), 2);
  assert.equal(subject.get('filteredGames')[0]['name-two'], name);
  assert.equal(subject.get('filteredGames')[1]['name-one'], name);
});
