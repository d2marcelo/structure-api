'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _logger = require('../lib/logger');

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _shortId = require('../services/short-id');

var _shortId2 = _interopRequireDefault(_shortId);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserService = function () {
  function UserService() {
    (0, _classCallCheck3.default)(this, UserService);
  }

  (0, _createClass3.default)(UserService, [{
    key: 'create',
    value: function create() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var cb = arguments[1];

      var _this = this;

      var pkg = (0, _assign2.default)({}, o);

      // validation

      var passwordService = new _password2.default(),
          shortidService = new _shortId2.default(),
          tokenService = new _token2.default(),
          userModel = new _user2.default();

      /*
      TODO: clean up this query, it could be optimized
      */
      passwordService.issue(pkg.password, function UserService_createIssueCallback(err, hash) {

        if (err) {
          _logger.logger.error(err);
          _logger.logger.debug('cb', typeof cb === 'undefined' ? 'undefined' : (0, _typeof3.default)(cb));
          return cb({
            message: 'Could not create password hash',
            resource: 'UserModel'
          });
        }

        if (pkg.password) delete pkg.password; // dont want to store actual password
        if (pkg.organizationId) delete pkg.organizationId;

        pkg.hash = hash;
        pkg.organizations = pkg.organizations || [];

        _async2.default.parallel([userModel.create.bind(userModel, pkg)], function UserService_createParallelCallback(err, res) {

          if (err) {
            _logger.logger.error(err);
            return cb({
              raw: err,
              resource: 'UserModel'
            });
          }

          var user = res[0];
          var sid = shortidService.issue(user.id);

          _async2.default.parallel([tokenService.issue.bind(tokenService, user.id), userModel.addToOrganizationTable.bind(userModel, user.id, o.organizations[0]), _this.update.bind(_this, user.id, { sid: sid })], function UserService_createParallelCallback2(err2, res2) {

            if (err2) {
              _logger.logger.error(err2);
              return cb({
                raw: err2,
                resource: 'UserModel'
              });
            }

            user = res2[2];
            user.organizations = res2[1].organizations;
            user.token = res2[0];

            cb(null, user);
          });
        });
      });
    }
  }, {
    key: 'get',
    value: function get() {
      var userModel = new _user2.default();

      userModel.get.apply(userModel, arguments);
    }
  }, {
    key: 'getByShortId',
    value: function getByShortId() {
      var userModel = new _user2.default();

      userModel.getByShortId.apply(userModel, arguments);
    }
  }, {
    key: 'getByUsername',
    value: function getByUsername() {
      var userModel = new _user2.default();

      userModel.getByUsername.apply(userModel, arguments);
    }
  }, {
    key: 'list',
    value: function list() {

      var userModel = new _user2.default();

      userModel.list.apply(userModel, arguments);
    }
  }, {
    key: 'update',
    value: function update() {
      var userModel = new _user2.default();

      userModel.update.apply(userModel, arguments);
    }
  }, {
    key: 'updateByShortId',
    value: function updateByShortId() {
      var userModel = new _user2.default();

      userModel.updateByShortId.apply(userModel, arguments);
    }
  }]);
  return UserService;
}();

exports.default = UserService;
//# sourceMappingURL=user.js.map