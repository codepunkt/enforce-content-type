Enforce Content-Type middleware
===============================
[![npm version](https://badge.fury.io/js/enforce-content-type.svg)](https://badge.fury.io/js/enforce-content-type)
[![Build Status](https://travis-ci.org/gonsfx/enforce-content-type.svg?branch=master)](https://travis-ci.org/gonsfx/enforce-content-type)
[![Coverage Status](https://coveralls.io/repos/github/gonsfx/enforce-content-type/badge.svg?branch=master)](https://coveralls.io/github/gonsfx/enforce-content-type?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This middleware enforces the `Content-Type` header of requests to be a specified value.
If the header doesn't match that value, a HTTP status code 415 "Unsupported Media Type" is returned.

```javascript
var enforceContentType = require('enforce-content-type')

app.use(enforceContentType({
  type: 'application/json'
}))
```

It is also possible to specify multiple acceptable content types:

```javascript
app.use(enforceContentType({
  type: [
    'application/json',
    'multipart/form-data'
  ]
}))
```

Requests without a body are not enforced unless the `force` option is set to true:

```javascript
app.use(enforceContentType({
  force: true,
  type: 'application/json'
}))
```
