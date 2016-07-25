process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception')
  console.error(err)
})

process.on('unhandledRejection', function(err) {
  console.error('Unhandled Rejection')
  console.error(err)
})

import {chalk, logger} from '../../src/lib/logger'
import config          from '../../src/lib/database/config'
import r               from '../../src/lib/database/driver'

module.exports = function(argv) {

  var debug = argv.debug

  async function tableOperations() {

    try {
      await r.dbCreate('test')
      logger.debug('Created database test')
    }
    catch(e) {}

    for(let i = 0, l = config.tables.length; i < l; i++) {
      let table = config.tables[i]

      if(argv.drop) {
        try {
          await r.tableDrop(table)
          logger.debug(`Dropped table ${table}`)
        }
        catch(err) {
          if(err.message.indexOf('does not exist') == -1) {
            logger.error(`Error dropping table ${table}`)
            console.error(err)
          }
        }
      }

      try {
        await r.tableCreate(table)
        logger.debug(`Created table ${table}`)
      }
      catch(err) {
        if(err.message.indexOf('already exists') == -1) {
          logger.error(`Error creating table ${table}`)
          console.error(err)
        }
        else {
          logger.error(`Cannot create table ${table}; already exists`)
        }
      }
    }

    logger.debug('Completed dropping & adding tables')
    process.exit(0)

  }

  tableOperations()

}
