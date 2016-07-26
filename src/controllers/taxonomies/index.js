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
   * @constructor
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var taxonomy = new TaxonomyModel()

    return taxonomy.create(req.body)

  }

}

export default TaxonomiesController
