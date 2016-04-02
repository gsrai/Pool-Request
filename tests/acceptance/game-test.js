import { test } from 'qunit';
import moduleForAcceptance from 'pool-request/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | game');

test('should add new game', function(assert) {
  assert.expect(4);
  visit('/game');
  fillIn('.nameOne', 'foo');
  fillIn('.scoreOne', '3');
  fillIn('.nameTwo', 'bar');
  click('input[type=submit]');
  andThen(() => {
    assert.equal(currentURL(), '/history');
    assert.equal(find('.playerOne:first').text(), 'foo');
    assert.equal(find('.score:first').text(), '3 - 0');
    assert.equal(find('.playerTwo:first').text(), 'bar');
  });
});

