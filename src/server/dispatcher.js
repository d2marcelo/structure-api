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

  constructor(options = {}) {
    this.options = options
  }

  dispatch(controller, actionName) {

    return async (req, res, next) => {
      logger.debug(`Dispatching controller: ${controller.name} & action: ${actionName}`)
      var action = controller[actionName]

      if(req.files) {
        logger.debug('files', req.files)

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
        console.error(err.stack)

        status = 403

        res.status(status).json({
          status
        })
      }

    }

  }

}

export default Dispatcher
