'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  authKey: process.env.RETHINK_DB_AUTH_KEY || '',
  buffer: process.env.NODE_ENV === 'production' ? 50 : 3,
  db: process.env.NODE_ENV === 'test' ? 'test' : process.env.RETHINK_DB_NAME,
  host: process.env.RETHINK_DB_HOST || 'localhost',
  min: process.env.NODE_ENV === 'production' ? 50 : 3,
  pool: true,
  port: process.env.RETHINK_DB_PORT || 28015,
  servers: [{ host: '127.0.0.1', port: 28015 }],
  tables: ['auth', 'applications', 'buckets', 'channels', 'digital_assets', 'documents', 'document_revisions', 'fields', 'organizations', 'refs', // References
  'registry',
  //'revisions',
  'taxonomies', 'templates', 'template_revisions', 'test', 'users']
};

if (process.env.RETHINK_SSL) {

  (0, _assign2.default)(config, {
    ssl: {
      ca: ''
    }
  });
}

exports.default = config;
//# sourceMappingURL=config.js.map