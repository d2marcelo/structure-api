/**
 * Module Dependencies
 *
 * @ignore
 */
import bcrypt          from 'bcrypt'
import {chalk, logger} from '../lib/logger'

/**
 * PasswordService Class
 *
 * @public
 * @class PasswordService
 */
class PasswordService {

  constructor(options = {}) {
    this.options = options
  }

  issue(s) {

    return new Promise( (resolve, reject) => {

      if(typeof s != 'string') return reject({
        message: 'Password must be a string',
        resource: 'PasswordService'
      })

      bcrypt.genSalt(
        parseInt(this.options.genSalt) ||
        parseInt(process.env.SALT_FACTOR) ||
        10,
      function PasswordService_genSaltCallback(err, salt) {
        if(err) {
          logger.error('Could not generate salt', err)
          return reject(err)
        }

        bcrypt.hash(s, salt, function PasswordService_hashCallback(err, hash) {
          if(err) {
            logger.error('Could not generate hash', err)
            return reject(err)
          }

          resolve(hash)
        })

      })

    })

  }

  verify(s, hash) {

    return new Promise( (resolve, reject) => {

      bcrypt.compare(s, hash, function PasswordService_compareCallback(err, match) {

        if(err) {
          logger.error('Could not verify password', err)
          logger.debug('Password', s)
          logger.debug('Hash', hash)
          return reject(false)
        }

        if(!match) return reject(false)

        return resolve(true)

      })

    })

  }

}

export default PasswordService
