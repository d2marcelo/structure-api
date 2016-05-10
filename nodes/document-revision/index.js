import {chalk, logger} from '../../lib/logger'
import DigitalAsset    from '../digital-asset'
import RootNode        from '../root'
import thinky          from '../../lib/database/driver'

class DocumentRevisionNode extends RootNode {

  constructor(options = {}) {
    super(Object.assign({}, {
      entityName: 'document-revisions',
      linkName: 'document-revision',
      table: 'document_revisions',

      mapping: {
        fields: {

        }
      },
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

  getAll(req) {

    return new Promise( (resolve, reject) => {

      RootNode.prototype.getAll.call(this)
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

  getById(req) {
    var id = (typeof req == 'string') ? req : req.params.id

    return new Promise( async (resolve, reject) => {

      var revision = await RootNode.prototype.getById.call(this, id)

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

  getFieldLink(link) {
    return new Promise( (resolve, reject) => {

      /*
      TODO:
      Figure out how to get node entity name here
      */
      thinky.r.db(process.env.RETHINK_DB_NAME).table(link.node.replace('-', '_') + 's').get(link.id).run()
        .then( (res) => {
          resolve(res)
        })
        .catch( (err) => {
          console.error('Could not get field link', err)
          reject(err)
        })

    })
  }

  getFieldLinks(field) {
    var resolvedLinks = 0

    return new Promise( (resolve, reject) => {

      if(!field.__links) {
        return resolve(field)
      }

      field.__links.forEach( (link) => {
        this.getFieldLink(link)
          .then( (res) => {

            switch(link.node) {
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

            resolvedLinks++

            if(field.__links.length == resolvedLinks) {
              resolve(field)
            }
          })
          .catch( (err) => {
            logger.error('Could not handle field link', err)
            reject(err)
          })

      })

    })
  }

  resolveFieldLinks(field, i) {

    return new Promise( (resolve, reject) => {

      var resolvedFields = []
      resolvedFields.push(this.getFieldLinks(field))

      Promise
        .all(resolvedFields)
        .then( (fields) => {
          resolve(fields[0])
        })
        .catch( (err) => {
          logger.error('Error fetching revision field links', err)
          reject(err)
        })

    })

  }

  resolveFields(revision) {

    return new Promise( (resolve, reject) => {

      var fieldsResolved = []
      if(revision.fields) {
        revision.fields.forEach( (field, i) => {
          fieldsResolved.push(this.resolveFieldLinks(field, i))
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

export default DocumentRevisionNode
