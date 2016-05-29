import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import r               from '../../lib/database/driver'

class TaxonomyModel extends Model {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'taxonomies',

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

export default TaxonomyModel
