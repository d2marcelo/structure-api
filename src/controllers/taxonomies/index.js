/**
 * Module Dependencies
 *
 * @ignore
 */
import TaxonomyModel  from '../../models/taxonomy'
import RootController from '../root'

/**
 * TaxonomiesController Class
 *
 * @public
 * @class TaxonomiesController
 */
class TaxonomiesController extends RootController {

  /**
   * TaxonomiesController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(options)
  }

  /**
   * Create new taxonomy
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var taxonomy = new TaxonomyModel()

    return taxonomy.create(req.body)

  }

  /**
   * Get taxonomy by id
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getById(req, res) {

  }

  /**
   * Get all taxonomies
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getAll(req, res) {

  }

  /**
   * Update a taxonomy
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  update(req, res) {

    var taxonomy = new TaxonomyModel()

    return taxonomy.update(req.params.id, req.body)

  }

}

export default TaxonomiesController
