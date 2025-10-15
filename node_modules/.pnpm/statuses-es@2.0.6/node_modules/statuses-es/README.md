# statuses-es

ESM build of [statuses](https://www.npmjs.com/package/statuses) with bundled types.

**IMPORTANT**: During development tests are conducted on the latest node.js (LST) version it does not mean that this library works only with it, in theory it will work on earlier versions but to check it is not meaningful because the use of versions in production that do not get the security patch is not a good practice.

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![OpenSSF Scorecard Badge][ossf-scorecard-badge]][ossf-scorecard-visualizer]

HTTP status utility for node.

This module provides a list of status codes and messages sourced from
a few different projects:

  * The [IANA Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
  * The [Node.js project](https://nodejs.org/)
  * The [NGINX project](https://www.nginx.com/)
  * The [Apache HTTP Server project](https://httpd.apache.org/)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


```sh
# ✨ Auto-detect
npx nypm install statuses-es

# npm
npm install statuses-es

# yarn
yarn add statuses-es

# pnpm
pnpm install statuses-es

# bun
bun install statuses-es
```

## API

**ESM** (Node.js, Bun)

```js
import status from "statuses-es";
```

**CommonJS** (Legacy Node.js)

```js
const status = require("statuses-es");
```

**CDN** (Deno, Bun and Browsers)

```js
import status from "https://esm.sh/statuses-es";
```

### status(code)

Returns the status message string for a known HTTP status code. The code
may be a number or a string. An error is thrown for an unknown status code.


```js
status(403) // => 'Forbidden'
status('403') // => 'Forbidden'
status(306) // throws
```

### status(msg)

Returns the numeric status code for a known HTTP status message. The message
is case-insensitive. An error is thrown for an unknown status message.

<!-- eslint-disable no-undef -->

```js
status('forbidden') // => 403
status('Forbidden') // => 403
status('foo') // throws
```

### status.codes

Returns an array of all the status codes as `Integer`s.

### status.code[msg]

Returns the numeric status code for a known status message (in lower-case),
otherwise `undefined`.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status['not found'] // => 404
```

### status.empty[code]

Returns `true` if a status code expects an empty body.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.empty[200] // => undefined
status.empty[204] // => true
status.empty[304] // => true
```

### status.message[code]

Returns the string message for a known numeric status code, otherwise
`undefined`. This object is the same format as the
[Node.js http module `http.STATUS_CODES`](https://nodejs.org/dist/latest/docs/api/http.html#http_http_status_codes).

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.message[404] // => 'Not Found'
```

### status.redirect[code]

Returns `true` if a status code is a valid redirect status.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.redirect[200] // => undefined
status.redirect[301] // => true
```

### status.retry[code]

Returns `true` if you should retry the rest.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.retry[501] // => undefined
status.retry[503] // => true
```

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/esm-ts/statuses-es/master?label=ci
[ci-url]: https://github.com/esm-ts/statuses-es/actions?query=workflow%3Aci
[coveralls-image]: https://badgen.net/coveralls/c/github/esm-ts/statuses-es/master
[coveralls-url]: https://coveralls.io/r/jshttp/statuses?branch=master
[node-version-image]: https://badgen.net/npm/node/statuses-es
[node-version-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/statuses-es
[npm-url]: https://npmjs.org/package/statuses-es
[npm-version-image]: https://badgen.net/npm/v/statuses-es
[ossf-scorecard-badge]: https://api.securityscorecards.dev/projects/github.com/esm-ts/statuses-es/badge
[ossf-scorecard-visualizer]: https://kooltheba.github.io/openssf-scorecard-api-visualizer/#/projects/github.com/esm-ts/statuses-es
