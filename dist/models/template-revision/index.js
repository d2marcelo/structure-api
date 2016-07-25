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

var _digitalAsset = require('../digital-asset');

var _digitalAsset2 = _interopRequireDefault(_digitalAsset);

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

var _revision = require('../revision');

var _revision2 = _interopRequireDefault(_revision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateRevisionModel = function (_RevisionModel) {
  (0, _inherits3.default)(TemplateRevisionModel, _RevisionModel);

  function TemplateRevisionModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, TemplateRevisionModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TemplateRevisionModel).call(this, (0, _assign2.default)({}, {
      name: 'template-revisions',

      permissions: {
        create: ['user'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['user']
      },
      relations: {
        belongsTo: [{
          Node: 'Template',
          foreignKey: 'id',
          localField: 'template',
          localKey: 'templateId'
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

  return TemplateRevisionModel;
}(_revision2.default);

exports.default = TemplateRevisionModel;
//# sourceMappingURL=index.js.map