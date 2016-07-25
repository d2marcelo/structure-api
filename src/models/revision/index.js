import {chalk, logger} from '../../lib/logger'
import DigitalAsset    from '../digital-asset'
import Model           from '../root'
import r               from '../../lib/database/driver'

class RevisionModel extends Model {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'revisions',

      permissions: {
        create:  ['user'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['user'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'Document',
            foreignKey: 'id',
            localField: 'document',
            localKey: 'documentId'
          }
        ]
      },
      schema: {
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options))
  }

  getAll() {

    return new Promise( (resolve, reject) => {

      Model.prototype.getAll.call(this)
        .then( (revisions) => {

          var resolvedRevisions = []
          revisions.forEach( (revision) => {
            resolvedRevisions.push(this.resolveFields(revisions))
          })

          Promise.all(resolvedRevisions)
            .then( (revisions) => {
              resolve(revisions)
            })
            .catch( (err) => {
              logger.error('Error resolving revisions', err)
              reject(err)
            })
        })
        .catch( (err) => {
          logger.error('Could not get revisions', err)
        })

    })

  }

  getById(id) {

    return new Promise( async (resolve, reject) => {

      var revision = await Model.prototype.getById.call(this, id)

      if(!revision.id) {
        logger.error('Could not get revision', id)
        return reject(revisions)
      }

      this.resolveFields(revision)
        .then( (revision) => {
          resolve(revision)
        })
        .catch( (err) => {
          logger.error('Could not resolve fields for revision', err)
        })

    })

  }

  getFieldReference(ref) {
    return new Promise( (resolve, reject) => {

      r.db(process.env.RETHINK_DB_NAME).table(ref.node.replace('-', '_')).get(ref.id).run()
        .then( (res) => {
          resolve(res)
        })
        .catch( (err) => {
          console.error('Could not get field reference', err)
          reject(err)
        })

    })
  }

  getFieldReferences(field) {
    var resolvedRefs = 0

    return new Promise( (resolve, reject) => {

      if(!field.__refs) {
        return resolve(field)
      }

      field.__refs.forEach( (ref) => {
        this.getFieldReference(ref)
          .then( (res) => {

            switch(ref.node) {
              case 'digital-asset':

                var da   = new DigitalAsset(),
                    pkgd = da.pkg(res)

                Object.assign(field, {
                  body: {
                    mimetype: pkgd.mimetype,
                    src: pkgd.src
                  }
                })

                break

              /*
              TODO:
              Not quite sure what to do here
              */
              default:
                var re = Object.assign({}, res)
                delete re.id

                Object.assign(field, {
                  body: re
                })
            }

            resolvedRefs++

            if(field.__refs.length == resolvedRefs) {
              resolve(field)
            }
          })
          .catch( (err) => {
            logger.error('Could not handle field references', err)
            reject(err)
          })

      })

    })
  }

  resolveFieldReferences(field, i) {

    return new Promise( (resolve, reject) => {

      var resolvedRefs = []
      resolvedFields.push(this.getFieldReferences(field))

      Promise
        .all(resolvedFields)
        .then( (fields) => {
          resolve(fields[0])
        })
        .catch( (err) => {
          logger.error('Error fetching revision field references', err)
          reject(err)
        })

    })

  }

  resolveFields(revision) {

    return new Promise( (resolve, reject) => {

      var fieldsResolved = []

      if(revision.fields) {
        revision.fields.forEach( (field, i) => {
          fieldsResolved.push(this.resolveFieldRefences(field, i))
        })

        Promise
          .all(fieldsResolved)
          .then( (fields) => {
            Object.assign(revision, {
              fields
            })

            resolve(revision)
          })
          .catch( (err) => {
            reject(err)
          })
      }
      else {
        resolve(revision)
      }

    })

  }

}

export default RevisionModel
