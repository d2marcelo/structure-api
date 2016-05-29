import {chalk, logger} from './logger'
import cors        from 'cors'
import Disk        from 'structure-storage-disk-adaptor'
import multer      from 'multer'

import App               from '../controllers/application'
import Auth              from '../controllers/auth'
import Bucket            from '../controllers/bucket'
import DigitalAsset      from '../controllers/digital-asset'
import Document          from '../controllers/document'
import DocumentRevision  from '../controllers/document-revision'
import Field             from '../controllers/field'
import Org               from '../controllers/organization'
import Registry          from '../controllers/registry'
import Taxonomy          from '../controllers/taxonomy'
import Template          from '../controllers/template'
import TemplateRevision  from '../controllers/template-revision'
import User              from '../controllers/user'

const Controllers = [App, Auth, Bucket, DigitalAsset, Document, DocumentRevision, Field, Org, Registry, Taxonomy, Template, TemplateRevision, User]

/*
TODO:
find a for this config
*/
var storageAdaptors = {
  disk: {
    adaptor: new Disk.Adaptor(),
    name: 'disk'
  }
}

var upload = multer({storage: storageAdaptors.disk.adaptor}).any()

function Dispatch(contoller, actionName) {

  return async (req, res, next) => {

    var action = controller[actionName]

    if(req.files) {
      console.error('files', req.files)
      /*
      TODO: what's a better way to handle this?
      */
      req.body.files = req.files.map( (file) => {
        file.diskFileName     = file.filename
        file.originalFileName = file.originalname.replace(/ /g, '_')
        file.storageAdaptor   = storageAdaptors.disk.name

        return file
      })
    }

    var pkg    = {},
        status = 200

    try {
      var result = await action.call(node, req)

      if(req.method == 'PUT') status = 201

      // return collection name
      if(actionName == 'getAll') {
        pkg[controller.name] = result
      }
      // return item
      else {
        pkg = result
      }

      res.status(status).json({
        pkg,
        status
      })
    }
    catch(err) {
      logger.error(`Action ${actionName} failed`)
      console.error(err.stack)

      status = 403

      res.status(status).json({
        status
      })
    }

  }

}

class Router {

  constructor(options = {}) {

    this.server = options.server
    //this.structRoute()
    this.generateRoutesFromNodes()

  }

  generateRoutesFromNodes() {
    var server  = this.server,
        version = 'v0.1'

    /*
    TODO:
    Make this a simple on/off flag
    */
    server.use(cors())

    /*
    TODO: build middleware to handle the extra routes needed per respective node(s)
    */
    var digitalAsset = new DigitalAsset()

    server.get(`/api/${version}/digital-assets/embeds/:type/:url(*)`,  new Dispatch(new DigitalAsset(), 'fetchEmbed'))
    server.get(`/api/${version}/digital-assets/:id/view`,              digitalAsset.view.bind(digitalAsset))
    server.get(`/api/${version}/registry/settings/:name`,              new Dispatch(new Registry(), 'getSettingsByName'))

    server.post(`/api/${version}/auth/login`,                          new Dispatch(new Auth(), 'login'))
    server.post(`/api/${version}/auth/user/facebook`,                  new Dispatch(new Auth(), 'authByFacebook'))

    server.put(`/api/${version}/digital-assets`,                       [upload, new Dispatch(new DigitalAsset(), 'create')])

    Controllers.forEach( (Controller) => {
      var controller = new Controller(),
          routeName  = controller.name

      /*if(node.routes) {

      }*/

      server.get(`/api/${version}/${routeName}/:id`,                    new Dispatch(controller, 'getById'))
      server.get(`/api/${version}/${routeName}`,                        new Dispatch(controller, 'getAll'))

      server.post(`/api/${version}/${routeName}/:id`,                   new Dispatch(controller, 'update'))

      server.put(`/api/${version}/${routeName}`,                        new Dispatch(controller, 'create'))

      server.delete(`/api/${version}/${routeName}/:id`,                 new Dispatch(controller, 'delete'))
    })

  }

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
