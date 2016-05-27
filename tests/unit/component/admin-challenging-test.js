import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('component:admin-challenging', 'Unit | Component | admin challenging', {
  unit: true
});

test('already challenged players do not show in unchallengedPlayers', function(assert) {
  assert.expect(2);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1, challenging: null }),
      Ember.Object.create({ name: 'Gagondeep', position: 2, challenging: null })
    ])
  });

  subject.set('model.firstObject.challenging', 'a');

  assert.equal(subject.get('unchallengedPlayers.length'), 1);
  assert.equal(subject.get('unchallengedPlayers.firstObject.value'), 'Gagondeep');
});

test('show 2 below players for position 1', function(assert) {
  assert.expect(4);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3 }),
      Ember.Object.create({ name: 'c', position: 4 })
    ])
  });
  subject.set('challenger1', 'Luke');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 2);
  assert.equal(pc.objectAt(0).value, 'a');
  assert.equal(pc.objectAt(1).value, 'b');
  assert.equal(subject.get('challenger2'), 'a');
});

test('show 1 player above and 2 below for position 2', function(assert) {
  assert.expect(5);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3 }),
      Ember.Object.create({ name: 'c', position: 4 }),
      Ember.Object.create({ name: 'd', position: 5 })
    ])
  });
  subject.set('challenger1', 'a');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 3);
  assert.equal(pc.objectAt(0).value, 'Luke');
  assert.equal(pc.objectAt(1).value, 'b');
  assert.equal(pc.objectAt(2).value, 'c');
  assert.equal(subject.get('challenger2'), 'Luke');
});

test('only shows 2 above and 2 below', function(assert) {
  assert.expect(6);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3 }),
      Ember.Object.create({ name: 'c', position: 4 }),
      Ember.Object.create({ name: 'd', position: 5 }),
      Ember.Object.create({ name: 'e', position: 6 }),
      Ember.Object.create({ name: 'f', position: 7 })
    ])
  });
  subject.set('challenger1', 'c');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 4);
  assert.equal(pc.objectAt(0).value, 'a');
  assert.equal(pc.objectAt(1).value, 'b');
  assert.equal(pc.objectAt(2).value, 'd');
  assert.equal(pc.objectAt(3).value, 'e');
  assert.equal(subject.get('challenger2'), 'a');
});

test('last place only challenge 2 above', function(assert) {
  assert.expect(4);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3 }),
      Ember.Object.create({ name: 'c', position: 4 }),
      Ember.Object.create({ name: 'd', position: 5 }),
      Ember.Object.create({ name: 'e', position: 6 }),
      Ember.Object.create({ name: 'f', position: 7 })
    ])
  });
  subject.set('challenger1', 'f');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 2);
  assert.equal(pc.objectAt(0).value, 'd');
  assert.equal(pc.objectAt(1).value, 'e');
  assert.equal(subject.get('challenger2'), 'd');
});

test('2nd last place only challenge 2 above 1 below', function(assert) {
  assert.expect(5);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3 }),
      Ember.Object.create({ name: 'c', position: 4 }),
      Ember.Object.create({ name: 'd', position: 5 }),
      Ember.Object.create({ name: 'e', position: 6 }),
      Ember.Object.create({ name: 'f', position: 7 })
    ])
  });
  subject.set('challenger1', 'e');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 3);
  assert.equal(pc.objectAt(0).value, 'c');
  assert.equal(pc.objectAt(1).value, 'd');
  assert.equal(pc.objectAt(2).value, 'f');
  assert.equal(subject.get('challenger2'), 'c');
});

test('posibleChallengers does not include already challenged', function(assert) {
  assert.expect(4);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2 }),
      Ember.Object.create({ name: 'b', position: 3, challenging: 'd'}),
      Ember.Object.create({ name: 'c', position: 4 }),
      Ember.Object.create({ name: 'd', position: 5, challenging: 'b' }),
      Ember.Object.create({ name: 'e', position: 6 }),
      Ember.Object.create({ name: 'f', position: 7 })
    ])
  });
  subject.set('challenger1', 'c');

  const pc = subject.get('posibleChallengers');
  assert.equal(pc.length, 2);
  assert.equal(pc.objectAt(0).value, 'a');
  assert.equal(pc.objectAt(1).value, 'e');
  assert.equal(subject.get('challenger2'), 'a');
});

test('posibleChallengers can be empty', function(assert) {
  assert.expect(2);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2, challenging: 'b'}),
      Ember.Object.create({ name: 'b', position: 3, challenging: 'a'})
    ])
  });
  subject.set('challenger1', 'Luke');

  assert.equal(subject.get('posibleChallengers.length'), 0);
  assert.equal(subject.get('challenger2'), null);
});

test('posibleChallengers can be empty if no challenger1', function(assert) {
  assert.expect(2);
  let subject = this.subject({
    model: Ember.A([
      Ember.Object.create({ name: 'Luke', position: 1 }),
      Ember.Object.create({ name: 'a', position: 2, challenging: 'b'}),
      Ember.Object.create({ name: 'b', position: 3, challenging: 'a'})
    ])
  });
  subject.set('challenger1', null);

  assert.equal(subject.get('posibleChallengers.length'), 0);
  assert.equal(subject.get('challenger2'), null);
});

test('fortmats for the dropdown data', function(assert) {
  assert.expect(2);
  let subject = this.subject();

  let player = Ember.Object.create({ name: 'Luke', position: 1 });
  let expectedFormat = {
      display: 'Luke',
      challenged: false,
      value: 'Luke',
      selected: true
  };
  assert.deepEqual(subject.dropdownFormat(player, true), expectedFormat);

  player = Ember.Object.create({ name: 'Gagondeep', position: 2, challenging: 'Luke' });
  expectedFormat = {
    display: 'Gagondeep',
    challenged: true,
    value: 'Gagondeep',
    selected: false
  };
  assert.deepEqual(subject.dropdownFormat(player, false), expectedFormat);
});
