import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'

class OrgNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'orgs',
      linkName: 'org',
      table: 'organizations',

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
        hasMany: [
          {
            Node: 'App',
            foreignKey: 'id',
            localField: 'apps',
            localKey: 'appIds'
          },
          {
            Node: 'Bucket',
            foreignKey: 'id',
            localField: 'buckts',
            localKey: 'bucketIds'
          },
          {
            Node: 'User',
            foreignKey: 'id',
            localField: 'users',
            localKey: 'userIds'
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

export default OrgNode
