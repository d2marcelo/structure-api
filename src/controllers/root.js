/**
 * RootController Class
 *
 * @public
 * @class RootController
 */
class RootController {

  /**
   * RootController constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {

    /**
     * Options
     *
     * @private
     * @type {Object}
     */
    this.options = options

    /**
     * The route name
     *
     * @private
     * @type {String}
     */
    this.name = options.name
  }

}

export default RootController
