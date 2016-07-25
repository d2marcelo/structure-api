import {chalk, logger} from '../../lib/logger'
import registry        from '../../lib/registry'
import Model           from '../root'
import r               from '../../lib/database/driver'

class RegistryModel extends Model {

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

  create(req) {
    return new Promise( (resolve, reject) => {



    })
  }

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

  getSettingsByName(req) {

    return new Promise( (resolve, reject) => {

      try {
        var pluginSettings = require(req.params.name).default.settings
        resolve(pluginSettings)
      }
      catch(e) {
        reject(e)
      }

    })

  }

}

export default RegistryModel
