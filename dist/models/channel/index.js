'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelModel = function (_Model) {
  (0, _inherits3.default)(ChannelModel, _Model);

  function ChannelModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ChannelModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChannelModel).call(this, (0, _assign2.default)({}, {
      name: 'channels',

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
          localField: 'channelParent',
          localKey: 'channelParentId'
        }, {
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }],
        hasMany: [{
          Node: 'Bucket',
          foreignKey: 'id',
          localField: 'buckets',
          localKey: 'bucketIds'
        }, {
          Node: 'Channel',
          foreignKey: 'id',
          localField: 'channelChildren',
          localKey: 'channelChildrenIds'
        }]
      },
      schema: {
        bucketIds: {
          type: 'array'
        },
        data: {
          type: 'object'
        },
        desc: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(ChannelModel, [{
    key: 'getAll',
    value: function getAll(req) {
      var _this2 = this;

      var query = req.query;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));
        return function (_x2, _x3) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return ChannelModel;
}(_root2.default);

exports.default = ChannelModel;
//# sourceMappingURL=index.js.map