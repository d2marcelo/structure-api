import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {
  GraphQLEmailType,
  GraphQLGenericObjectType,
  GraphQLJSON,
  GraphQLURLType
} from '../types'

import {chalk, logger} from '../../lib/logger'
import r               from '../../lib/database/driver'
import RootNode        from '../root'
import {RootBucket}    from './schemas'
import uuid            from '../../lib/utils/uuid'

class BucketNode extends RootNode {

  constructor() {
    super()

    this.mapping = {
      fields: {

      }
    }

    this.table = 'buckets'
  }

  fields() {

    return {
      mutation: {
        createBucket: {
          args: {
            data: {type: GraphQLGenericObjectType},
            desc: {type: 'string'},
            title: {type: 'string'},
          },
          description: 'Create a bucket',
          type: RootBucket,
          resolve: async (root, params, options) => {
            var pkg = {
              createdAt: r.now(),
              desc: params.desc,
              title: params.title,
              id: uuid(),
              updatedAt: r.now()
            }

            const bucket = await r.db(process.env.RETHINK_DB_NAME).table(this.table).insert(pkg, {
              durability: 'hard',
              returnChanges: true
            })

            if(!bucket) {
              logger.error(`Bucket could not be created`, pkg)
              return
            }

            return bucket.changes[0].new_val
          }
        }
      },
      query: {
        bucket: {
          args: {
            id: {type: new GraphQLNonNull(GraphQLString)}
          },
          description: 'Get the bucket by ID',
          type: RootBucket,
          resolve: async (root, params, options) => {
            const bucket = await r.db(process.env.RETHINK_DB_NAME).table(this.table).get(params.id)

            if(!bucket) {
              logger.error(`Bucket with id could not be found: ${params.id}`)
              return
            }

            return bucket
          }
        },
        buckets: {
          description: 'Get a list of buckets',
          type: new GraphQLList(RootBucket),
          resolve: async (root, params, options) => {
            const buckets = await r.db(process.env.RETHINK_DB_NAME).table(this.table)

            if(!buckets) {
              logger.error(`Could not get buckets`)
              return
            }

            return buckets
          }
        }
      }
    }

  }

}

export default BucketNode
