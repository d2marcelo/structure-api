/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../lib/logger'
import EventEmitter    from '../lib/eventemitter'
import mixin           from '../lib/mixin'
import ShortId         from '../services/short-id'
import r               from '../lib/database/driver'
import uuid            from '../lib/utils/uuid'

/**
 * RootModel Class
 *
 * @public
 * @class RootModel
 */
class RootModel {

  /**
   * RootModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {

    /**
     * Default parameters
     *
     * @private
     * @type {Object}
     */
    this.defaults = {}

    /**
     * Default read/write permissions for model.
     *
     * @private
     * @type {Object}
     */
    this.permissions = {
      create:  ['admin'],
      delete:  ['admin'],
      read:    ['public'],
      replace: ['admin'],
      update:  ['admin'],
    }

    /**
     * Assign options to this
     *
     * @private
     * @type {Object}
     */
    Object.assign(this, options)
    if(!this.name) {
      throw new Error('model.name must be defined')
    }

    /**
     * Name of the default table the model works with.
     *
     * @private
     * @type {String}
     */
    if(!this.table) this.table = this.name.replace(/\-/g, '_')

    /**
     * (optional) Table schema
     *
     * @private
     * @type {Object}
     */
    var schema = {}

  }

  /**
   * Create, or save, data for the model
   *
   * @public
   * @param {Object} pkg - Data to be saved
   * @param {Object} options - Options
   */
  create(pkg = {}, options = {}) {

    return new Promise( async (resolve, reject) => {

      //If the model has a schema, validate it
      var schema = options.schema || this.schema

      if(schema) {

        var validation = this.validate(pkg, schema)

        if(validation.err) {
          logger.debug('Create validation error')
          logger.debug(validation.err)
          return reject(validation.err)
        }

        delete options.schema

      }

      var insertOptions = {
        returnChanges: options.returnChanges || true
      }

      pkg.createdAt  = r.now()
      pkg.id         = pkg.id || uuid()
      pkg.sid        = new ShortId().issue(pkg.id)
      pkg.updatedAt  = r.now()
      pkg.__version  = process.env.npm_package_version

      try {

        var res = await r.table(options.table || this.table).insert(pkg, insertOptions)
        if(res.errors && res.errors > 0) {
          return reject(res.first_error)
        }

        var doc = res.changes[0].new_val

        //logger.debug('Document created', doc)
        if(pkg.__refs && pkg.__refs.length > 0) {

          var refs = []
          pkg.__refs.forEach( (ref) => {
            refs.push(this.referenceTo('belongsTo', doc.id, ref))
          })

          return Promise
            .all(refs)
            .then( () => {
              resolve(doc)
            })
            .catch(reject)
        }

        else {
          return resolve(doc)
        }
      }
      catch(err) {
        logger.error('Could not create')
        console.error(err)
        reject(err)
      }

    })
  }

  /**
   * Delete by id
   *
   * @public
   * @param {String} id
   */
  delete(id) {
    return Promise.resolve()
  }

  /**
   * Get model by id
   *
   * @public
   * @param {String} id
   */
  getById(id) {

    // Short ID
    if(id.length <= 10) {

      return new Promise( async (resolve, reject) => {

        try {
          var doc = await r.table(this.table).filter({sid: id}).limit(1)
          return resolve(this.getById(doc[0].id))
        }
        catch(err) {
          logger.error('Could not get by id')
          console.error(err.stack)
          throw err
        }

      })
    }

    // Long ID
    else {
      return r.table(this.table).get(id)
    }

  }

  /**
   * Get all from table
   *
   * @public
   * @todo Add logic to limit, paginate, etc.
   */
  getAll() {
    return r.table(this.table).orderBy(r.desc('updatedAt')).limit(10)
  }

  /**
   * Get model relationships
   *
   * @private
   * @param {String} Relationship type
   */
  getRelations(type) {
    var relations = []

    Object.keys(this.relations).forEach( (relation) => {

      if(relation == type) {
        relations = this.relations[relation]
      }

    })

    return relations
  }

  /**
   * Create, or save, data for the model
   *
   * @private
   * @param {String} Relationship type
   * @param {String} id
   * @param {Object} Reference object
   */
  referenceTo(type, id, reference) {

    return new Promise( (resolve, reject) => {
      var inserts = []

      Object.keys(reference).forEach( async (key) => {
        var referencePkg = {}
        referencePkg[`${this.name}Id`] = id // local key
        referencePkg[key] = reference[key]  // foreign key

        switch(type) {
          case 'belongsTo':
            //referencePkg.name = `${key.replace('Id', '')}_has_${this.name}`
            referencePkg.type = 'belongsTo'

            break
        }

        referencePkg.node = this.name

        inserts.push(this.insertReference(referencePkg))
      })

      Promise
        .all(inserts)
        .then(resolve)
        .catch(reject)

    })

  }

  /**
   * Insert model reference to table 'refs'
   *
   * @private
   * @param {Object} Reference to be saved
   */
  insertReference(pkg = {}) {
    return r.table('refs').insert(pkg)
  }

  /**
   * Update a model
   *
   * @public
   * @param {String} id
   * @param {Object} pkg - Data to be saved
   * @param {Object} options - Options
   */
  update(id, pkg = {}, options = {}) {

    options.returnChanges = options.returnChanges || true

    return new Promise( async (resolve, reject) => {

      //If the model has a schema, validate it
      var schema = options.schema || this.schema

      if(schema) {

        var validation = this.validate(pkg, schema)

        if(validation.err) {
          logger.debug('Update validation error')
          logger.debug(validation.err)
          return reject(validation.err)
        }

        delete options.schema

      }

      pkg.__version  = process.env.npm_package_version

      try {
        var res = await r.table(this.table).get(id).update(pkg, options)

        return resolve(res.changes[0].new_val)
      }
      catch(err) {
        logger.error('Error updating')
        console.error(err.stack)
        reject(err)
      }

    })
  }

  /**
   * Validate data
   *
   * @public
   * @param {Object} pkg - What is being validated
   * @param {Object} schema - The schema to validate against pkg
   * @param {Object} options - Options
   */
  validate(pkg, schema, options = {}) {
    schema = schema || this.schema

    if(!schema) throw new Error('Validate requires a schema')

    return schema.validate(pkg)

  }

}

/**
 * Mixin EventEmitter.prototype properties onto RootModel.prototype
 *
 * @ignore
 */
mixin(RootModel, EventEmitter)

export default RootModel
