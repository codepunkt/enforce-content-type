var HttpStatusCodes = require('http-status-codes')
var _ = require('lodash')

module.exports = function enforceContentType (options) {
  if (!_.isObject(options)) {
    throw new Error('enforceContentType must be passed an object')
  }

  if (arguments.length > 1) {
    throw new Error('enforceContentType passed the wrong number of arguments')
  }

  if (!_.isString(options.type)) {
    throw new Error('enforceContentType type must be a string')
  }

  return function enforceContentType (req, res, next) {
    if (req.get('content-type') !== options.type) {
      res.status(HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE)
      res.end()
    } else {
      next()
    }
  }
}
