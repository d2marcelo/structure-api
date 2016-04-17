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
import {LinkOrgUser, RootOrg}       from './schemas'
import uuid            from '../../lib/utils/uuid'

class UserNode extends RootNode {

  constructor() {
    super()

    this.mapping = {
      fields: {

      }
    }

    this.table = 'organizations'
  }

  fields() {

    return {
      mutation: {
        addUserToOrg: {
          args: {
            orgId: {type: 'string'},
            userId: {type: 'string'}
          },
          description: 'Add a user to an organization',
          type: LinkOrgUser,
          resolve: async (root, params, options) => {
            var pkg = {
              createdAt: r.now(),
              id: uuid(),
              orgId: params.orgId,
              updatedAt: r.now(),
              userId: params.userId
            }

            const user = await r.db(process.env.RETHINK_DB_NAME).table('link_organizations_users').filter({orgId: params.orgId, userId: params.userId}).limit(1)

            if(
              (user.orgId  && user.userId) &&
              (user.orgId  == params.orgID) &&
              (user.userId == params.userId)
            ) {
              throw new Error(`Cannot add user to organization with id: ${params.orgId}. User with id already belongs to organization: ${params.userId}. User obj: ${user}`)
            }

            const res = await r.db(process.env.RETHINK_DB_NAME).table('link_organizations_users').insert(pkg, {
              durability: 'hard',
              returnChanges: true
            })

            if(!res) {
              throw new Error(`Could not add user (${params.usedId}) to org (${params.orgId})`)
            }

            return res.changes[0].new_val
          }
        },
        createOrg: {
          args: {
            desc: {type: 'string'},
            title: {type: 'string'}
          },
          description: 'Create an organization',
          type: RootOrg,
          resolve: async (root, params, options) => {
            var pkg = {
              createdAt: r.now(),
              desc: params.desc,
              title: params.title,
              id: uuid(),
              updatedAt: r.now()
            }

            const org = await r.db(process.env.RETHINK_DB_NAME).table(this.table).insert(pkg, {
              durability: 'hard',
              returnChanges: true
            })

            if(!org) {
              logger.error(`Organization could not be created`, pkg)
              return
            }

            return org.changes[0].new_val
          }
        }
      },
      query: {
        org: {
          args: {
            id: {type: new GraphQLNonNull(GraphQLString)}
          },
          description: 'Get the org by ID',
          type: RootOrg,
          resolve: async (root, params, options) => {
            const org = await r.db(process.env.RETHINK_DB_NAME).table(this.table).get(params.id)

            if(!org) {
              logger.error(`Org with id could not be found: ${params.id}`)
              return
            }

            return org
          }
        },
        orgs: {
          description: 'Get a list of organizations',
          type: new GraphQLList(RootOrg),
          resolve: async (root, params, options) => {
            const orgs = await r.db(process.env.RETHINK_DB_NAME).table(this.table)

            if(!orgs) {
              logger.error(`Could not get orgs`)
              return
            }

            return orgs
          }
        }
      }
    }

  }

}

export default UserNode
