import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'

class AppNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'apps',
      linkName: 'app',
      table: 'apps',

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
        title: {
          type: 'string'
        }
      }
    }, options))
  }

}

export default AppNode
