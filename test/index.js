import test from 'ava';
import './helpers/setup-test-env';
import { State } from '@noflux/state';
import { createStorage, STORAGE } from '../src';

test('normal usage', t => {
  const state = new State();
  const storage = createStorage({
    state,
    path: 'path',
    storageType: STORAGE.local,
  });
  t.is(storage.get('a'), undefined);

  storage.set('b', 1);
  t.is(storage.get('b'), 1);

  storage.set('c', 'str');
  t.is(storage.get('c'), 'str');

  t.deepEqual(JSON.parse(localStorage.getItem('noflux_path')), {
    b: 1,
    c: 'str',
  });
});
