'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StreamExtras = function () {
  function StreamExtras() {
    (0, _classCallCheck3.default)(this, StreamExtras);
  }

  (0, _createClass3.default)(StreamExtras, [{
    key: 'streamToString',
    value: function streamToString(stream) {

      var chunks = '',
          _this = this;

      this.use(function (pkg, next) {

        stream.pipe((0, _through2.default)({ objectMode: true, allowHalfOpen: false }, function streamChunkCallback(chunk, enc, t2cb) {

          chunks += chunk.toString();

          t2cb(null, chunks);
        })).on('data', function onDataCallback(data) {
          //console.log('do we have something?', data)
        }).on('end', function onEndCallback() {
          pkg = chunks;
          next(null, pkg);
        }).on('error', function onErrorCallback(err) {
          next(err);
        });
      });

      return this;
    }
  }]);
  return StreamExtras;
}();

StreamExtras.prototype.flowMethods = ['streamToString'];

exports.default = StreamExtras;
//# sourceMappingURL=stream-extras.js.map