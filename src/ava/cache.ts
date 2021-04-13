import test from 'ava';
import PamCache from '../pampu';

test('cache', t => {

  let result: Array<number> = [];
  function loader(key: number) {
    result.push(key);
    return key + '';
  }
  
  let cache = new PamCache<number, string>({
    size: 2,
    loader
  });

  t.is(cache.get(10), '10');
  t.is(cache.get(9), '9');

  cache.get(10);
  cache.get(10);
  t.true(cache.has(10));
  t.true(cache.has(9));
  
  t.deepEqual(result, [10, 9]);

  t.is(cache.get(13), '13');
  t.deepEqual(result, [10, 9, 13]);

  t.false(cache.has(10));
  t.true(cache.has(9));
  t.is(cache.size(), 2);
  
  cache.get(10);

  t.deepEqual(result, [10, 9, 13, 10]);
  
});
