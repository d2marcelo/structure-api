import {chalk, logger} from '../../lib/logger'
import DigitalAsset    from '../digital-asset'
import Model           from '../root'
import r               from '../../lib/database/driver'
import RevisionModel   from '../revision'

class TemplateRevisionModel extends RevisionModel {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'template-revisions',

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
            Node: 'Template',
            foreignKey: 'id',
            localField: 'template',
            localKey: 'templateId'
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

export default TemplateRevisionModel
