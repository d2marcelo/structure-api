import {chalk, logger}  from '../../lib/logger'
import DocumentRevision from '../document-revision'
import RootNode         from '../root'
import thinky           from '../../lib/database/driver'

//import config from '../../config'

class DocumentNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'documents',
      linkName: 'document',
      table: 'documents',

      mapping: {
        fields: {

        }
      },
      permissions: {
        create:  ['user'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['user'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          },
          {
            Node: 'Template',
            foreignKey: 'id',
            localField: 'template',
            localKey: 'templateId'
          },
          {
            Node: 'User',
            foreignKey: 'id',
            localField: 'user',
            localKey: 'userId'
          }
        ],
        hasMany: [
          {
            Node: 'Taxonomy',
            foreignKey: 'id',
            localField: 'taxonomys',
            localKey: 'taxonomysId'
          },
        ]
      },
      schema: {
        activeRevisionId: {
          type: 'string'
        },
        desc: {
          type: 'string'
        },
        revisionIds: {
          type: 'array'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

  create(req) {
    if(!req.body.fields) return RootNode.prototype.getById.apply(this, arguments)

    /*
    NOTE:
    When a template is created with fields, we need to take those fields and place them on a revision
    */

    var fields = req.body.fields.slice(0)
    delete req.body.fields

    return new Promise( async (resolve, reject) => {
      // Create document
      var doc = await RootNode.prototype.create.call(this, req)

      // Create revision

      var revision = await new DocumentRevision().create({
        body: {
          documentId: 2,
          fields
        }
      })

      // Associate document with revision
      var update = await this.update({
        body: {
          activeRevisionId: revision.id,
          revisionIds: [revision.id]
        },
        params: {
          id: doc.id
        }
      })

      // Get document with first revision
      var docFinalized = await this.getById({
        params: {
          id: doc.id
        }
      })

      resolve(docFinalized)
    })
  }

  getAll() {
    return new Promise( async (resolve, reject) => {

      var docs = await RootNode.prototype.getAll.call(this),
          docsResolved = []

      docs.forEach( (doc) => {
        docsResolved.push(this.getActiveRevision(doc).then( (revision) => {
          return Object.assign(doc, {
            fields: revision.fields,
            title: revision.title
          })
        }))
      })

      Promise.all(docsResolved)
        .then( (docs) => {
          resolve(docs)
        })

    })
  }

  getById(req) {
    var id = (typeof req == 'string') ? req : req.params.id

    return new Promise( async (resolve, reject) => {

      var doc = await RootNode.prototype.getById.call(this, id)

      if(!doc.id) {
        logger.error('Could not get document', id)
        return reject(doc)
      }

      var revision = await this.getActiveRevision(doc)

      Object.assign(doc, {
        fields: revision.fields,
        title: revision.title
      })

      return resolve(doc)

    })

  }

  /*
  NOTE:
  Revisions are created on save, not doc creation, which means they aren't guaranteed exist after initial creation.
  The create method has been recently modified to add a revision if the `fields` property is passed
  */
  getActiveRevision(doc) {

    return new Promise( async (resolve, reject) => {

      if(!doc.activeRevisionId) return resolve({
        fields: [],
        title: doc.title
      })

      var revision = await new DocumentRevision().getById(doc.activeRevisionId)

      if(!revision.id) {
        logger.error('Could not get document revision for', doc.id)
        return reject(revision)
      }

      resolve(revision)

    })

  }

}

export default DocumentNode
