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

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaxonomyModel = function (_Model) {
  (0, _inherits3.default)(TaxonomyModel, _Model);

  function TaxonomyModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, TaxonomyModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TaxonomyModel).call(this, (0, _assign2.default)({}, {
      name: 'taxonomies',

      permissions: {
        create: ['admin'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['admin']
      },
      relations: {
        belongsTo: [{
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }, {
          Node: 'Taxonomy',
          foreignKey: 'id',
          localField: 'taxonomy',
          localKey: 'taxonomyId'
        }],
        hasMany: [{
          Node: 'Taxonomy',
          foreignKey: 'id',
          localField: 'taxonomys',
          localKey: 'taxonomysId'
        }]
      },
      schema: {
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  return TaxonomyModel;
}(_root2.default);

exports.default = TaxonomyModel;
//# sourceMappingURL=index.js.map