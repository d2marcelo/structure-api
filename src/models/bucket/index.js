import {chalk, logger} from '../../lib/logger'
import Model           from '../root'

class BucketModel extends Model {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'buckets',

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
            localField: 'channel',
            localKey: 'channelId'
          },
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          }
        ]
      },
      schema: {
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        /*
        Example of a query with some documents

        query: [
          {
            id: 5
          },
          // Get one article by author with id 543; this would get their latest article
          {
            filter: {
              authorId: 543
            },
            limit: 1
          },
          // Get up to 5 articles that are in the category "trending"
          {
            filter: {
              category: 'trending'
            },
            limit: 5
          },
          // Get up to 10 documents that have "Kardashian" as the title
          {
            match: /$kardashian$/,
            key: 'title',
            limit: 10
          }
        ]
        */
        query: {
          type: 'array'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

}

export default BucketModel
