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

  /**
   * Server constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {

    this.server = express()

    this.server.use(serveStatic(path.join(__dirname, '../public')))
    this.server.use(bodyParser.urlencoded({extended: true}))
    this.server.use(bodyParser.json({strict: false}))
    this.server.use(removePoweredBy)
    if(process.env.NODE_ENV != 'test') {
      this.server.use(this.logRequestInfo)
    }

    this.router = options.router || new Router({
      dispatcher: options.dispatcher || new Dispatcher(),
      server: this.server
    })

    //console.log('DEBUG: routes', this.debugRoutes())

  }

  /**
   * List of routes registered with Express including middleware routes
   *
   * @private
   */
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

  /**
   * Log each HTTP request's method and url
   *
   * @private
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   * @param {Function} next - Express next
   */
  logRequestInfo(req, res, next) {

    logger.info(req.method, req.originalUrl)
    next()

  }

  /**
   * Start the HTTP Server
   *
   * @public
   */
  start() {

    this.server = this.server.listen(process.env.EXPRESS_PORT)

  }

  /**
   * Stop the HTTP Server
   *
   * @public
   */
  stop() {

    var r = require('../lib/database/driver')
    r.getPoolMaster().drain()

    this.server.close()

  }

  /**
   * Add Express middleware to the Express server object
   *
   * @public
   */
  use() {

    this.server.use.apply(this.server, arguments)

  }

}

module.exports = Server
