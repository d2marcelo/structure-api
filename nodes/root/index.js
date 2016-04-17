import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {chalk, logger} from '../../lib/logger'
import r from '../../lib/database/driver'

let textTypeToGraphQLType = {
  string: new GraphQLNonNull(GraphQLString)
}

function fieldArgsToGraphQLType(field) {

  if(field.args) {
    Object.keys(field.args).forEach( (argKey) => {

      var arg = field.args[argKey]

      if(arg.type) {
        switch(arg.type) {
          case 'string':
            arg.type = textTypeToGraphQLType['string']
            break
        }
      }

      field.args[argKey] = arg
    })

  }

}

class RootNode {

  constructor() {

  }

  fields() {
    return {
      mutation: {},
      query: {}
    }
  }

  schema(Nodes) {

    var mutationFields = {},
        queryFields    = {}

    Nodes.forEach( (Node) => {
      var node = new Node()

      mutationFields = Object.assign({}, mutationFields, node.fields().mutation)
      queryFields    = Object.assign({}, queryFields, node.fields().query)
    })

    Object.keys(mutationFields).forEach( (fieldKey) => {
      var field = mutationFields[fieldKey]
      fieldArgsToGraphQLType(field)
    })

    Object.keys(queryFields).map( (fieldKey) => {
      var field = queryFields[fieldKey]
      fieldArgsToGraphQLType(field)
    })

    return new GraphQLSchema({
      mutation: new GraphQLObjectType({
        name: 'RootMutation',
        description: 'Root Mutation of the Nodes',
        fields: mutationFields
      }),
      query: new GraphQLObjectType({
        name: 'RootQuery',
        description: 'Root Query of the Nodes',
        fields: queryFields
      })
    })

  }

}

export default RootNode
