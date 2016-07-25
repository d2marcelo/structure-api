'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _logger = require('../lib/logger');

var _shortId = require('../services/short-id');

var _shortId2 = _interopRequireDefault(_shortId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppService = function () {
  function AppService() {
    (0, _classCallCheck3.default)(this, AppService);
  }

  (0, _createClass3.default)(AppService, [{
    key: 'create',
    value: function create() {
      var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var cb = arguments[1];

      var _this = this;

      var pkg = (0, _assign2.default)({}, o);

      // validation

      var shortidService = new _shortId2.default(),
          appModel = new _app2.default();

      appModel.create(pkg, function (err, res) {

        if (err) {
          _logger.logger.error(err);

          return cb({
            message: 'Could not create app',
            resource: 'AppService'
          });
        }

        var sid = shortidService.issue(res.id);

        _this.update(res.id, { sid: sid }, function (err2, res2) {

          if (err) {
            _logger.logger.error(err);

            return cb({
              message: 'Could not create short id for app',
              resource: 'AppService'
            });
          }

          return cb(null, res2);
        });
      });
    }
  }, {
    key: 'get',
    value: function get() {
      var appModel = new _app2.default();

      appModel.get.apply(appModel, arguments);
    }
  }, {
    key: 'getByShortId',
    value: function getByShortId() {
      var appModel = new _app2.default();

      appModel.getByShortId.apply(appModel, arguments);
    }
  }, {
    key: 'update',
    value: function update() {
      var appModel = new _app2.default();

      appModel.update.apply(appModel, arguments);
    }
  }, {
    key: 'updateByShortId',
    value: function updateByShortId() {
      var appModel = new _app2.default();

      appModel.updateByShortId.apply(appModel, arguments);
    }
  }]);
  return AppService;
}();

exports.default = AppService;
//# sourceMappingURL=app.js.map