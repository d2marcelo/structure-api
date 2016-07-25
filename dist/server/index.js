'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _logger = require('../lib/logger');

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _driver = require('../lib/database/driver');

var _driver2 = _interopRequireDefault(_driver);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removePoweredBy(req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
}

var StructureServer = function () {
  function StructureServer() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, StructureServer);


    this.server = (0, _express2.default)();

    this.server.use((0, _serveStatic2.default)(_path2.default.join(__dirname, '../public')));
    this.server.use(_bodyParser2.default.urlencoded({ extended: true }));
    this.server.use(_bodyParser2.default.json({ strict: false }));
    this.server.use(removePoweredBy);
    if (process.env.NODE_ENV != 'test') {
      this.server.use(this.logRequestInfo);
    }

    //this.loadRoutes()
  }

  (0, _createClass3.default)(StructureServer, [{
    key: 'getRoutes',
    value: function getRoutes() {
      var route,
          routes = [];

      this.server._router.stack.forEach(function (middleware) {
        if (middleware.route) {
          routes.push(middleware.route);
        } else if (middleware.name === 'router') {
          // router middleware
          middleware.handle.stack.forEach(function (handler) {
            route = handler.route;
            route && routes.push(route);
          });
        }
      });

      return routes;
    }
  }, {
    key: 'loadRoutes',
    value: function loadRoutes() {
      require('./routes')(this.server);
    }
  }, {
    key: 'logRequestInfo',
    value: function logRequestInfo(req, res, next) {

      _logger.logger.info(req.method, req.originalUrl);
      next();
    }
  }, {
    key: 'start',
    value: function start() {
      this.router = this.router || new _router2.default({
        dispatcher: new _dispatcher2.default(),
        server: this.server
      });

      this.server = this.server.listen(process.env.EXPRESS_PORT);
    }
  }, {
    key: 'stop',
    value: function stop() {

      _driver2.default.getPoolMaster().drain();
      this.server.close();
    }
  }, {
    key: 'use',
    value: function use() {

      this.server.use.apply(this.server, arguments);
    }
  }]);
  return StructureServer;
}();

module.exports = StructureServer;
//# sourceMappingURL=index.js.map