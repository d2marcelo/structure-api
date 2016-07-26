/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import r               from '../../lib/database/driver'

/**
 * FieldModel Class
 *
 * @public
 * @class FieldModel
 */
class FieldModel extends Model {

  /**
   * FieldModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'fields',

      permissions: {
        create:  ['user', 'admin'],
        delete:  ['admin'],
        read:    ['user', 'organization', 'admin'],
        replace: ['admin'],
        update:  ['user', 'organization', 'admin'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          }
        ]
      },
      schema: {

      }
    }, options))
  }

}

export default FieldModel
