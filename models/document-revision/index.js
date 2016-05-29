import {chalk, logger} from '../../lib/logger'
import DigitalAsset    from '../digital-asset'
import Model           from '../root'
import r               from '../../lib/database/driver'
import RevisionModel   from '../revision'

class DocumentRevisionModel extends RevisionModel {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'document-revisions',

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
            Node: 'Document',
            foreignKey: 'id',
            localField: 'document',
            localKey: 'documentId'
          }
        ]
      },
      schema: {
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

}

export default DocumentRevisionModel
