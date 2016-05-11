import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'

class RegistryNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'registry',
      linkName: 'registry',
      table: 'registry',

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
        belongsTo: [
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          },
        ],
        hasMany: [
          {
            Node: 'Plugin',
            foreignKey: 'id',
            localField: 'plugins',
            localKey: 'pluginIds'
          },
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

  create(req) {
    return new Promise( (resolve, reject) => {

      

    })
  }

}

export default RegistryNode
