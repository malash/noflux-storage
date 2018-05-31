import test from 'ava';
import { add } from '../src';

test('add', t => {
  t.deepEqual(add(1, 1), 2);
});
