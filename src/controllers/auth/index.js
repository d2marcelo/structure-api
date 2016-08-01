/**
 * Module Dependencies
 *
 * @ignore
 */
import AuthModel      from '../../models/auth'
import RootController from '../root'

/**
 * AuthController Class
 *
 * @public
 * @class AuthController
 */
class AuthController extends RootController {

 /**
  * AuthController constructor
  *
  * @public
  * @constructor
  * @param {Object} options - Options
  */
  constructor(options = {}) {
   super(Object.assign({}, {
     name: 'auth'
   }, options))
  }

 /**
  * Login a user
  *
  * @public
  * @param {Object} req - Express req
  * @param {Object} res - Express res
  */
  login(req, res) {

    var auth = new AuthModel()

    return auth.login(req.body)

  }

}

export default AuthController
