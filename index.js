var is = require('type-is')
var HttpStatusCodes = require('http-status-codes')
var _ = require('lodash')

module.exports = function enforceContentType (opts) {
  var defaults = {
    force: false
  }

  if (!_.isObject(opts)) {
    throw new Error('enforceContentType must be passed an object')
  }

  if (arguments.length > 1) {
    throw new Error('enforceContentType passed the wrong number of arguments')
  }

  if (!_.isArray(opts.type) && !_.isString(opts.type)) {
    throw new Error('enforceContentType type must be string/array')
  }

  if (!_.isArray(opts.type)) {
    opts.type = [ opts.type ]
  }

  var options = _.merge(defaults, opts)

  return function enforceContentType (req, res, next) {
    var method = options.force ? is.is : is
    var result = method(req, options.type)

    if (result === null || result) {
      return next()
    }

    res.status(HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE)
    res.end()
  }
}
