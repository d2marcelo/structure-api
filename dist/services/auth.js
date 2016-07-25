'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _logger = require('../lib/logger');

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthService = function () {
  function AuthService() {
    (0, _classCallCheck3.default)(this, AuthService);
  }

  (0, _createClass3.default)(AuthService, [{
    key: 'authenticateById',
    value: function authenticateById(id, password, cb) {

      var passwordService = new _password2.default(),
          userModel = new _user2.default();

      userModel.get(id, function AuthService_authenticateGetCallback(err, user) {

        if (err) {
          return cb({
            message: 'Could not get user: ' + id,
            resource: 'AuthService'
          });
        }

        passwordService.verify(password, user.hash, function (err, verified) {

          if (err) {
            return cb({
              message: 'Could not verify password for user: ' + id,
              resource: 'AuthService'
            });
          }

          cb(null, user);
        });
      });
    }
  }, {
    key: 'authenticateByUsername',
    value: function authenticateByUsername(username, password, cb) {

      var passwordService = new _password2.default(),
          userModel = new _user2.default();

      userModel.getByUsername(username, function AuthService_authenticateGetCallback(err, user) {

        if (err) {
          _logger.logger.error('Could not get user', username);
          return cb({
            message: 'Could not get user: ' + username,
            resource: 'AuthService'
          });
        }

        passwordService.verify(password, user.hash, function (err, verified) {

          if (err) {
            _logger.logger.error('Could not validate password for user', username);
            return cb({
              message: 'Could not verify password for user: ' + username,
              resource: 'AuthService'
            });
          }
          _logger.logger.debug('auth by user/pass its ok', user);
          cb(null, user);
        });
      });
    }
  }, {
    key: 'authorize',
    value: function authorize(id, token, cb) {

      var tokenService = new _token2.default();

      tokenService.verify(token, function (err, verified) {

        if (err) {
          return cb({
            message: 'Could not authorize user: ' + id,
            resource: 'AuthService'
          });
        }

        cb(null, token);
      });
    }
  }, {
    key: 'loginById',
    value: function loginById(id) {
      var pkg = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var cb = arguments[2];

      var _this = this;

      if (arguments.length == 2) {
        pkg = arguments[0];
        id = pkg.id;
        cb = arguments[1];
      }

      var tokenService = new _token2.default();

      _async2.default.parallel([this.authenticateById.bind(this, id, pkg.password), tokenService.issue.bind(tokenService, pkg.hash)], function AuthService_loginByIdCallBack(err, res) {
        _logger.logger.debug('hit parallel call');
        if (err) {
          _logger.logger.error('Could not log in user', id);
          _logger.logger.error(err);

          return cb({
            message: 'Could not log in user',
            resource: 'AuthService'
          });
        }

        var user = res[0];
        user.token = res[1];

        cb(null, user);
      });
    }
  }, {
    key: 'loginByUsername',
    value: function loginByUsername(username) {
      var pkg = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var cb = arguments[2];

      var _this = this;

      if (arguments.length == 2) {
        pkg = arguments[0];
        username = pkg.username;
        cb = arguments[1];
      }

      var tokenService = new _token2.default();

      _async2.default.parallel([this.authenticateByUsername.bind(this, username, pkg.password)], function AuthService_loginByUsernameCallBack(err, res) {

        if (err) {
          _logger.logger.error('Could not log in user', username);
          _logger.logger.error(err);

          return cb({
            message: 'Could not log in user',
            resource: 'AuthService'
          });
        }

        var user = res[0];
        //user.token = res[1]

        cb(null, user);
      });
    }
  }, {
    key: 'logout',
    value: function logout() {}
  }, {
    key: 'unauthenticate',
    value: function unauthenticate() {}
  }]);
  return AuthService;
}();

exports.default = AuthService;
//# sourceMappingURL=auth.js.map