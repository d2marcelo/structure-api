/**
 * Module Dependencies
 *
 * @ignore
 */
var config = require('./config').default

if(process.env.TEST_TYPE == 'unit') {
  config = {
    max: 1,
    port: 28016,
    timeout: 5
  }
}

var r = require('rethinkdbdash')(config)

r.getPoolMaster().on('log', function() {
  //console.error.apply(console, arguments)
})

module.exports = r
