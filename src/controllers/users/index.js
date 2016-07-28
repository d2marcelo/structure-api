/**
 * Module Dependencies
 *
 * @ignore
 */
import UserModel  from '../../models/user'
import RootController from '../root'

/**
 * UsersController Class
 *
 * @public
 * @class UsersController
 */
class UsersController extends RootController {

  /**
   * UsersController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(options)
  }

  /**
   * Create new user
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var user = new UserModel()

    return user.create(req.body)

  }

  /**
   * Get user by id
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getById(req, res) {

    var user = new UserModel()

    return user.getById(req.params.id)

  }

  /**
   * Get all users
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getAll(req, res) {

    var user = new UserModel()

    return user.getAll()

  }

  /**
   * Update a user
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  update(req, res) {

    var user = new UserModel()

    return user.update(req.params.id, req.body)

  }

}

export default UsersController
