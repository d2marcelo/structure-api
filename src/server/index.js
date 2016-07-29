/**
 * Module Dependencies
 *
 * @ignore
 */
import bodyParser      from 'body-parser'
import {chalk, logger} from '../lib/logger'
import Dispatcher      from './dispatcher'
import express         from 'express'
import path            from 'path'
import Router          from './router'
import serveStatic     from 'serve-static'

function removePoweredBy(req, res, next) {
  res.removeHeader('X-Powered-By')
  next()
}

/**
 * Server Class
 *
 * @public
 * @class Server
 */
class Server {

  constructor(options = {}) {

    this.server = express()

    this.server.use(serveStatic(path.join(__dirname, '../public')))
    this.server.use(bodyParser.urlencoded({extended: true}))
    this.server.use(bodyParser.json({strict: false}))
    this.server.use(removePoweredBy)
    if(process.env.NODE_ENV != 'test') {
      this.server.use(this.logRequestInfo)
    }

    //this.loadRoutes()
    this.router = options.router || new Router({
      dispatcher: options.dispatcher || new Dispatcher(),
      server: this.server
    })

    //console.log('DEBUG: routes', this.debugRoutes())

  }

  debugRoutes() {
    var route, routes = []

    this.server._router.stack.forEach(function(middleware) {
      if(middleware.route) {
        routes.push(middleware.route)
      } else if(middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach(function(handler) {
          route = handler.route
          route && routes.push(route)
        })
      }
    })

    return routes
  }

  logRequestInfo(req, res, next) {

    logger.info(req.method, req.originalUrl)
    next()

  }

  start() {

    this.server = this.server.listen(process.env.EXPRESS_PORT)

  }

  stop() {

    var r = require('../lib/database/driver')
    r.getPoolMaster().drain()

    this.server.close()

  }

  use() {

    this.server.use.apply(this.server, arguments)

  }

}

module.exports = Server
