Enforce Content-Type middleware
===============================
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This middleware enforces the `Content-Type` header of requests to have a specified value.
If the header doesn't match that value, a HTTP status code 415 "Unsupported Media Type" is returned.

```javascript
var enforceContentType = require('enforce-content-type')

app.use(enforceContentType({
  type: 'application/json'
}))
```
