const test = require('tape');
const destructurify = require('..');

test('destructurify handles resolved promises', async assert => {
  const promiseFn = arg => new Promise(res => setTimeout(res, 0, arg));
  const fn = destructurify(promiseFn);
  const { error, response } = await fn('test');
  assert.equals(error, null);
  assert.equals(response, 'test');
  assert.end();
});

test('destructurify handles rejected promises', async assert => {
  const promiseFn = () =>
    new Promise((_, rej) => setTimeout(rej, 0, new Error('This is an error')));
  const fn = destructurify(promiseFn);
  const { error, response } = await fn('test');
  assert.equals(error.message, 'This is an error');
  assert.equals(response, null);
  assert.end();
});
