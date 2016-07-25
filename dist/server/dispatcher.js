'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = require('../lib/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dispatcher = function () {
  function Dispatcher() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Dispatcher);

    this.options = options;
  }

  (0, _createClass3.default)(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(controller, actionName) {
      var _this = this;

      return function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
          var action, pkg, status, result;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  action = controller[actionName];


                  if (req.files) {
                    console.error('files', req.files);
                    /*
                    TODO: what's a better way to handle this?
                    */
                    req.body.files = req.files.map(function (file) {
                      file.diskFileName = file.filename;
                      file.originalFileName = file.originalname.replace(/ /g, '_');
                      file.storageAdaptor = storageAdaptors.disk.name;

                      return file;
                    });
                  }

                  pkg = {}, status = 200;
                  _context.prev = 3;
                  _context.next = 6;
                  return action.call(controller, req);

                case 6:
                  result = _context.sent;


                  if (req.method == 'PUT') status = 201;

                  // return collection name
                  if (actionName == 'getAll') {
                    pkg[controller.name] = result;
                  }
                  // return item
                  else {
                      pkg = result;
                    }

                  res.status(status).json({
                    pkg: pkg,
                    status: status
                  });
                  _context.next = 18;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context['catch'](3);

                  _logger.logger.error('Action ' + actionName + ' failed');
                  console.error(_context.t0.stack);

                  status = 403;

                  res.status(status).json({
                    status: status
                  });

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[3, 12]]);
        }));
        return function (_x2, _x3, _x4) {
          return ref.apply(this, arguments);
        };
      }();
    }
  }]);
  return Dispatcher;
}();

exports.default = Dispatcher;
//# sourceMappingURL=dispatcher.js.map