import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:history', 'Unit | Controller | history', {
});


test('it does not filter when no name is specified', function(assert) {
  assert.expect(3);
  let games = Ember.A([
    Ember.Object.create({
      'name-one': 'foo',
      date: 3
    }),
    Ember.Object.create({
      'name-one': 'bar',
      date: 2
    })
  ]);
  let subject = this.subject({
    model: games
  });

  assert.equal(subject.get('filteredGames.length'), 2);
  assert.equal(subject.get('filteredGames').objectAt(0)['name-one'], 'foo');
  assert.equal(subject.get('filteredGames').objectAt(1)['name-one'], 'bar');
});

test('it filters when name is specified', function(assert) {
  assert.expect(3);
  let name = 'bar';
  let games = Ember.A([
    Ember.Object.create({
      'name-one': 'foo',
      'name-two': 'bar',
      date: 3
    }),
    Ember.Object.create({
      'name-one': 'bar',
      'name-two': 'baz',
      date: 2
    }),
    Ember.Object.create({
      'name-one': 'foo',
      'name-two': 'baz',
      date: 1
    })
  ]);
  let subject = this.subject({
    model: games,
    name
  });

  assert.equal(subject.get('filteredGames.length'), 2);
  assert.equal(subject.get('filteredGames').objectAt(0)['name-two'], name);
  assert.equal(subject.get('filteredGames').objectAt(1)['name-one'], name);
});

test('it sorts history by date, most recent at top', function(assert) {
   assert.expect(3);
    let games = Ember.A([
      Ember.Object.create({
        'name-one': 'a',
        date: 123456789
      }),
      Ember.Object.create({
        'name-one': 'b',
        date: 0
      }),
      Ember.Object.create({
        'name-one': 'c',
        date: 987654321
      })
    ]);
    let subject = this.subject({
      model: games
    });

    assert.equal(subject.get('filteredGames').objectAt(0)['name-one'], 'c');
    assert.equal(subject.get('filteredGames').objectAt(1)['name-one'], 'a');
    assert.equal(subject.get('filteredGames').objectAt(2)['name-one'], 'b');
});
