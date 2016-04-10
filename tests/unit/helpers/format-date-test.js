import { formatDate } from 'pool-request/helpers/format-date';
import { module, test } from 'qunit';

module('Unit | Helper | format-date');

test('formats date', function(assert) {
  let result = formatDate([new Date(10000000000)]);
  assert.equal(result, '26/04/70');
});
