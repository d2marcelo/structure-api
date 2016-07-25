var config = require('./config').default

if(process.env.NODE_ENV == 'test') {
  config = {
    port: 28016
  }
}

var r = require('rethinkdbdash')(config)

r.getPoolMaster().on('log', function() {
  console.error.apply(console, arguments)
})

export default r
