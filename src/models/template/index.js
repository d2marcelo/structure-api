/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger}  from '../../lib/logger'
import Model            from '../root'
import r                from '../../lib/database/driver'
import TemplateRevision from '../template-revision'
import templateSchema      from './schemas/template'


/**
 * TemplateModel Class
 *
 * @public
 * @class TemplateModel
 */
class TemplateModel extends Model {

  /**
   * TemplateModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'templates',

      permissions: {
        create:  ['admin'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['admin'],
      },
      relations: {
        belongsTo: {
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }
      },
      schema: templateSchema
    }, options))
  }

  /**
   * Get all templates
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

  /**
   * Get template by ID
   *
   * @public
   * @param {String} id
   */
  getById(id) {

    return new Promise( async (resolve, reject) => {

      var doc = await Model.prototype.getById.call(this, id)

      if(!doc.id) {
        logger.error('Could not get template', id)
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

  /**
   * Get template's active revision
   *
   * @public
   * @param {Object} doc - The item to get a revision for
   */
  getActiveRevision(doc) {

    return new Promise( async (resolve, reject) => {

      if(!doc.activeRevisionId) return resolve({
        fields: [],
        title: doc.title
      })

      var revision = await new TemplateRevision().getById(doc.activeRevisionId)

      if(!revision.id) {
        logger.error('Could not get template revision for', doc.id)
        return reject(revision)
      }

      resolve(revision)

    })

  }

}

export default TemplateModel
