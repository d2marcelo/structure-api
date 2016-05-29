import {GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInputObjectType} from 'graphql'
import {GraphQLEmailType, GraphQLURLType} from '../types'

export const RootApp = new GraphQLObjectType({
  name: 'App',
  description: 'An Application',
  fields: () => ({
    desc: {type: new GraphQLNonNull(GraphQLString)},
    id: {type: new GraphQLNonNull(GraphQLString), description: 'The id'},
    createdAt: {type: GraphQLString, description: 'The datetime the app was created'},
    updatedAt: {type: GraphQLString, description: 'The datetime the app was last updated'},
    title: {type: new GraphQLNonNull(GraphQLString)}
  })
})
