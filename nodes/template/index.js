import {chalk, logger}  from '../../lib/logger'
import RootNode         from '../root'
import TemplateRevision from '../template-revision'

class TemplateNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'templates',
      linkName: 'template',
      table: 'templates',

      mapping: {
        fields: {

        }
      },
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
      schema: {
        desc: {
          type: 'string'
        },
        fields: {
          type: 'array'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

  getById(req) {
    var id = (typeof req == 'string') ? req : req.params.id

    return new Promise( async (resolve, reject) => {

      var doc = await RootNode.prototype.getById.call(this, req)

      if(!doc.id) {
        logger.error('Could not get template', id)
        return reject(doc)
      }

      /*
      NOTE:
      Revisions are created on save, not doc creation, which means they aren't guaranteed exist after initial creation unless app does both
      */
      if(doc.activeRevisionId) {
        var revision = await this.getActiveRevision(doc.activeRevisionId)
        if(!revision.id) {
          logger.error('Could not get template revision', doc.id)
          return reject(revision)
        }
      }

      else {
        var revision = {
          fields: []
        }
      }


      Object.assign(doc, {
        fields: revision.fields,
        title: revision.title
      })

      return resolve(doc)

    })

  }

  getActiveRevision(id) {
    return new TemplateRevision().getById(id)
  }

}

export default TemplateNode
