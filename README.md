# env

## What is this?

Uses [Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
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