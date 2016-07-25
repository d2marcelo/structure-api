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

var FieldModel = function (_Model) {
  (0, _inherits3.default)(FieldModel, _Model);

  function FieldModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, FieldModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FieldModel).call(this, (0, _assign2.default)({}, {
      name: 'fields',

      permissions: {
        create: ['user', 'admin'],
        delete: ['admin'],
        read: ['user', 'organization', 'admin'],
        replace: ['admin'],
        update: ['user', 'organization', 'admin']
      },
      relations: {
        belongsTo: [{
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }]
      },
      schema: {}
    }, options)));
  }

  return FieldModel;
}(_root2.default);

exports.default = FieldModel;
//# sourceMappingURL=index.js.map