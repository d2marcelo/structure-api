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

var _password = require('../../services/password');

var _password2 = _interopRequireDefault(_password);

var _driver = require('../../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserModel = function (_Model) {
  (0, _inherits3.default)(UserModel, _Model);

  function UserModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, UserModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UserModel).call(this, (0, _assign2.default)({}, {
      name: 'users',

      mapping: {
        fields: {}
      },
      permissions: {
        create: ['admin'],
        delete: ['admin'],
        read: ['organization'],
        replace: ['admin'],
        update: ['self', 'admin']
      },
      relations: {
        belongsTo: [{
          Node: 'Organization',
          foreignKey: 'id',
          localField: 'organization',
          localKey: 'organizationId'
        }]
      },
      schema: {
        email: {
          type: 'string'
        },
        username: {
          type: 'string'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(UserModel, [{
    key: 'create',
    value: function create(req) {
      var _this2 = this;

      var pkg = req.body;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var doc;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return new _password2.default().issue(pkg.password);

                case 2:
                  pkg.hash = _context.sent;

                  delete pkg.password;

                  _context.next = 6;
                  return _root2.default.prototype.create.call(_this2, { body: pkg });

                case 6:
                  doc = _context.sent;

                  if (doc.id) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt('return', reject(doc));

                case 9:

                  resolve(doc);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));
        return function (_x2, _x3) {
          return ref.apply(this, arguments);
        };
      }()).catch(function (err) {
        console.error('hello???', err);
      });
    }
  }, {
    key: 'getByEmail',
    value: function getByEmail(email) {
      return _driver2.default.db(process.env.RETHINK_DB_NAME).table(this.table).filter({ email: email }).limit(1);
    }
  }, {
    key: 'getByUsername',
    value: function getByUsername(username) {
      var _this3 = this;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
          var user;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return thinky.r.db(process.env.RETHINK_DB_NAME).table('users').filter({ username: username }).limit(1);

                case 2:
                  user = _context2.sent;

                  if (user) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt('return', reject(user));

                case 5:

                  resolve(user[0]);

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }));
        return function (_x4, _x5) {
          return ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return UserModel;
}(_root2.default);

exports.default = UserModel;
//# sourceMappingURL=index.js.map