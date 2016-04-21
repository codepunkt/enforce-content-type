var HttpStatusCodes = require('http-status-codes')
var enforceContentType = require('..')

var assert = require('assert')
var sinon = require('sinon')

describe('enforceContentType', function () {
  var handler, req, res, next
  var json = 'application/json'
  var mockRequest = function (contentType) {
    return { get: function () { return contentType } }
  }

  beforeEach(function () {
    res = { status: sinon.spy(), end: sinon.spy() }
    next = sinon.spy()
  })

  it('throws an error with invalid parameters', function () {
    assert.throws(enforceContentType.bind(this))
    assert.throws(enforceContentType.bind(this, []))
    assert.throws(enforceContentType.bind(this, 'string'))
    assert.throws(enforceContentType.bind(this, 42))
    assert.throws(enforceContentType.bind(this, {}))
    assert.throws(enforceContentType.bind(this, { type: json }, 1))
  })

  it('does not throw an error with valid parameters', function () {
    assert.doesNotThrow(enforceContentType.bind(this, { type: json }))
  })

  it('calls next on correct content-type', function () {
    handler = enforceContentType({ type: json })
    req = mockRequest(json)
    handler(req, res, next)
    assert(next.calledOnce)
  })

  it('ends request with unsupported media type status on wrong content-type', function () {
    handler = enforceContentType({ type: json })
    req = mockRequest('text/html')
    handler(req, res, next)
    assert(res.status.calledWith(HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE))
    assert(res.end.calledOnce)
  })
})
