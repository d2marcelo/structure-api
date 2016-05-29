import config from './config'

var r = require('rethinkdbdash')(config)

r.getPoolMaster().on('log', function() {
  console.error.apply(console, arguments)
})

module.exports = r
