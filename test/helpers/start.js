process.on('uncaughtException', function(err) {
  console.error(err.stack)
  process.exit(1)
})

/*process.on('unhandledRejection', function(err) {
  console.error('Unhandled Rejection')
  console.error(err.stack)
  setTimeout(function() {
    process.exit(1)
  }, 250)
})*/

require('babel-core/register')
require('babel-polyfill')

var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

process.env.NODE_ENV = 'test'
//require('./runner')
