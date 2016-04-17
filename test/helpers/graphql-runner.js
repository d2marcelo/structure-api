process.on('unhandledRejection', function (error) {
  console.error('Unhandled Promise Rejection:')
  console.error(error && error.stack || error)
})

require('babel-core/register')
require('babel-polyfill')
var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

var logger   = require('../../lib/logger').logger
var graphql  = require('graphql').graphql

var App      = require('../../nodes/application').default
var Bucket   = require('../../nodes/bucket').default
var Org      = require('../../nodes/organization').default
var RootNode = require('../../nodes/root').default
var User     = require('../../nodes/user').default

var schema = new RootNode().schema([App, Bucket, Org, User])

module.exports = function graphqlRunner(query) {

  return graphql(schema, query)

}
