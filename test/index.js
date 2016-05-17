var httpStatusCodes = require('http-status-codes')
var enforceContentType = require('..')

var assert = require('assert')
var express = require('express')
var request = require('supertest')

describe('enforceContentType', function () {
  var app
  var json = 'application/json'

  beforeEach(function () {
    app = express()
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
    assert.doesNotThrow(enforceContentType.bind(this, { type: [ json ] }))
  })

  it('calls next on correct content-type', function (done) {
    app.use(enforceContentType({ type: 'application/json', force: true }))
    app.get('/', function (req, res) { res.send('hello world') })

    request(app)
      .get('/')
      .set('content-type', 'application/json')
      .expect(httpStatusCodes.OK, done)
  })

  it('calls next on wrong content-type without a body', function (done) {
    app.use(enforceContentType({ type: [ 'application/json' ] }))
    app.get('/', function (req, res) { res.send('hello world') })

    request(app)
      .get('/')
      .set('content-type', 'text/html')
      .expect(httpStatusCodes.OK, done)
  })

  it('sends 415 on wrong content-type without a body when forced', function (done) {
    app.use(enforceContentType({ type: [ 'application/json' ], force: true }))
    app.get('/', function (req, res) { res.send('hello world') })

    request(app)
      .get('/')
      .set('content-type', 'text/html')
      .expect(httpStatusCodes.UNSUPPORTED_MEDIA_TYPE, done)
  })

  it('sends 415 on wrong content-type', function (done) {
    app.use(enforceContentType({ type: [ 'application/json' ] }))
    app.post('/', function (req, res) { res.send('hello world') })

    request(app)
      .post('/')
      .set('content-type', 'text/html')
      .expect(httpStatusCodes.UNSUPPORTED_MEDIA_TYPE, done)
  })
})
