import { test } from 'qunit';
import moduleForAcceptance from 'pool-request/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | game');

test('should add new game', function(assert) {
  assert.expect(9);
  visit('/admin');
  click('#admin-game');
  fillIn('.nameOne', 'Sorin');
  fillIn('.scoreOne', '3');
  fillIn('.nameTwo', 'Gagondeep');
  fillIn('.date', '1993-05-08');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person2 .name').text().trim(), 'Sorin');
    assert.equal(find('.person3 .name').text().trim(), 'Gagondeep');
    assert.equal(find('.person2 .challenging').text(), '');
    assert.equal(find('.person3 .challenging').text(), '');
    visit('/history');
    andThen(() => {
      assert.equal(find('.playerOne:last').text().trim(), 'Sorin');
      assert.equal(find('.score:last').text(), '3 - 0');
      assert.equal(find('.playerTwo:last').text().trim(), 'Gagondeep');
      assert.equal(find('.date:last').text(), '08/05/93');
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
  fillIn('.playerOne', 'Luke');
  fillIn('.playerTwo', 'Bradley');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person1 .challenging').text().trim(), 'Bradley');
    assert.equal(find('.person5 .challenging').text().trim(), 'Luke');
  });
});
