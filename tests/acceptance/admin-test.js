import { test } from 'qunit';
import moment from 'moment';
import moduleForAcceptance from 'pool-request/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'pool-request/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | admin');

test('should redirect to login', function(assert) {
  visit('/admin');
  andThen(() => {
    assert.equal(currentURL(), '/admin/login');
  });
});

test('should set new challenging players', function(assert) {
  assert.expect(5);
  authenticateSession(this.application);
  server.loadFixtures();
  visit('/admin');
  fillIn('.player-one', 'Bradley');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person4 .challenging').text().trim(), 'Bradley');
    assert.equal(find('.person5 .challenging').text().trim(), 'Tom');
    const date = moment(moment() + 604800000).format('DD/MM/YY');
    assert.equal(find('.person4 .expiry').text().trim(), date);
    assert.equal(find('.person5 .expiry').text().trim(), date);
  });
});

test('should add new game', function(assert) {
  assert.expect(20);
  authenticateSession(this.application);
  server.loadFixtures();
  visit('/admin');
  click('#admin-game');
  fillIn('.name-one', 'Sorin');
  fillIn('.score-one', '3');
  fillIn('.score-two', '1');
  fillIn('.date', '1993-05-08');
  andThen(() => {
    click('input[type=submit]');
    assert.equal(find('.name-two').text().trim(), 'Gagondeep');
    andThen(() => {
      assert.equal(currentURL(), '/ladder');
      assert.equal(find('.person2 .name').text().trim(), 'Sorin');
      assert.equal(find('.person3 .name').text().trim(), 'Gagondeep');
      assert.equal(find('.person2 .challenging').text().trim(), '');
      assert.equal(find('.person3 .challenging').text().trim(), '');
      assert.equal(find('.person2 .expiry').text().trim(), '');
      assert.equal(find('.person3 .expiry').text().trim(), '');

      assert.equal(find('.person2 .games.wins').text().trim(), '2');
      assert.equal(find('.person3 .games.wins').text().trim(), '1');
      assert.equal(find('.person2 .games.losses').text().trim(), '2');
      assert.equal(find('.person3 .games.losses').text().trim(), '2');

      assert.equal(find('.person2 .frames.wins').text().trim(), '6');
      assert.equal(find('.person3 .frames.wins').text().trim(), '3');
      assert.equal(find('.person2 .frames.losses').text().trim(), '5');
      assert.equal(find('.person3 .frames.losses').text().trim(), '6');
      visit('/history');
      andThen(() => {
        assert.equal(find('.player-one:last').text().trim(), 'Sorin');
        assert.equal(find('.score:last').text(), '3 - 1');
        assert.equal(find('.player-two:last').text().trim(), 'Gagondeep');
        assert.equal(find('.date:last').text(), '08/05/93');
      });
    });
  });
});

test('should add new person', function(assert) {
  assert.expect(2);
  authenticateSession(this.application);
  server.loadFixtures();
  visit('/admin');
  click('#admin-player');
  fillIn('.playerName', 'Bob');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/ladder');
    assert.equal(find('.person7 .name').text().trim(), 'Bob');
  });
});

test('should set an error', function(assert) {
  assert.expect(2);
  authenticateSession(this.application);
  server.loadFixtures();
  visit('/admin');
  fillIn('.player-one', 'Luke');
  fillIn('.player-two', 'Luke');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/admin');
    assert.equal(find('.admin-error--visible').length, 1);
  });
});
