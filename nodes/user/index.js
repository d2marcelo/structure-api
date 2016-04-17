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
import {RootUser}      from './schemas'
import uuid            from '../../lib/utils/uuid'

class UserNode extends RootNode {

  constructor() {
    super()

    this.mapping = {
      fields: {
        firstName: 'firstName',
        lastName: 'lastName'
      }
    }

    this.table = 'users'
  }

  fields() {

    return {
      mutation: {
        createUser: {
          args: {
            email: {type: 'string'},
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            username: {type: 'string'}
          },
          description: 'Create a user',
          type: RootUser,
          resolve: async (root, params, options) => {
            var pkg = {
              createdAt: r.now(),
              email: params.email,
              id: uuid(),
              updatedAt: r.now(),
              username: params.username
            }

            const user = await r.db(process.env.RETHINK_DB_NAME).table('users').insert(pkg, {
              durability: 'hard',
              returnChanges: true
            })

            if(!user) {
              logger.error(`User could not be created`, pkg)
              return
            }

            return user.changes[0].new_val
          }
        }
      },
      query: {
        user: {
          args: {
            id: {type: new GraphQLNonNull(GraphQLString)}
          },
          description: 'Get the user by ID',
          type: RootUser,
          resolve: async (root, params, options) => {
            const user = await r.db(process.env.RETHINK_DB_NAME).table(this.table).get(params.id)

            if(!user) {
              logger.error(`User with id could not be found: ${params.id}`)
              return
            }

            return user
          }
        },
        users: {
          description: 'Get the users',
          type: new GraphQLList(RootUser),
          resolve: async (root, params, options) => {
            const users = await r.db(process.env.RETHINK_DB_NAME).table(this.table)

            if(!users) {
              logger.error(`Could not get users`)
              return
            }

            return users
          }
        }
      }
    }

  }

}

export default UserNode
