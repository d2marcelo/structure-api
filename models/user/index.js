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

  create(req) {
    var pkg = req.body

    return new Promise( async (resolve, reject) => {

      pkg.hash = await new PasswordService().issue(pkg.password)
      delete pkg.password

      var doc = await Model.prototype.create.call(this, {body: pkg})

      if(!doc.id) return reject(doc)

      resolve(doc)

    })
    .catch( (err) => {
      console.error('hello???', err)
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
