/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../lib/logger'

/**
 * Dispatcher Class
 *
 * @public
 * @class Dispatcher
 */
class Dispatcher {

  /**
   * Server constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    this.options = options
  }

  /**
   * Dispatch a route to controller action
   *
   * @public
   * @param {Object} controller - Controller
   * @param {String} actionName - The name of the controller method, or action, to call
   */
  dispatch(controller, actionName) {

    return async (req, res, next) => {
      logger.debug(`Dispatching controller: ${controller.name} & action: ${actionName}`)
      var action = controller[actionName]

      if(req.files) {
        logger.debug('File upload detected:', req.files)

        req.files = req.files.map( (file) => {
          file.diskFileName     = file.filename
          file.originalFileName = file.originalname.replace(/ /g, '_')
          file.storageAdaptor   = storageAdaptors.disk.name

          return file
        })
      }

      var pkg    = {},
          status = 200

      try {
        var result = await action.call(controller, req, res)

        if(req.method == 'PUT') status = 201

        // return collection name
        if(actionName == 'getAll') {
          pkg[controller.name] = result
        }
        // return item
        else {
          pkg = result
        }
        logger.debug(`${actionName}`, pkg)
        res.status(status).json({
          pkg,
          status
        })
      }
      catch(err) {
        logger.error(`Action ${actionName} failed`)
        if(err.stack) {
          console.error(err.message)
          console.error(err.stack)
        }
        else {
          console.error(err)
        }

        status = 403

        res.status(status).json({
          status
        })
      }

    }

  }

}

export default Dispatcher
