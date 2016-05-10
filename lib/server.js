import bodyParser      from 'body-parser'
import {chalk, logger} from './logger'
import express         from 'express'
//import graphqlHTTP     from 'express-graphql'
import passport        from 'passport'
import path            from 'path'
import RootNode        from '../nodes/root'
import Router          from './router'
import serveStatic     from 'serve-static'

function removePoweredBy(req, res, next) {
  res.removeHeader('X-Powered-By')
  next()
}

class StructureServer {

  constructor(options = {}) {

    this.server = express()

    this.server.use(serveStatic(path.join(__dirname, '../public')))
    this.server.use(bodyParser.urlencoded({extended: true}))
    this.server.use(bodyParser.json({strict: false}))
    this.server.use(removePoweredBy)
    if(process.env.NODE_ENV != 'test') {
      this.server.use(this.logRequestInfo)
    }

    this.server.use(passport.initialize())
    this.server.use(passport.session())

    this.router = new Router({
      Nodes: options.Nodes,
      server: this.server
    })

    //this.loadRoutes()

  }

  getRoutes() {
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

  loadRoutes() {
    require('./routes')(this.server)
  }

  logRequestInfo(req, res, next) {

    logger.info(req.method, req.originalUrl)
    next()

  }

  start() {

    this.server = this.server.listen(process.env.EXPRESS_PORT)

  }

  stop() {

    this.server.close()

  }

  use() {

    this.server.use.apply(this.server, arguments)

  }

}

module.exports = StructureServer
