/**
 * Module Dependencies
 *
 * @ignore
 */
 import {chalk, logger} from '../../lib/logger'
 import Model           from '../root'
 import r               from '../../lib/database/driver'
 import TemplateSchema  from './schemas/template'

/**
 * TemplatesController Class
 *
 * @public
 * @class TemplatesController
 */
class TemplatesController extends RootController {

  /**
   * TemplatesController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(options)
  }

  /**
   * Create new template
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var template = new TemplateModel()

    return template.create(req.body)

  }

  /**
   * Get template by id
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getById(req, res) {

    var template = new TemplateModel()

    return template.getById(req.params.id)

  }

  /**
   * Get all templates
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getAll(req, res) {

    var template = new TemplateModel()

    return template.getAll()

  }

  /**
   * Update a template
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  update(req, res) {

    var template = new TemplateModel()

    return template.update(req.params.id, req.body)

  }

}

export default TemplatesController
