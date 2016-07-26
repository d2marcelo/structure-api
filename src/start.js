/**
 * Module Dependencies
 *
 * @ignore
 */
process.env.npm_package_version = process.env.npm_package_version || require('../package.json').version

var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')})

var Server = require('./lib/server')

var server = new Server()

server.start()
