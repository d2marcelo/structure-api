/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import PasswordService from '../../services/password'
import r               from '../../lib/database/driver'
f
/**
 * UserModel Class
 *
 * @public
 * @class UserModel
 */
class UserModel extends Model {

  /**
   * UserModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'users',

      mapping: {
        fields: {

        }
      },
      permissions: {
        create:  ['admin'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['self', 'admin'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          }
        ]
      },
      schema: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }, options))
  }

  /**
   * Create, or save, user data for the model
   *
   * @public
   * @param {Object} pkg - Data to be saved
   * @param {Object} options - Options
   */
  create(pkg = {}, options = {}) {

    return new Promise( async (resolve, reject) => {

      pkg.hash = await new PasswordService().issue(pkg.password)
      delete pkg.password

      try {
        var doc = await Model.prototype.create.call(this, pkg, options)

        resolve(doc)
      }
      catch(e) {
        throw new Error(e)
      }

    })

  }

  /**
   * Get user by email
   *
   * @public
   * @param {String} email
   */
  getByEmail(email) {
    return r.db(process.env.RETHINK_DB_NAME).table(this.table).filter({email}).limit(1)
  }

  /**
   * Get user by username
   *
   * @public
   * @param {String} username
   */
  getByUsername(username) {
    return new Promise( async (resolve, reject) => {
      var user = await thinky.r.db(process.env.RETHINK_DB_NAME).table('users').filter({username}).limit(1)

      if(!user) return reject(user)

      resolve(user[0])
    })
  }

  update(id, pkg = {}) {

    if(pkg.password) {
      console.error('User.update does not support property password; deleted.')
      delete pkg.password
    }

    return Model.prototype.update.call(this, id, pkg)

  }

}

export default UserModel
