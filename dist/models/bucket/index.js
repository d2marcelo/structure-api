'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _logger = require('../../lib/logger');

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BucketModel = function (_Model) {
  (0, _inherits3.default)(BucketModel, _Model);

  function BucketModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, BucketModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BucketModel).call(this, (0, _assign2.default)({}, {
      name: 'buckets',

      permissions: {
        create: ['admin'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['admin']
      },
      relations: {
        belongsTo: [{
          Node: 'Channel',
          foreignKey: 'id',
          localField: 'channel',
          localKey: 'channelId'
        }, {
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }]
      },
      schema: {
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        /*
        Example of a query with some documents
         query: [
          {
            id: 5
          },
          // Get one article by author with id 543; this would get their latest article
          {
            filter: {
              authorId: 543
            },
            limit: 1
          },
          // Get up to 5 articles that are in the category "trending"
          {
            filter: {
              category: 'trending'
            },
            limit: 5
          },
          // Get up to 10 documents that have "Kardashian" as the title
          {
            match: /$kardashian$/,
            key: 'title',
            limit: 10
          }
        ]
        */
        query: {
          type: 'array'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  return BucketModel;
}(_root2.default);

exports.default = BucketModel;
//# sourceMappingURL=index.js.map