import {GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInputObjectType} from 'graphql'
import {GraphQLEmailType, GraphQLURLType} from '../types'

export const LinkOrgUser = new GraphQLObjectType({
  name: 'LinkOrgUser',
  description: 'A user of an organization',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString), description: 'The id'},
    orgId: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLString)},
    createdAt: {type: GraphQLString, description: 'The datetime the org was created'},
    updatedAt: {type: GraphQLString, description: 'The datetime the org was last updated'},
  }
})

export const RootOrg = new GraphQLObjectType({
  name: 'Org',
  description: 'An Organization',
  fields: () => ({
    desc: {type: new GraphQLNonNull(GraphQLString)},
    id: {type: new GraphQLNonNull(GraphQLString), description: 'The id'},
    createdAt: {type: GraphQLString, description: 'The datetime the org was created'},
    updatedAt: {type: GraphQLString, description: 'The datetime the org was last updated'},
    title: {type: new GraphQLNonNull(GraphQLString)}
  })
})
