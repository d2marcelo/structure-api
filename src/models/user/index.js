import {chalk, logger} from '../../lib/logger'
import Model           from '../root'
import PasswordService from '../../services/password'
import r               from '../../lib/database/driver'

class UserModel extends Model {

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
        email: {
          type: 'string'
        },
        username: {
          type: 'string'
        }
      }
    }, options))
  }

  create(pkg = {}) {

    return new Promise( async (resolve, reject) => {

      pkg.hash = await new PasswordService().issue(pkg.password)
      delete pkg.password

      try {
        var doc = await Model.prototype.create.call(this, pkg)

        resolve(doc)
      }
      catch(e) {
        throw new Error(e)
      }

    })

  }

  getByEmail(email) {
    return r.db(process.env.RETHINK_DB_NAME).table(this.table).filter({email}).limit(1)
  }

  getByUsername(username) {
    return new Promise( async (resolve, reject) => {
      var user = await thinky.r.db(process.env.RETHINK_DB_NAME).table('users').filter({username}).limit(1)

      if(!user) return reject(user)

      resolve(user[0])
    })
  }

}

export default UserModel
