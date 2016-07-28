/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import loginSchema     from './schemas/login'
import Model           from '../root'
import PasswordService from '../../services/password'
import r               from '../../lib/database/driver'
import TokenService    from '../../services/token'
import UserModel       from '../user'

/**
 * AuthModel Class
 *
 * @public
 * @class AuthModel
 */
class AuthModel extends Model {

  /**
   * AuthModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'auth',

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
      }
    }, options))
  }

  /**
   * Login user
   *
   * @public
   * @param {Object} pkg - Login data
   */
  login(pkg = {}) {

    return new Promise( async (resolve, reject) => {

      var isValidPkg = loginSchema.validate(pkg)

      if(isValidPkg.err) {
        Model.prototype.create.call(this, {
          body: {
            authenticated: false,
            err: 'BAD_USER_PKG',
            username: pkg.username
          }
        }, {table: 'actions'})

        return reject({
          err: {
            message: 'Could not validate user pkg: ' + pkg.username,
            resource: 'AuthModel'
          }
        })
      }

      var user = await UserModel.prototype.getByUsername(pkg.username)

      if(!user) {
        Model.prototype.create.call(this, {
          body: {
            authenticated: false,
            err: 'NO_USER',
            username: pkg.username
          }
        }, {table: 'actions'})

        return reject({
          err: {
            message: 'Could not get user: ' + pkg.username,
            resource: 'AuthModel'
          }
        })
      }

      try {
        var validated = await new PasswordService().verify(pkg.password, user.hash)
      }
      catch(e) {
        Model.prototype.create.call(this, {
          authenticated: false,
          err: 'BAD_PASSWORD',
          //password: pkg.password,
          userId: user.id,
          username: pkg.username
        }, {table: 'actions'})

        logger.info('Auth: Bad Password')

        return reject({
          err: {
            message: 'Could not validate password',
            resource: 'AuthModel'
          }
        })
      }

      Model.prototype.create.call(this, {
        authenticated: true,
        userId: user.id,
        username: user.username
      }, {table: 'actions'})

      return resolve(user)

    })
  }

  /**
   * Logout user
   *
   * @public
   * @param {Object} pkg - Logout data
   */
  logout(pkg = {}) {

    return Model.prototype.create.call(this, {
      unauthenticated: true,
      userId: pkg.id,
      username: pkg.username
    }, {table: 'actions'})

  }

  /**
   * Facebook authentication
   *
   * @public
   * @param {Object} pkg - Login data
   * @todo Needs work
   */
  authByFacebook(pkg) {
    console.error('handle args', pkg)
    return new Promise( (resolve, reject) => {

      r.db(process.env.RETHINK_DB_NAME)
        .table('users')
        .filter({
          strategies: {
            facebook: {
              id: pkg.profile.id
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

export default AuthModel
