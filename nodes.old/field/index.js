import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'
import thinky          from '../../lib/database/driver'

class FieldNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'fields',
      linkName: 'field',
      table: 'fields',

      mapping: {
        fields: {

        }
      },
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

export default FieldNode
