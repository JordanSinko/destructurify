# destructurify

Make a promise-based function return a destructurifiable object.

Uses the native promise implementation.

## Installation

```bash
npm install destructurify
```

## API

### `destructurify(fn)`

Takes a promise-based function and returns the destructuried function. The idea for this was from Go's-like version of a tuple response.

```js
const resolveFn = arg => new Promise(res => setTimeout(res, 0, arg));
const fn = destructurify(resolveFn);

// Works with Promise resolutions:
fn('Hello World!').then(({ response }) => console.log(response)); // -> Hello World!

const rejectFn = () =>
  new Promise((_, rej) => setTimeout(rej, 0, new Error('This is an error!')));
const fn = destructurify(rejectFn);

// Works with Promise rejections:
fn('Hello World!').then(({ error }) => console.log(error.message)); // -> This is an error!

// Works with async/await:
const resolveFn = arg => new Promise(res => setTimeout(res, 0, arg));
const fn = destructurify(resolveFn);

(async () => {
  const { error, response } = await fn('Hello World!');
  if (error != null) throw error;
  console.log(response); // -> Hello World!
})();
```

## License

MIT
