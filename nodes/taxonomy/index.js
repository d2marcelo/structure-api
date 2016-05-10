import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'

class TaxonomyNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'taxonomies',
      linkName: 'taxonomy',
      table: 'taxonomies',

      mapping: {
        fields: {

        }
      },
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
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          },
          {
            Node: 'Taxonomy',
            foreignKey: 'id',
            localField: 'taxonomy',
            localKey: 'taxonomyId'
          },
        ],
        hasMany: [
          {
            Node: 'Taxonomy',
            foreignKey: 'id',
            localField: 'taxonomys',
            localKey: 'taxonomysId'
          },
        ]
      },
      schema: {
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

}

export default TaxonomyNode
