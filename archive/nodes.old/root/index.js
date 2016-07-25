import {chalk, logger} from '../../lib/logger'
import ObjectMap       from '../../lib/utils/object/map'
import ShortId         from '../../services/short-id'
import thinky          from '../../lib/database/driver'
import uuid            from '../../lib/utils/uuid'

class RootNode {

  constructor(options = {}) {
    this.defaults = {
      fields: {
        foreignKey: 'id'
      }
    }

    this.permissions = {
      create:  ['admin'],
      delete:  ['admin'],
      read:    ['public'],
      replace: ['admin'],
      update:  ['admin'],
    }

    Object.assign(this, options)

    /*
    Map to Thinky Schema requirements
    */
    var schema = {}
    if(this.schema) {
      Object.keys(this.schema).forEach( (key) => {
        switch(this.schema[key].type) {
          case 'date':

            schema[key] = Date

            break

          case 'object':

            schema[key] = Object

            break

          case 'string':

            schema[key] = String

            break

          default:
            //console.error('what is o', o)
        }
      })
    }

    var name = this.entityName

    if(name) {
      name = name.replace('-', '_')

      if(!thinky.models[name]) {
        this.Model = thinky.createModel(name, schema, {init: false})
      }

      else {
        this.Model = thinky.models[name]
      }
    }

  }

  create(req) {
    var pkg = req.body

    pkg.createdAt = thinky.r.now()
    pkg.updatedAt  = thinky.r.now()
    pkg.id  = uuid()
    pkg.sid = new ShortId().issue(pkg.id)

    return new Promise( async (resolve, reject) => {

      this.Model
        .save(pkg)
        .then( (doc) => {
          logger.debug('Document created', doc)
          if(pkg.__refs && pkg.__refs.length > 0) {

            var links = []
            pkg.__refs.forEach( (link) => {
              links.push(this.linkTo('belongsTo', doc.id, link))
            })

            return Promise
              .all(links)
              .then( () => {
                resolve(doc)
              })
              .catch(reject)
          }

          else {
            return resolve(doc)
          }
        })
        .catch((err) => {
          logger.error('Could not create', err)
          return reject(err)
        })

    })
  }

  delete(req) {
    var id = req.params.id

    return Promise.resolve()
  }

  fields() {
    return {
      mutation: {},
      query: {}
    }
  }

  getById(req) {
    var id = (typeof req == 'string') ? req : req.params.id

    // Short ID
    if(id.length <= 10) {

      return new Promise( (resolve, reject) => {

        thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).filter({sid: id}).limit(1).run()
          /*
          This is so that it's possible to use thinky methods after getting
          */
          .then( async (res) => {
            var res2 = await this.Model.get(res[0].id)
            resolve(res2)
          })
          .catch(reject)

      })
    }

    // Long ID
    else {
      return this.Model.get(id)
    }

  }

  /*
  TODO: need more pagination logic
  */
  getAll(req) {
    return thinky.r.db(process.env.RETHINK_DB_NAME).table(this.Model.getTableName()).orderBy(thinky.r.desc('updatedAt')).limit(10)
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

  linkTo(type, id, link) {

    return new Promise( (resolve, reject) => {
      var inserts = []
      Object.keys(link).forEach( async (key) => {
        var linkPkg = {}
        linkPkg[`${this.linkName}Id`] = id // local key
        linkPkg[key] = link[key]           // foreign key

        switch(type) {
          case 'belongsTo':
            linkPkg.name = `${key.replace('Id', '')}_has_${this.linkName}`
            linkPkg.type = 'belongsTo'

            break
        }

        linkPkg.node = this.linkName

        inserts.push(this.linkInsert(linkPkg))
      })

      Promise
        .all(inserts)
        .then(resolve)
        .catch(reject)

    })

  }

  linkInsert(pkg = {}) {

    return thinky.r.db(process.env.RETHINK_DB_NAME).table('links').insert(pkg)

  }

  update(req) {
    var id = req.params.id,
        options = {},
        pkg = req.body

    options.conflict = options.conflict || 'update'

    return new Promise( (resolve, reject) => {

      this.getById(req).then( (doc) => {

        /*
        TODO: this is dangerous - should figure out a safer way
        */
        Object.assign(doc, pkg)

        doc
          .save()
          /*.then((doc) => {console.error('updated doc', doc)})
          .catch( (err) => {
            console.error('Could not update doc', err)
          })*/
        resolve(doc)
      })
      .catch( (err) => {
        logger.error('Error updating', err)
        reject(err)
      })

    })
  }

}

export default RootNode
