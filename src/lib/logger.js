/**
 * Module Dependencies
 *
 * @ignore
 */
import chalk   from 'chalk'
import winston from 'winston'

var argv = require('minimist')(process.argv.slice(2))

var logger = new winston.Logger({

  transports:[
    new winston.transports.Console({
      colorize: true,
      level: (argv.debug) ? 'debug' : process.env.LOG_LEVEL
    })
  ]

})

export {chalk}
export {logger}
