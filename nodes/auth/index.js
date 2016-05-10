import {chalk, logger} from '../../lib/logger'
import PasswordService from '../../services/password'
import RootNode        from '../root'
import thinky          from '../../lib/database/driver'

class AuthNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'auth',
      linkName: 'auth',
      table: 'auth',

      mapping: {
        fields: {

        }
      },
      permissions: {
        create:  ['user', 'admin'],
        delete:  ['admin'],
        read:    ['organization', 'admin'],
        replace: ['admin'],
        update:  ['admin'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'User',
            foreignKey: 'id',
            localField: 'user',
            localKey: 'userId'
          }
        ]
      },
      schema: {
        authenticatedAt: {
          type: 'date'
        }
      }
    }, options))
  }

  getByEmail(email) {
    return thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).filter({email}).limit(1)
  }

  getByUsername(username) {
    return thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).filter({username}).limit(1)
  }

  login(req) {
    var pkg = req.body

    return new Promise( async (resolve, reject) => {

      var user = await this.getByUsername({username: pkg.username})

      if(!user) {
        RootNode.prototype.create.call(this, {
          authenticated: false,
          err: 'NO_USER',
          username: pkg.username
        })

        return reject({
          message: 'Could not get user: ' + pkg.username,
          resource: 'AuthNode'
        })
      }

      var validated = await new PasswordService().verify(pkg.password, user.hash)

      if(validated) {
        RootNode.prototype.create.call(this, {
          authenticated: true,
          userId: user.id,
          username: user.username
        })

        return resolve(true)
      }

      else {
        RootNode.prototype.create.call(this, {
          authenticated: false,
          err: 'BAD_PASSWORD',
          //password: pkg.password,
          userId: user.id,
          username: pkg.username
        })

        return reject(false)
      }

    })
  }

}

export default AuthNode
