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

var _registry = require('../../lib/registry');

var _registry2 = _interopRequireDefault(_registry);

var _root = require('../root');

var _root2 = _interopRequireDefault(_root);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegistryModel = function (_Model) {
  (0, _inherits3.default)(RegistryModel, _Model);

  function RegistryModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, RegistryModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RegistryModel).call(this, (0, _assign2.default)({}, {
      name: 'registry',

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
        }],
        hasMany: [{
          Node: 'Plugin',
          foreignKey: 'id',
          localField: 'plugins',
          localKey: 'pluginIds'
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

  (0, _createClass3.default)(RegistryModel, [{
    key: 'create',
    value: function create(req) {
      return new _promise2.default(function (resolve, reject) {});
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var _this2 = this;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var items, pkg;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _root2.default.prototype.getAll.call(_this2);

                case 2:
                  items = _context.sent;

                  items = items.concat(_registry2.default.items);

                  pkg = {
                    adaptors: [],
                    fields: [],
                    plugins: []
                  };


                  items.forEach(function (item) {
                    switch (item.type) {
                      case 'adaptor':
                        pkg.adaptors.push(item);
                        break;
                      case 'field':
                        pkg.fields.push(item);
                        break;
                      case 'plugin':
                        pkg.plugins.push(item);
                        break;
                    }
                  });

                  resolve(pkg);

                case 7:
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
  }, {
    key: 'getSettingsByName',
    value: function getSettingsByName(req) {

      return new _promise2.default(function (resolve, reject) {

        try {
          var pluginSettings = require(req.params.name).default.settings;
          resolve(pluginSettings);
        } catch (e) {
          reject(e);
        }
      });
    }
  }]);
  return RegistryModel;
}(_root2.default);

exports.default = RegistryModel;
//# sourceMappingURL=index.js.map