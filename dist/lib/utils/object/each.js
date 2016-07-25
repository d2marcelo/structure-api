'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ObjectEach(obj, fun) {

  (0, _keys2.default)(obj).forEach(function (k, i) {
    var o = obj[k];

    if (o.hasOwnProperty(k)) {
      if ((typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) == 'object' && !o.join) {

        ObjectEach(o, fun);

        // Array
        /*if(o.join) {
          o.forEach( (item) => {
           })
        }
         // Object
        else {
         }*/
      } else {
        fun(o, k, i);
      }
    }
  });
}

exports.default = ObjectEach;
//# sourceMappingURL=each.js.map