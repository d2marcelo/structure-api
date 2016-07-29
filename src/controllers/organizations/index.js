/**
 * Module Dependencies
 *
 * @ignore
 */
import OrganizationModel from '../../models/organization'
import RootController    from '../root'

/**
 * OrganizationsController Class
 *
 * @public
 * @class OrganizationsController
 */
class OrganizationsController extends RootController {

  /**
   * OrganizationsController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'organizations'
    }, options))
  }

  /**
   * Create new organization
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var organization = new OrganizationModel()

    return organization.create(req.body)

  }

  /**
   * Get an organization by id
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getById(req, res) {

    var organization = new OrganizationModel()

    return organization.getById(req.params.id)

  }

  /**
   * Get all organization
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getAll(req, res) {

    var organization = new OrganizationModel()

    return organization.getAll()

  }

  /**
   * Update an organization
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  update(req, res) {

    var organization = new OrganizationModel()

    return organization.update(req.params.id, req.body)

  }

}

export default OrganizationsController
