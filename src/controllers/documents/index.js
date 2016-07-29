/**
 * Module Dependencies
 *
 * @ignore
 */
import DocumentModel  from '../../models/document'
import RootController from '../root'

/**
 * DocumentsController Class
 *
 * @public
 * @class DocumentsController
 */
class DocumentsController extends RootController {

  /**
   * DocumentsController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(options)
  }

  /**
   * Create new document
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  create(req, res) {

    var document = new DocumentModel()

    return document.create(req.body)

  }

  /**
   * Get document by id
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getById(req, res) {

    var document = new DocumentModel()

    return document.getById(req.params.id)

  }

  /**
   * Get all documents
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  getAll(req, res) {

    var document = new DocumentModel()

    return document.getAll()

  }

  /**
   * Update a document
   *
   * @public
   * @param {Object} req - Express req
   * @param {Object} res - Express res
   */
  update(req, res) {

    var document = new DocumentModel()

    return document.update(req.params.id, req.body)

  }


}

export default DocumentsController
