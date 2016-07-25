'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scrape = function () {
  function Scrape() {
    (0, _classCallCheck3.default)(this, Scrape);
  }

  (0, _createClass3.default)(Scrape, [{
    key: 'scrape',
    value: function scrape(operations) {
      var _this = this;

      this.use(function (pkg, next) {

        try {
          var $ = _cheerio2.default.load(pkg);
          pkg = operations.call(_this, $);

          next(null, pkg);
        } catch (e) {
          next(e);
        }
      });

      return this;
    }
  }]);
  return Scrape;
}();

Scrape.prototype.flowMethods = ['scrape'];

exports.default = Scrape;
//# sourceMappingURL=scrape.js.map