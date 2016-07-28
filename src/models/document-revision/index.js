/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger}        from '../../lib/logger'
import DigitalAsset           from '../digital-asset'
import documentrevisionSchema from './schemas/document-revision'
import Model                  from '../root'
import r                      from '../../lib/database/driver'
import RevisionModel          from '../revision'

/**
 * DocumentRevisionModel Class
 *
 * @public
 * @class DocumentRevisionModel
 */
class DocumentRevisionModel extends RevisionModel {

  /**
   * DocumentRevisionModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'document-revisions',

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
      schema: documentrevisionSchema
    }, options))
  }

}

export default DocumentRevisionModel
