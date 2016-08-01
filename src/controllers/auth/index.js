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
    super(options)
  }

  login(req, res) {

    var auth = new AuthModel()

    return auth.login(req.body)

  }

}

export default AuthController
