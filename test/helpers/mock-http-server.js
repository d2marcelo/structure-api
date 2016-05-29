import request from 'supertest-as-promised'
import Server  from '../../lib/server'

function MockHTTPServer(options = {}) {

  var api = new Server(options)

  return request(api.server)
}

export default MockHTTPServer
