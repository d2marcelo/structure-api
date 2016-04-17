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

import {chalk, logger} from '../../lib/logger'
import r               from '../../lib/database/driver'
import RootNode        from '../root'
import {RootApp}       from './schemas'
import uuid            from '../../lib/utils/uuid'

class AppNode extends RootNode {

  constructor() {
    super()

    this.mapping = {
      fields: {

      }
    }

    this.table = 'apps'
  }

  fields() {

    return {
      mutation: {
        createApp: {
          args: {
            desc: {type: 'string'},
            title: {type: 'string'},
          },
          description: 'Create an app',
          type: RootApp,
          resolve: async (root, params, options) => {
            var pkg = {
              createdAt: r.now(),
              desc: params.desc,
              title: params.title,
              id: uuid(),
              updatedAt: r.now()
            }

            const app = await r.db(process.env.RETHINK_DB_NAME).table(this.table).insert(pkg, {
              durability: 'hard',
              returnChanges: true
            })

            if(!app) {
              logger.error(`Application could not be created`, pkg)
              return
            }

            return app.changes[0].new_val
          }
        }
      },
      query: {
        app: {
          args: {
            id: {type: new GraphQLNonNull(GraphQLString)}
          },
          description: 'Get the app by ID',
          type: RootApp,
          resolve: async (root, params, options) => {
            const app = await r.db(process.env.RETHINK_DB_NAME).table(this.table).get(params.id)

            if(!app) {
              logger.error(`App with id could not be found: ${params.id}`)
              return
            }

            return app
          }
        },
        apps: {
          description: 'Get a list of apps',
          type: new GraphQLList(RootApp),
          resolve: async (root, params, options) => {
            const apps = await r.db(process.env.RETHINK_DB_NAME).table(this.table)

            if(!apps) {
              logger.error(`Could not get apps`)
              return
            }

            return apps
          }
        }
      }
    }

  }

}

export default AppNode
