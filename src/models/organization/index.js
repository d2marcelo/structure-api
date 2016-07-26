/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import r               from '../../lib/database/driver'

/**
 * OrganziationModel Class
 *
 * @public
 * @class OrganziationModel
 */
class OrganizationModel extends Model {

  /**
   * OrganizationModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'organizations',

      permissions: {
        create:  ['admin'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['admin'],
      },
      relations: {
        hasMany: [
          {
            Node: 'App',
            foreignKey: 'id',
            localField: 'apps',
            localKey: 'appIds'
          },
          {
            Node: 'Bucket',
            foreignKey: 'id',
            localField: 'buckts',
            localKey: 'bucketIds'
          },
          {
            Node: 'User',
            foreignKey: 'id',
            localField: 'users',
            localKey: 'userIds'
          }
        ]
      },
      schema: {
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

export default OrganizationModel
