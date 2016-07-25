import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {GraphQLError} from 'graphql/error'
import {Kind} from 'graphql/language'

export const GraphQLGenericObjectType = new GraphQLScalarType({
  name: 'GenericObjectType',
  serialize: value => {
    console.error('serialize value', value)
    return value
  },
  parseValue: value => {
    console.error('parse value', value)
    return value
  },
  parseLiteral: ast => {
    if(ast.kind !== Kind.OBJECT) {
      throw new GraphQLError("Query error: Can only parse object but got a: " + ast.kind, [ast])
    }
    console.error('AST', ast)
    return ast.value
  }
})

export const GraphQLEmailType = new GraphQLScalarType({
  name: 'Email',
  serialize: value => value.toLowerCase(),
  parseValue: value => value.toLowerCase(),
  parseLiteral: ast => {
    const re = /.+@.+/;
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Email is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (!re.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast]);
    }
    if (ast.value.length < 4) {
      throw new GraphQLError(`Query error: Email must have a minimum length of 4.`, [ast]);
    }
    if (ast.value.length > 300) {
      throw new GraphQLError(`Query error: Email is too long.`, [ast]);
    }
    return ast.value.toLowerCase();
  }
});

export const GraphQLPasswordType = new GraphQLScalarType({
  name: 'Password',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Password is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 6) {
      throw new GraphQLError(`Query error: Password must have a minimum length of 6.`, [ast]);
    }
    if (ast.value.length > 60) {
      throw new GraphQLError(`Query error: Password is too long.`, [ast]);
    }
    return String(ast.value);
  }
});

export const GraphQLTitleType = new GraphQLScalarType({
  name: 'Title',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Title is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new GraphQLError(`Query error: Title must have a minimum length of 1.`, [ast]);
    }
    if (ast.value.length > 30) {
      throw new GraphQLError(`Query error: Title is too long.`, [ast]);
    }
    return String(ast.value);
  }
});

export const GraphQLURLType = new GraphQLScalarType({
  name: 'URL',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    const re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if (!re.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid URL', [ast]);
    }
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: URL is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new GraphQLError(`Query error: URL must have a minimum length of 1.`, [ast]);
    }
    if (ast.value.length > 2083) {
      throw new GraphQLError(`Query error: URL is too long.`, [ast]);
    }
    return String(ast.value);
  }
})

export const GraphQLJSON = new GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type to support raw JSON values.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral: tree => {
    const parser = getParser(tree.kind)
    return parser.call(this, tree)
  }
})

function getParser(kind) {
  switch (kind) {
    case Kind.INT:
      return tree => GraphQLInt.parseLiteral(tree)

    case Kind.FLOAT:
      return tree => GraphQLFloat.parseLiteral(tree)

    case Kind.BOOLEAN:
      return tree => GraphQLBoolean.parseLiteral(tree)

    case Kind.STRING:
      return tree => GraphQLString.parseLiteral(tree)

    case Kind.ENUM:
      return tree => String(tree.value)

    case Kind.LIST:
      return tree => tree.values.map(node => GraphQLJSON.parseLiteral(node))

    case Kind.OBJECT:
      return tree => tree.fields.reduce((fields, field) => {
        fields[field.name.value] = GraphQLJSON.parseLiteral(field.value)
        return fields
      }, {})

    default:
      return null
  }
}
