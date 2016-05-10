import Nodes   from './nodes'
import request from 'supertest-as-promised'
import Server  from '../../lib/server'

function MockHTTPServer(options = {}) {
  /*
  This is simply so that the Nodes don't have to be loaded for tests
  However, we leave the option over for tests that need to modify this list
  */
  options.Nodes = options.Nodes || Nodes
  var api = new Server(options)

  return request(api.server)
}

export default MockHTTPServer
