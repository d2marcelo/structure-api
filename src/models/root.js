import {chalk, logger} from '../lib/logger'
import EventEmitter    from '../lib/eventemitter'
import mixin           from '../lib/mixin'
import ShortId         from '../services/short-id'
import r               from '../lib/database/driver'
import uuid            from '../lib/utils/uuid'

class RootModel {

  constructor(options = {}) {
    this.defaults = {}

    this.permissions = {
      create:  ['admin'],
      delete:  ['admin'],
      read:    ['public'],
      replace: ['admin'],
      update:  ['admin'],
    }

    Object.assign(this, options)
    if(!this.name) {
      throw new Error('model.name must be defined')
    }
    if(!this.table) this.table = this.name.replace(/\-/g, '_')

    var schema = {}
    if(this.schema) {

    }

  }

  create(pkg = {}, options = {}) {

    var insertOptions = {
      returnChanges: options.returnChanges || true
    }

    pkg.createdAt  = r.now()
    pkg.id         = pkg.id || uuid()
    pkg.sid        = new ShortId().issue(pkg.id)
    pkg.updatedAt  = r.now()
    pkg.__version  = process.env.npm_package_version

    return new Promise( async (resolve, reject) => {

      try {

        var res = await r.table(options.table || this.table).insert(pkg, insertOptions)
        if(res.errors && res.errors > 0) {
          throw new Error(res.first_error)
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
        throw err
      }

    })
  }

  delete(id) {
    return Promise.resolve()
  }

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

  /*
  TODO: need more pagination logic
  */
  getAll() {
    return r.table(this.table).orderBy(r.desc('updatedAt')).limit(10)
  }

  getRelations(type) {
    var relations = []

    Object.keys(this.relations).forEach( (relation) => {

      if(relation == type) {
        relations = this.relations[relation]
      }

    })

    return relations
  }

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

  insertReference(pkg = {}) {
    return r.table('refs').insert(pkg)
  }

  update(id, pkg = {}, options = {}) {

    pkg.__version  = process.env.npm_package_version

    options.returnChanges = options.returnChanges || true

    return new Promise( async (resolve, reject) => {

      try {
        var res = await r.table(this.table).get(id).update(pkg, options)

        return resolve(res.changes[0].new_val)
      }
      catch(err) {
        logger.error('Error updating')
        console.error(err.stack)
        throw err
      }

    })
  }

}

mixin(RootModel, EventEmitter)

export default RootModel
