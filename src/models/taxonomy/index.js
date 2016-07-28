/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import r               from '../../lib/database/driver'
import taxonomySchema  from './schemas/taxonomy'

/**
 * TaxonomyModel Class
 *
 * @public
 * @class TaxonomyModel
 */
class TaxonomyModel extends Model {

  /**
   * TaxonomyModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
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
      schema: taxonomySchema
    }, options))
  }

}

export default TaxonomyModel
