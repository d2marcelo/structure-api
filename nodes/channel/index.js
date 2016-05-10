import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'
import thinky          from '../../lib/database/driver'

class ChannelNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'channels',
      linkName: 'channel',
      table: 'channels',

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
            Node: 'Channel',
            foreignKey: 'id',
            localField: 'channelParent',
            localKey: 'channelParentId'
          },
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          }
        ],
        hasMany: [
          {
            Node: 'Bucket',
            foreignKey: 'id',
            localField: 'buckets',
            localKey: 'bucketIds'
          },
          {
            Node: 'Channel',
            foreignKey: 'id',
            localField: 'channelChildren',
            localKey: 'channelChildrenIds'
          },
        ]
      },
      schema: {
        bucketIds: {
          type: 'array'
        },
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

  getAll(req) {
    var query = req.query

    return new Promise( async (resolve, reject) => {



    })
  }

}

export default ChannelNode
