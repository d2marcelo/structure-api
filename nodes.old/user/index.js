import {chalk, logger} from '../../lib/logger'
import RootNode        from '../root'
import PasswordService from '../../services/password'
import thinky          from '../../lib/database/driver'

class UserNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'users',
      linkName: 'user',
      table: 'users',

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

      var doc = await RootNode.prototype.create.call(this, {body: pkg})

      if(!doc.id) return reject(doc)

      resolve(doc)

    })
    .catch( (err) => {
      console.error('hello???', err)
    })

  }

  getByEmail(email) {
    return thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).filter({email}).limit(1)
  }

  getByUsername(username) {
    return thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).filter({username}).limit(1)
  }

}

export default UserNode
