import { test } from 'qunit';
import moduleForAcceptance from 'pool-request/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | admin');

test('should add new game', function(assert) {
  assert.expect(10);
  visit('/admin');
  click('#admin-game');
  fillIn('.name-one', 'Sorin');
  fillIn('.score-one', '3');
  fillIn('.date', '1993-05-08');
  andThen(() => {
    click('input[type=submit]');
    assert.equal(find('.nameTwo').text().trim(), 'Gagondeep');
    andThen(() => {
      assert.equal(currentURL(), '/ladder');
      assert.equal(find('.person2 .name').text().trim(), 'Sorin');
      assert.equal(find('.person3 .name').text().trim(), 'Gagondeep');
      assert.equal(find('.person2 .challenging').text(), '');
      assert.equal(find('.person3 .challenging').text(), '');
      visit('/history');
      andThen(() => {
        assert.equal(find('.player-one:last').text().trim(), 'Sorin');
        assert.equal(find('.score:last').text(), '3 - 0');
        assert.equal(find('.player-two:last').text().trim(), 'Gagondeep');
        assert.equal(find('.date:last').text(), '08/05/93');
      });
    });
  });
});

test('should add new person', function(assert) {
  assert.expect(2);
  visit('/admin');
  click('#admin-player');
  fillIn('.playerName', 'Bob');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person7 .name').text().trim(), 'Bob');
  });
});

test('should set new challenging players', function(assert) {
  assert.expect(3);
  visit('/admin');
  fillIn('.player-one', 'Luke');
  fillIn('.player-two', 'Bradley');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person1 .challenging').text().trim(), 'Bradley');
    assert.equal(find('.person5 .challenging').text().trim(), 'Luke');
  });
});

test('should set an error', function(assert) {
  assert.expect(2);
  visit('/admin');
  fillIn('.player-one', 'Luke');
  fillIn('.player-two', 'Luke');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/admin');
    assert.equal(find('.admin-error--visible').length, 1);
  });
});
