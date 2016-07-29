import request from 'supertest-as-promised'
import Server  from '../../src/server'

function MockHTTPServer(options = {}) {

  var api = new Server(options)

  // Supertest wants the express server object
  return request(api.server)
}

export default MockHTTPServer
