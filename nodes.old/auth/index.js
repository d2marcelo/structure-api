import {chalk, logger} from '../../lib/logger'
import PasswordService from '../../services/password'
import RootNode        from '../root'
import thinky          from '../../lib/database/driver'
import TokenService    from '../../services/token'

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
    return thinky.r.db(process.env.RETHINK_DB_NAME).table('users').filter({email}).limit(1)
  }

  getByUsername(username) {
    return new Promise( async (resolve, reject) => {
      var user = await thinky.r.db(process.env.RETHINK_DB_NAME).table('users').filter({username}).limit(1)

      if(!user) return reject(user)

      resolve(user[0])
    })
  }

  login(req) {
    var pkg = req.body

    return new Promise( async (resolve, reject) => {

      var user = await this.getByUsername(pkg.username)

      if(!user) {
        RootNode.prototype.create.call(this, {
          body: {
            authenticated: false,
            err: 'NO_USER',
            username: pkg.username
          }
        })

        return reject({
          err: {
            message: 'Could not get user: ' + pkg.username,
            resource: 'AuthNode'
          }
        })
      }

      var validated = await new PasswordService().verify(pkg.password, user.hash)

      if(!validated) {
        RootNode.prototype.create.call(this, {
          body: {
            authenticated: false,
            err: 'BAD_PASSWORD',
            //password: pkg.password,
            userId: user.id,
            username: pkg.username
          }
        })
        logger.error('Auth: Bad Password')
        return reject({
          err: {
            message: 'Could not validate password',
            resource: 'AuthNode'
          }
        })

      }

      RootNode.prototype.create.call(this, {
        body: {
          authenticated: true,
          userId: user.id,
          username: user.username
        }
      })

      return resolve(user)

    })
  }

  authByFacebook(req) {
    console.error('handle args', req.body)
    return new Promise( (resolve, reject) => {

      thinky.r.db(process.env.RETHINK_DB_NAME)
        .table('users')
        .filter({
          strategies: {
            facebook: {
              id: req.body.profile.id
            }
          }
        })
        .limit(1)
        .run()
        .then( (res) => {
          console.log('handle res', res)
          resolve()
        })
        .catch( (err) => {
          console.error('handle err', err)
          reject()
        })

    })
  }

}

export default AuthNode
