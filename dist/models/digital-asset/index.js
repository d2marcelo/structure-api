'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _logger = require('../../lib/logger');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DigitalAssetModel = function (_Model) {
  (0, _inherits3.default)(DigitalAssetModel, _Model);

  function DigitalAssetModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, DigitalAssetModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DigitalAssetModel).call(this, (0, _assign2.default)({}, {
      name: 'digital-assets',

      permissions: {
        create: ['user'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['user']
      },
      relations: {
        belongsTo: [{
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }],
        hasMany: [{
          Node: 'Taxonomy',
          foreignKey: 'id',
          localField: 'taxonomys',
          localKey: 'taxonomysId'
        }]
      },
      schema: {
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(DigitalAssetModel, [{
    key: 'create',
    value: function create(req) {
      var _this2 = this;

      var pkg = req.body;

      return new _promise2.default(function (resolve, reject) {

        var createFilesPromises = [];

        pkg.files.forEach(function (file) {
          var insert = {
            diskFileName: file.diskFileName,
            mimetype: file.mimetype,
            originalFileName: file.originalFileName,
            originalSize: file.size,
            storageAdaptor: file.storageAdaptor
          };

          createFilesPromises.push(_root2.default.prototype.create.call(_this2, { body: insert }));
        });

        _promise2.default.all(createFilesPromises).then(function (values) {
          //console.error('create values', values)
          values = _this2.pkgAll(values);
          resolve(values);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'embedScript',
    value: function embedScript(type) {

      switch (type) {

        case 'imgur':
          return '<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>';

        case 'instagram':
          return '<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>';

        case 'pinterest':
          return '<script async defer src="//assets.pinterest.com/js/pinit.js"></script>';

        case 'reddit':
          return '<script async src="https://www.redditstatic.com/comment-embed.js"></script>';

        case 'twitter':
          return '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';

        case 'tumblr':
          return '<script async src="https://secure.assets.tumblr.com/post.js"></script>';

        default:
          return '';

      }
    }
  }, {
    key: 'fetchEmbed',
    value: function fetchEmbed(req) {
      var _this3 = this;

      var type = req.params.type,
          url = '';

      return new _promise2.default(function (resolve, reject) {

        switch (type) {

          case 'aol':
            url = 'http://api.embed.ly/1/oembed?url=' + req.params.url;
            break;

          case 'dailymotion':
            url = 'http://www.dailymotion.com/services/oembed?url=' + req.params.url;
            break;

          case 'deviantart':
            url = 'http://backend.deviantart.com/oembed?url=' + req.params.url;
            break;

          case 'flickr':
            url = 'http://www.flickr.com/services/oembed/?url=' + req.params.url;
            break;

          case 'funnyordie':
            url = 'http://www.funnyordie.com/oembed.json?url=' + req.params.url;
            break;

          case 'getty':
            url = ' http://embed.gettyimages.com/oembed?url=' + req.params.url;
            break;

          case 'gfycat':
            url = 'https://api.gfycat.com/v1/oembed?url=' + req.params.url;
            break;

          case 'hulu':
            url = 'http://www.hulu.com/api/oembed.xml?url=' + req.params.url;
            break;

          case 'ifttt':
            url = 'https://ifttt.com/oembed?url=' + req.params.url;
            break;

          case 'imgur':
            url = 'http://api.imgur.com/oembed?url=' + req.params.url;
            break;

          case 'instagram':
            url = 'https://api.instagram.com/oembed?url=' + req.params.url;
            break;

          case 'kickstarter':
            url = 'http://www.kickstarter.com/services/oembed?url=' + req.params.url;
            break;

          case 'meetup':
            url = 'https://api.meetup.com/oembed?format=json&url=' + req.params.url;
            break;

          case 'newyorktimes':
            url = 'https://www.nytimes.com/svc/oembed/html/?url=' + req.params.url;
            break;

          case 'pinterest':
            return resolve({
              html: '<a data-pin-do="embedPin" data-pin-width="' + (req.body.size || 'small') + '" href="' + req.params.url + '"></a>',
              pinSize: req.body.size || 'small',
              script: _this3.embedScript(req.params.type)
            });

          case 'soundcloud':
            url = 'https://soundcloud.com/oembed?url=' + req.params.url;
            break;

          case 'reddit':
            url = 'https://www.reddit.com/oembed?url=' + req.params.url;
            break;

          case 'twitter':
            url = 'https://api.twitter.com/1/statuses/oembed.json?url=' + req.params.url;
            break;

          case 'tumblr':
            url = 'http://www.tumblr.com/oembed/1.0?url=' + req.params.url;
            break;

          case 'ustream':
            url = 'http://www.ustream.tv/oembed?url=' + req.params.url;
            break;

          case 'vimeo':
            url = 'https://vimeo.com/api/oembed.json?url=' + req.params.url;
            break;

          case 'vine':
            url = 'https://vine.co/oembed.json?url=' + req.params.url;
            break;

          case 'youtube':
            url = 'https://www.youtube.com/oembed?url=' + req.params.url + '?v=' + req.params.v + '&format=json';
            break;

          default:
            return _promise2.default.reject();
        }

        _superagent2.default.get(url).end(function (err, res) {

          if (err) {
            _logger.logger.error('There was an error fetching the embed');
            console.error(err);
            return reject(err);
          }

          return resolve((0, _assign2.default)(res.body, {
            script: _this3.embedScript(type)
          }));
        });
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(req) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {

        _root2.default.prototype.getAll.call(_this4).then(function (values) {
          values = _this4.pkgAll(values);

          resolve(values);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'pkg',
    value: function pkg(value) {

      value.src = {
        url: 'http://' + process.env.HOST + '/api/v0.1/' + this.entityName + '/' + value.sid + '/view'
      };

      return value;
    }
  }, {
    key: 'pkgAll',
    value: function pkgAll(values) {
      values = values.map(this.pkg.bind(this));

      return values;
    }
  }, {
    key: 'view',
    value: function view(req, res) {

      var id = req.params.id;

      /*
      TODO:
      This is the disk adapter - need to account for each adaptor
      */
      this.getById(id).then(function (doc) {
        var filePath = '/tmp/uploads/' + doc.diskFileName;

        res.sendFile(filePath);
      }).catch(function (err) {
        _logger.logger.error('Could not find asset', err);
      });
    }
  }]);
  return DigitalAssetModel;
}(_root2.default);

exports.default = DigitalAssetModel;
//# sourceMappingURL=index.js.map