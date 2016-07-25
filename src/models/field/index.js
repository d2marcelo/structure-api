import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import r               from '../../lib/database/driver'

class FieldModel extends Model {

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
