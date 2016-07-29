/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger}  from '../../lib/logger'
import DocumentRevision from '../document-revision'
import documentSchema   from './schemas/document'
import Model            from '../root'
import r                from '../../lib/database/driver'

//import config from '../../config'

/**
 * DocumentModel Class
 *
 * @public
 * @class DocumentModel
 */
class DocumentModel extends Model {

  /**
   * DocumentModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'documents',

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
      schema: documentSchema
    }, options))
  }

  /**
   * Create, or save, a document
   *
   * @public
   * @param {Object} pkg - The data to save for the document
   */
  create(pkg = {}) {

    /*
    NOTE:
    When a document is created with fields, we need to take those fields and place them on a revision
    */
    var fields = []
    if(pkg.fields) {
      fields = pkg.fields.slice(0)
      delete pkg.fields
    }

    return new Promise( async (resolve, reject) => {
      // Create document
      var doc = await Model.prototype.create.call(this, pkg)

      // Create revision
      var revision = await new DocumentRevision().create({
        documentId: doc.id,
        fields
      })

      // Associate document with revision
      var update = await this.update(doc.id, {
        activeRevisionId: revision.id,
        revisionIds: [revision.id],
        title: doc.title // To satisfy the schema
      })

      resolve(update)
    })
  }

  /**
   * Get all documents
   *
   * @public
   */
  getAll() {
    return new Promise( async (resolve, reject) => {

      var docs = await Model.prototype.getAll.call(this),
          docsResolved = []

      docs.forEach( (doc) => {
        docsResolved.push(this.getActiveRevision(doc).then( (revision) => {
          return Object.assign(doc, {
            fields: revision.fields
          })
        }))
      })

      Promise.all(docsResolved)
        .then( (docs) => {
          resolve(docs)
        })

    })
  }

  /**
   * Get document by ID
   *
   * @public
   * @param {String} id
   */
  getById(id) {

    return new Promise( async (resolve, reject) => {

      var doc = await Model.prototype.getById.call(this, id)

      if(!doc.id) {
        logger.error('Could not get document', id)
        return reject(doc)
      }

      var revision = await this.getActiveRevision(doc)

      Object.assign(doc, {
        fields: revision.fields
      })

      return resolve(doc)

    })

  }

  /**
   * Get the document's active revision
   *
   * @public
   * @param {Object} doc - The document
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

export default DocumentModel
