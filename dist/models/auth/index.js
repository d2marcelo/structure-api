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

var _token = require('../../services/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthModel = function (_Model) {
  (0, _inherits3.default)(AuthModel, _Model);

  function AuthModel() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, AuthModel);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AuthModel).call(this, (0, _assign2.default)({}, {
      name: 'auth',

      permissions: {
        create: ['user', 'admin'],
        delete: ['admin'],
        read: ['organization', 'admin'],
        replace: ['admin'],
        update: ['admin']
      },
      relations: {
        belongsTo: [{
          Node: 'User',
          foreignKey: 'id',
          localField: 'user',
          localKey: 'userId'
        }]
      },
      schema: {
        authenticatedAt: {
          type: 'date'
        }
      }
    }, options)));
  }

  (0, _createClass3.default)(AuthModel, [{
    key: 'getByEmail',
    value: function getByEmail(email) {
      return _driver2.default.db(process.env.RETHINK_DB_NAME).table('users').filter({ email: email }).limit(1);
    }
  }, {
    key: 'getByUsername',
    value: function getByUsername(username) {
      var _this2 = this;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
          var user;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _driver2.default.db(process.env.RETHINK_DB_NAME).table('users').filter({ username: username }).limit(1);

                case 2:
                  user = _context.sent;

                  if (user) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt('return', reject(user));

                case 5:

                  resolve(user[0]);

                case 6:
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
    key: 'login',
    value: function login(req) {
      var _this3 = this;

      var pkg = req.body;

      return new _promise2.default(function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
          var user, validated;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this3.getByUsername(pkg.username);

                case 2:
                  user = _context2.sent;

                  if (user) {
                    _context2.next = 6;
                    break;
                  }

                  _root2.default.prototype.create.call(_this3, {
                    body: {
                      authenticated: false,
                      err: 'NO_USER',
                      username: pkg.username
                    }
                  });

                  return _context2.abrupt('return', reject({
                    err: {
                      message: 'Could not get user: ' + pkg.username,
                      resource: 'AuthNode'
                    }
                  }));

                case 6:
                  _context2.next = 8;
                  return new _password2.default().verify(pkg.password, user.hash);

                case 8:
                  validated = _context2.sent;

                  if (validated) {
                    _context2.next = 13;
                    break;
                  }

                  _root2.default.prototype.create.call(_this3, {
                    body: {
                      authenticated: false,
                      err: 'BAD_PASSWORD',
                      //password: pkg.password,
                      userId: user.id,
                      username: pkg.username
                    }
                  });
                  _logger.logger.error('Auth: Bad Password');
                  return _context2.abrupt('return', reject({
                    err: {
                      message: 'Could not validate password',
                      resource: 'AuthNode'
                    }
                  }));

                case 13:

                  _root2.default.prototype.create.call(_this3, {
                    body: {
                      authenticated: true,
                      userId: user.id,
                      username: user.username
                    }
                  });

                  return _context2.abrupt('return', resolve(user));

                case 15:
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
  }, {
    key: 'authByFacebook',
    value: function authByFacebook(req) {
      console.error('handle args', req.body);
      return new _promise2.default(function (resolve, reject) {

        _driver2.default.db(process.env.RETHINK_DB_NAME).table('users').filter({
          strategies: {
            facebook: {
              id: req.body.profile.id
            }
          }
        }).limit(1).run().then(function (res) {
          console.log('handle res', res);
          resolve();
        }).catch(function (err) {
          console.error('handle err', err);
          reject();
        });
      });
    }
  }]);
  return AuthModel;
}(_root2.default);

exports.default = AuthModel;
//# sourceMappingURL=index.js.map