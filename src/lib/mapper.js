import {chalk, logger} from './logger'

class Mapper {

  constructor(Nodes) {
    this.Nodes = Nodes
  }

  relations() {

    this.Nodes.forEach( (Node) => {
      var node = new Node()

      Object.keys(this.relations).forEach( (relation) => {

        Object.keys(relation).forEach( (key) => {
          var options  = relation[key]

          options.forEach( (option) => {
            var Node = require(`../${option.Node}`).default

            switch(key) {
              case 'belongsTo':

                try {
                  this.Model.belongsTo(Node, option.localField, option.localKey, option.foreignKey || this.defaults.fields.foreignKey)
                }
                catch(e) {
                  logger.error('Relationship failed: belongsTo', e)
                }

                break

              case 'hasAndBelongsToMany':

                try {
                  this.Model.hasAndBelongsToMany(Node, option.localField, option.localKey, option.foreignKey || this.defaults.fields.foreignKey)
                }
                catch(e) {
                  logger.error('Relationship failed: hasAndBelongsToMany', e)
                }

                break

              case 'hasMany':

                try {
                  this.Model.hasMany(Node, option.localField, option.localKey, option.foreignKey || this.defaults.fields.foreignKey)
                }
                catch(e) {
                  logger.error('Relationship failed: hasMany', e)
                }

                break

              case 'hasOne':

                try {
                  this.Model.hasOne(Node, option.localField, option.localKey, option.foreignKey || this.defaults.fields.foreignKey)
                }
                catch(e) {
                  logger.error('Relationship failed: hasOne', e)
                }

                break
            }

          })

        })

      })
    })

  }

}

export default Mapper
