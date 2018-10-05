const test = require('tape');
const destructurify = require('..');

test('destructurify handles resolved promises', assert => {
  assert.plan(2);
  const promiseFn = arg => new Promise(res => setTimeout(res, 0, arg));
  const fn = destructurify(promiseFn);
  fn('test').then(({ error, response }) => {
    assert.equals(error, null);
    assert.equals(response, 'test');
  });
});

test('destructurify handles rejected promises', assert => {
  assert.plan(2);
  const promiseFn = () =>
    new Promise((_, rej) => setTimeout(rej, 0, new Error('This is an error')));
  const fn = destructurify(promiseFn);
  fn('test').then(({ error, response }) => {
    assert.equals(error.message, 'This is an error');
    assert.equals(response, null);
  });
});
