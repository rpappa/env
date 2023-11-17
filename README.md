# env

## What is this?

Uses
[Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
to get environment variables, instead of `process.env`.

## Usage

```
import { env, envStr } from '@rpappa/env';

console.log({
    envResult: env`TEST`,
    envStrResult: envStr`TEST`,
});
```

The subtle difference is that envStr returns the empty string when the environment variable isn't set.

```
> node test.js
{ envResult: undefined, envStrResult: '' }
```

```
> TEST=hello node test.js
{ envResult: 'hello', envStrResult: 'hello' }
```

If a variable is required, you can also use `envRequired` or `envRequiredNonEmpty`:

```
import { envRequired, envRequiredNonEmpty } from '@rpappa/env';

try {
    const TEST_A = envRequired`TEST`;
} catch (e) {
    console.error("envRequired threw an error")
    console.log(e);
}

try {
    const TEST_B = envRequiredNonEmpty`TEST`;
} catch (e) {
    console.error("envRequiredNonEmpty threw an error")
    console.log(e);
}
```

In this case, `envRequired` will throw an error if the variable is not set, and `envRequiredNonEmpty` will throw an
error if the variable is not set or is set to the empty string.

### Note on escaping

Under the hood both `env` and `envStr` call
[String.raw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw), so
substitutions are processed, but escape sequences are not. This is likely an edge case for environment variables, but
nonetheless this gives the following test case:

```js
process.env[String.raw`TEST\ENV`] = 'test';

expect(env`TEST\ENV`).toBe('test');
expect(env`TESTENV`).toBe(undefined);
expect(env`TEST\\ENV`).toBe(undefined);
```
