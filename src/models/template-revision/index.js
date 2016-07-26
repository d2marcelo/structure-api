/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import DigitalAsset    from '../digital-asset'
import Model           from '../root'
import r               from '../../lib/database/driver'
import RevisionModel   from '../revision'

/**
 * TemplateRevisionModel Class
 *
 * @public
 * @class TemplateRevisionModel
 */
class TemplateRevisionModel extends RevisionModel {

  /**
   * TemplateRevisionModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
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
