import {chalk, logger} from '../../lib/logger'
import fs              from 'fs'
import Model           from '../root'
import request         from 'superagent'
import r               from '../../lib/database/driver'

class DigitalAssetModel extends Model {

  constructor(options = {}) {
    super(Object.assign({}, {
      name: 'digital-assets',

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
            Node: 'Organization',
            foreignKey: 'id',
            localField: 'organization',
            localKey: 'organizationId'
          }
        ],
        hasMany: [
          {
            Node: 'Taxonomy',
            foreignKey: 'id',
            localField: 'taxonomys',
            localKey: 'taxonomysId'
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
    var pkg = req.body

    return new Promise( (resolve, reject) => {

      var createFilesPromises = []

      pkg.files.forEach( (file) => {
        var insert = {
          diskFileName: file.diskFileName,
          mimetype: file.mimetype,
          originalFileName: file.originalFileName,
          originalSize: file.size,
          storageAdaptor: file.storageAdaptor
        }

        createFilesPromises.push(Model.prototype.create.call(this, {body: insert}))
      })

      Promise.all(createFilesPromises)
        .then( (values) => {
          //console.error('create values', values)
          values = this.pkgAll(values)
          resolve(values)
        })
        .catch( (err) => reject(err))

    })

  }

  embedScript(type) {

    switch(type) {

      case 'imgur':
        return `<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>`

      case 'instagram':
        return `<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>`

      case 'pinterest':
        return `<script async defer src="//assets.pinterest.com/js/pinit.js"></script>`

      case 'reddit':
        return `<script async src=\"https://www.redditstatic.com/comment-embed.js\"></script>`

      case 'twitter':
        return `<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>`

      case 'tumblr':
        return `<script async src=\"https://secure.assets.tumblr.com/post.js\"></script>`

      default:
        return ''

    }

  }

  fetchEmbed(req) {
    var type = req.params.type,
        url  = ''

    return new Promise( (resolve, reject) => {

      switch(type) {

        case 'aol':
          url = `http://api.embed.ly/1/oembed?url=${req.params.url}`
          break

        case 'dailymotion':
          url = `http://www.dailymotion.com/services/oembed?url=${req.params.url}`
          break

        case 'deviantart':
          url = `http://backend.deviantart.com/oembed?url=${req.params.url}`
          break

        case 'flickr':
          url = `http://www.flickr.com/services/oembed/?url=${req.params.url}`
          break

        case 'funnyordie':
          url = `http://www.funnyordie.com/oembed.json?url=${req.params.url}`
          break

        case 'getty':
          url = ` http://embed.gettyimages.com/oembed?url=${req.params.url}`
          break

        case 'gfycat':
          url = `https://api.gfycat.com/v1/oembed?url=${req.params.url}`
          break

        case 'hulu':
          url = `http://www.hulu.com/api/oembed.xml?url=${req.params.url}`
          break

        case 'ifttt':
          url = `https://ifttt.com/oembed?url=${req.params.url}`
          break

        case 'imgur':
          url = `http://api.imgur.com/oembed?url=${req.params.url}`
          break

        case 'instagram':
          url = `https://api.instagram.com/oembed?url=${req.params.url}`
          break

        case 'kickstarter':
          url = `http://www.kickstarter.com/services/oembed?url=${req.params.url}`
          break

        case 'meetup':
          url = `https://api.meetup.com/oembed?format=json&url=${req.params.url}`
          break

        case 'newyorktimes':
          url = `https://www.nytimes.com/svc/oembed/html/?url=${req.params.url}`
          break

        case 'pinterest':
          return resolve({
            html: `<a data-pin-do="embedPin" data-pin-width="${(req.body.size || 'small')}" href="${req.params.url}"></a>`,
            pinSize: req.body.size || 'small',
            script: this.embedScript(req.params.type)
          })

        case 'soundcloud':
          url = `https://soundcloud.com/oembed?url=${req.params.url}`
          break

        case 'reddit':
          url = `https://www.reddit.com/oembed?url=${req.params.url}`
          break

        case 'twitter':
          url = `https://api.twitter.com/1/statuses/oembed.json?url=${req.params.url}`
          break

        case 'tumblr':
          url = `http://www.tumblr.com/oembed/1.0?url=${req.params.url}`
          break

        case 'ustream':
          url = `http://www.ustream.tv/oembed?url=${req.params.url}`
          break

        case 'vimeo':
          url = `https://vimeo.com/api/oembed.json?url=${req.params.url}`
          break

        case 'vine':
          url = `https://vine.co/oembed.json?url=${req.params.url}`
          break

        case 'youtube':
          url = `https://www.youtube.com/oembed?url=${req.params.url}?v=${req.params.v}&format=json`
          break

        default:
          return Promise.reject()
      }

      request
        .get(url)
        .end( (err, res) => {

          if(err) {
            logger.error('There was an error fetching the embed')
            console.error(err)
            return reject(err)
          }

          return resolve(Object.assign(res.body, {
            script: this.embedScript(type)
          }))

        })

    })

  }

  getAll(req) {
    return new Promise( (resolve, reject) => {

      Model.prototype.getAll.call(this)
        .then( (values) => {
          values = this.pkgAll(values)

          resolve(values)
        })
        .catch((err) => {
          reject(err)
        })

    })
  }

  pkg(value) {

    value.src = {
      url: `http://${process.env.HOST}/api/v0.1/${this.entityName}/${value.sid}/view`
    }

    return value

  }

  pkgAll(values) {
    values = values.map(this.pkg.bind(this))

    return values
  }

  view(req, res) {

    var id = req.params.id

    /*
    TODO:
    This is the disk adapter - need to account for each adaptor
    */
    this.getById(id)
      .then( (doc) => {
        const filePath = `/tmp/uploads/${doc.diskFileName}`

        res.sendFile(filePath)
      })
      .catch((err) => {
        logger.error('Could not find asset', err)
      })

  }

}

export default DigitalAssetModel
