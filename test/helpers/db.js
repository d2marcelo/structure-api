process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception')
  console.error(err)
})

process.on('unhandledRejection', function(err) {
  console.error('Unhandled Rejection')
  console.error(err)
})

import config from '../../lib/database/config'
import r      from '../../lib/database/driver'

var tableOperations = []

config.tables.forEach( async (table) => {
  try {
    tableOperations.push(await r.tableDrop(table))
    console.error(`Dropped table ${table}`)
  }
  catch(err) {
    if(err.message.indexOf('does not exist') == -1) {
      console.error(`Error dropping table ${table}`)
      console.error(err)
    }
  }

  try {
    tableOperations.push(await r.tableCreate(table))
    console.error(`Created table ${table}`)
  }
  catch(err) {
    console.error(`Error creating table ${table}`)
    console.error(err)
  }

})

Promise
  .all(tableOperations)
  .then( () => {
    // Let console messages pipe out before process exits
    setTimeout(function() {
      process.exit(0)
    }, 250)
  })
  .catch( (err) => {
    console.error('Database operation failed')
    console.error(err)
    process.exit(1)
  })
