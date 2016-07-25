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

var OrganizationModel = function (_Model) {
  (0, _inherits3.default)(OrganizationModel, _Model);

  function OrganizationModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, OrganizationModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(OrganizationModel).call(this, (0, _assign2.default)({}, {
      name: 'organizations',

      permissions: {
        create: ['admin'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['admin']
      },
      relations: {
        hasMany: [{
          Node: 'App',
          foreignKey: 'id',
          localField: 'apps',
          localKey: 'appIds'
        }, {
          Node: 'Bucket',
          foreignKey: 'id',
          localField: 'buckts',
          localKey: 'bucketIds'
        }, {
          Node: 'User',
          foreignKey: 'id',
          localField: 'users',
          localKey: 'userIds'
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

  return OrganizationModel;
}(_root2.default);

exports.default = OrganizationModel;
//# sourceMappingURL=index.js.map