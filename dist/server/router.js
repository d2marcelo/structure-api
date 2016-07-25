'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = require('../lib/logger');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _storageAdaptors = require('./storageAdaptors');

var _storageAdaptors2 = _interopRequireDefault(_storageAdaptors);

var _applications = require('../controllers/applications');

var _applications2 = _interopRequireDefault(_applications);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _buckets = require('../controllers/buckets');

var _buckets2 = _interopRequireDefault(_buckets);

var _digitalAssets = require('../controllers/digital-assets');

var _digitalAssets2 = _interopRequireDefault(_digitalAssets);

var _documents = require('../controllers/documents');

var _documents2 = _interopRequireDefault(_documents);

var _documentRevisions = require('../controllers/document-revisions');

var _documentRevisions2 = _interopRequireDefault(_documentRevisions);

var _fields = require('../controllers/fields');

var _fields2 = _interopRequireDefault(_fields);

var _organizations = require('../controllers/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _registry = require('../controllers/registry');

var _registry2 = _interopRequireDefault(_registry);

var _taxonomies = require('../controllers/taxonomies');

var _taxonomies2 = _interopRequireDefault(_taxonomies);

var _templates = require('../controllers/templates');

var _templates2 = _interopRequireDefault(_templates);

var _templateRevisions = require('../controllers/template-revisions');

var _templateRevisions2 = _interopRequireDefault(_templateRevisions);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controllers = [_applications2.default, _auth2.default, _buckets2.default, _digitalAssets2.default, _documents2.default, _documentRevisions2.default, _fields2.default, _organizations2.default, _registry2.default, _taxonomies2.default, _templates2.default, _templateRevisions2.default, _users2.default];

var upload = (0, _multer2.default)({ storage: _storageAdaptors2.default.disk.adaptor }).any();

var Router = function () {
  function Router() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Router);

    this.options = options;

    this.Controllers = this.options.Controllers || Controllers;
    this.dispatcher = this.options.dispatcher;

    this.routes = options.routes;
    this.server = options.server;
    //this.structRoute()
    this.loadRoutes();
    this.generateRoutesFromNodes();
  }

  (0, _createClass3.default)(Router, [{
    key: 'generateRoutesFromNodes',
    value: function generateRoutesFromNodes() {
      var _this = this;

      var server = this.server,
          version = 'v' + process.env.API_VERSION;

      /*
      TODO:
      Make this a simple on/off flag
      */
      server.use((0, _cors2.default)());

      /*
      TODO: build middleware to handle the extra routes needed per respective node(s)
      */
      var digitalAsset = new _digitalAssets2.default();

      server.get('/api/' + version + '/digital-assets/embeds/:type/:url(*)', this.dispatcher.dispatch(new _digitalAssets2.default(), 'fetchEmbed'));
      server.get('/api/' + version + '/digital-assets/:id/view', digitalAsset.view.bind(digitalAsset));
      server.get('/api/' + version + '/registry/settings/:name', this.dispatcher.dispatch(new _registry2.default(), 'getSettingsByName'));

      server.post('/api/' + version + '/auth/login', this.dispatcher.dispatch(new _auth2.default(), 'login'));
      server.post('/api/' + version + '/auth/user/facebook', this.dispatcher.dispatch(new _auth2.default(), 'authByFacebook'));

      server.put('/api/' + version + '/digital-assets', [upload, this.dispatcher.dispatch(new _digitalAssets2.default(), 'create')]);

      this.Controllers.forEach(function (Controller) {
        var controller = new Controller(),
            routeName = controller.name;

        server.get('/api/' + version + '/' + routeName + '/:id', _this.dispatcher.dispatch(controller, 'getById'));
        server.get('/api/' + version + '/' + routeName, _this.dispatcher.dispatch(controller, 'getAll'));

        server.post('/api/' + version + '/' + routeName + '/:id', _this.dispatcher.dispatch(controller, 'update'));

        server.put('/api/' + version + '/' + routeName, _this.dispatcher.dispatch(controller, 'create'));

        server.delete('/api/' + version + '/' + routeName + '/:id', _this.dispatcher.dispatch(controller, 'delete'));
      });
    }
  }, {
    key: 'loadRoutes',
    value: function loadRoutes() {
      this.routes.call(this, this.server);
    }
  }, {
    key: 'structRoute',
    value: function structRoute() {
      var _this2 = this;

      var server = this.server;

      var mapper = {
        buckets: {
          Node: 'bucket'
        }
      };

      server.post('/api/struct', function (req, res, next) {

        /* Example Query:
        buckets: {
          fields: ['data', 'desc', 'id', 'sid', 'title'],
          id: 12345
        }
        */
        var query = req.body.query;

        var fetch = {};

        (0, _keys2.default)(query).forEach(function () {
          var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(k, i) {
            var o, node;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    o = query[k];
                    node = require('../../nodes/' + mapper[k].Node).default;

                    /*
                    TODO: pluck the values instead of returning all the values
                    */

                    if (!o.id) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 5;
                    return node.getById(o.id);

                  case 5:
                    fetch[k] = _context.sent;
                    _context.next = 11;
                    break;

                  case 8:
                    _context.next = 10;
                    return node.getAll();

                  case 10:
                    fetch[k] = _context.sent;

                  case 11:
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

        res.status(200).json({
          pkg: fetch,
          status: 200
        });
      });
    }
  }]);
  return Router;
}();

exports.default = Router;
//# sourceMappingURL=router.js.map