import cors     from 'cors'
import multer   from 'multer'
import ShortId  from '../services/short-id'

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/tmp/uploads')
  },
  filename: function(req, file, cb) {
    console.error('file', file)
    var name = file.originalname.replace(/ /g, '_')
    var filename = new ShortId().issue(name + new Date()) + '_' + name

    cb(null, filename)
  }
})
var storageAdaptorName = 'disk'
var upload = multer({storage}).any()

import App               from '../nodes/application'
import Auth              from '../nodes/auth'
import Bucket            from '../nodes/bucket'
import DigitalAsset      from '../nodes/digital-asset'
import Document          from '../nodes/document'
import DocumentRevision  from '../nodes/document-revision'
import Field             from '../nodes/field'
import Org               from '../nodes/organization'
import Taxonomy          from '../nodes/taxonomy'
import Template          from '../nodes/template'
import TemplateRevision  from '../nodes/template-revision'
import User              from '../nodes/user'

const Nodes = [App, Auth, Bucket, DigitalAsset, Document, DocumentRevision, Field, Org, Taxonomy, Template, TemplateRevision, User]

import ObjectEach from '../lib/utils/object/each'

function Dispatch(node, actionName) {

  return async (req, res, next) => {

    var action = node[actionName]

    if(req.files) {
      console.error('files', req.files)
      /*
      TODO: what's a better way to handle this?
      */
      req.body.files = req.files.map( (file) => {
        file.diskFileName     = file.filename
        file.originalFileName = file.originalname.replace(/ /g, '_')
        file.storageAdaptor   = storageAdaptorName

        return file
      })
    }
    //console.log('req here', req)
    var result = await action.call(node, req)

    var pkg    = {},
        status = 200

    if(result) {
      if(req.method == 'PUT') status = 201

      if(actionName == 'getAll') {
        pkg[node.entityName] = result
      }

      else {
        pkg = result
      }

      res.status(status).json({
        pkg,
        status
      })
    }

    else {
      status = 403

      res.status(status).json({
        status
      })
    }

  }

}

class Router {

  constructor(options = {}) {

    this.Nodes  = Nodes
    this.server = options.server

    //this.structRoute()
    this.generateRoutesFromNodes()

  }

  generateRoutesFromNodes() {
    var server  = this.server,
        version = 'v0.1'

    server.use(cors())

    /*
    TODO: build middleware to handle the extra routes needed per respective node(s)
    */
    var digitalAsset = new DigitalAsset()
    server.get(`/api/${version}/digital-assets/embeds/:type/:url(*)`,  new Dispatch(new DigitalAsset(), 'fetchEmbed'))
    server.get(`/api/${version}/digital-assets/:id/view`,           digitalAsset.view.bind(digitalAsset))

    server.post(`/api/${version}/auth/login`,                       new Dispatch(new Auth(), 'login'))

    server.put(`/api/${version}/digital-assets`,                    [upload, new Dispatch(new DigitalAsset(), 'create')])

    this.Nodes.forEach( (Node) => {
      var node      = new Node(),
          routeName = node.entityName

      /*if(node.routes) {

      }*/

      server.get(`/api/${version}/${routeName}/:id`,                 new Dispatch(node, 'getById'))
      server.get(`/api/${version}/${routeName}`,                     new Dispatch(node, 'getAll'))

      server.post(`/api/${version}/${routeName}/:id`,                new Dispatch(node, 'update'))

      server.put(`/api/${version}/${routeName}`,                     new Dispatch(node, 'create'))

      server.delete(`/api/${version}/${routeName}/:id`,              new Dispatch(node, 'delete'))
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
