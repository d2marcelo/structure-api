/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger}   from '../lib/logger'
import cors              from 'cors'
import multer            from 'multer'
import storageAdaptors   from './storageAdaptors'

import App               from '../controllers/applications'
import Auth              from '../controllers/auth'
import Bucket            from '../controllers/buckets'
import DigitalAsset      from '../controllers/digital-assets'
import Document          from '../controllers/documents'
import DocumentRevision  from '../controllers/document-revisions'
import Field             from '../controllers/fields'
import Org               from '../controllers/organizations'
import Registry          from '../controllers/registry'
import Taxonomy          from '../controllers/taxonomies'
import Template          from '../controllers/templates'
import TemplateRevision  from '../controllers/template-revisions'
import User              from '../controllers/users'

const Controllers = [App, Auth, Bucket, DigitalAsset, Document, DocumentRevision, Field, Org, Registry, Taxonomy, Template, TemplateRevision, User]

var upload = multer({storage: storageAdaptors.disk.adaptor}).any()

/**
 * Router Class
 *
 * @public
 * @class Router
 */
class Router {

  /**
   * Router constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    this.options     = options

    this.Controllers = this.options.Controllers || Controllers
    this.dispatcher  = options.dispatcher
    this.routes      = options.routes
    this.server      = options.server
    //this.structRoute()

    this.generateRoutes()
    if(typeof this.routes == 'function') this.loadRoutes()

  }

  /**
   * Auto generate routes for controller actions
   *
   * @private
   */
  generateRoutes() {
    var server  = this.server,
        version = `v${process.env.API_VERSION}`

    /*
    TODO:
    Make this a simple on/off flag
    */
    server.use(cors())

    /*
    TODO: build middleware to handle the extra routes needed per respective node(s)
    */
    var digitalAsset = new DigitalAsset()

    server.get(`/api/${version}/digital-assets/embeds/:type/:url(*)`,  this.dispatcher.dispatch(new DigitalAsset(), 'fetchEmbed'))
    server.get(`/api/${version}/digital-assets/:id/view`,              digitalAsset.view.bind(digitalAsset))
    server.get(`/api/${version}/registry/settings/:name`,              this.dispatcher.dispatch(new Registry(), 'getSettingsByName'))

    server.post(`/api/${version}/auth/login`,                          this.dispatcher.dispatch(new Auth(), 'login'))
    server.post(`/api/${version}/auth/user/facebook`,                  this.dispatcher.dispatch(new Auth(), 'authByFacebook'))

    server.put(`/api/${version}/digital-assets`,                       [upload, this.dispatcher.dispatch(new DigitalAsset(), 'create')])

    this.Controllers.forEach( (Controller) => {
      var controller = new Controller(),
          routeName  = controller.name

      // If the controller doesn't have a route name, don't make any routes for it
      if(!controller.name) return

      server.get(`/api/${version}/${routeName}/:id`,                    this.dispatcher.dispatch(controller, 'getById'))
      server.get(`/api/${version}/${routeName}`,                        this.dispatcher.dispatch(controller, 'getAll'))

      server.post(`/api/${version}/${routeName}/:id`,                   this.dispatcher.dispatch(controller, 'update'))

      server.put(`/api/${version}/${routeName}`,                        this.dispatcher.dispatch(controller, 'create'))

      server.delete(`/api/${version}/${routeName}/:id`,                 this.dispatcher.dispatch(controller, 'delete'))
    })

  }

  /**
   * Load custom defined routes
   *
   * @private
   */
  loadRoutes() {
    this.routes.call(this, this.server)
  }

  /**
   * TBD...
   *
   * @private
   */
  structRoute() {
    var server = this.server

    var mapper = {
      buckets: {
        Node: 'bucket'
      }
    }

    server.post(`/api/struct`, (req, res, next) => {

      /* Example Query:
      buckets: {
        fields: ['data', 'desc', 'id', 'sid', 'title'],
        id: 12345
      }
      */
      var query = req.body.query

      var fetch = {}

      Object.keys(query).forEach( async (k, i) => {
        var o = query[k]

        var node = require(`../../nodes/${mapper[k].Node}`).default

        /*
        TODO: pluck the values instead of returning all the values
        */
        if(o.id) {
          fetch[k] = await node.getById(o.id)
        }

        else {
          fetch[k] = await node.getAll()
        }

      })

      res.status(200).json({
        pkg: fetch,
        status: 200
      })
    })
  }

}

export default Router
