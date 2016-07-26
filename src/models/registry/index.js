/**
 * Module Dependencies
 *
 * @ignore
 */
import {chalk, logger} from '../../lib/logger'
import registry        from '../../lib/registry'
import Model           from '../root'
import r               from '../../lib/database/driver'

/**
 * RegistryModel Class
 *
 * @public
 * @class RegistryModel
 */
class RegistryModel extends Model {

  /**
   * RegistryModel constructor
   *
   * @public
   * @constructor
   * @param {Object} options - Options
   */
  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'registry',

      permissions: {
        create:  ['admin'],
        delete:  ['admin'],
        read:    ['organization'],
        replace: ['admin'],
        update:  ['admin'],
      },
      relations: {
        belongsTo: [
          {
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          },
        ],
        hasMany: [
          {
            Node: 'Plugin',
            foreignKey: 'id',
            localField: 'plugins',
            localKey: 'pluginIds'
          },
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

  /**
   * Create, or save, a registry item
   *
   * @public
   * @param {Object} pkg - The data to save for the registry item
   */
  create(pkg = {}) {

    return new Promise( (resolve, reject) => {



    })
  }

  /**
   * Get all registry items
   *
   * @public
   */
  getAll() {

    return new Promise( async (resolve, reject) => {

      var items = await Model.prototype.getAll.call(this)
      items = items.concat(registry.items)

      var pkg = {
        adaptors: [],
        fields: [],
        plugins: []
      }

      items.forEach( (item) => {
        switch(item.type) {
          case 'adaptor':
            pkg.adaptors.push(item)
            break
          case 'field':
            pkg.fields.push(item)
            break
          case 'plugin':
            pkg.plugins.push(item)
            break
        }
      })

      resolve(pkg)

    })

  }

  /**
   * Get registry setting by name
   *
   * @public
   * @param {Object} pkg - The data holding the name
   */
  getSettingsByName(pkg = {}) {

    return new Promise( (resolve, reject) => {

      try {
        var pluginSettings = require(pkg.name).default.settings
        resolve(pluginSettings)
      }
      catch(e) {
        reject(e)
      }

    })

  }

}

export default RegistryModel
