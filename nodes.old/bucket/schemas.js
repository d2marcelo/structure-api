import {GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInputObjectType} from 'graphql'
import {
  GraphQLEmailType,
  GraphQLGenericObjectType,
  GraphQLJSON,
  GraphQLURLType
} from '../types'

export const RootBucket = new GraphQLObjectType({
  name: 'Bucket',
  description: 'A Bucket',
  fields: () => ({
    data: {type: GraphQLGenericObjectType},
    desc: {type: new GraphQLNonNull(GraphQLString)},
    id: {type: new GraphQLNonNull(GraphQLString), description: 'The id'},
    createdAt: {type: GraphQLString, description: 'The datetime the bucket was created'},
    updatedAt: {type: GraphQLString, description: 'The datetime the bucket was last updated'},
    title: {type: new GraphQLNonNull(GraphQLString)}
  })
})
