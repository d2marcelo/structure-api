import Nodes             from './nodes'
import thinky            from '../../lib/database/driver'
var r = thinky.r

var tests = {
  links: {
    Node: function() {
      return {
        entityName: 'links'
      }
    }
  },
}

Nodes.forEach( (Node) => {
  var node = new Node()

  tests[node.linkName] = {
    Node
  }
})

//console.log('Tables', Object.keys(tests))

var count = 0,
    len   = Object.keys(tests).length

Object.keys(tests).forEach( async (key) => {

  try {
    var node = new tests[key].Node()
    var res  = await r.db('test').tableDrop(node.entityName).run()
    console.error('Dropped table', node.entityName)
  }
  catch(e) {
    console.error(`Error dropping table ${key}`)
  }

  try {
    var res2 = await r.db('test').tableCreate(node.entityName).run()
    console.error('Created table', node.entityName)
  }
  catch(e) {
    console.error(`Error creating table ${key}`)
  }

  count++

  if(count == len) {
    setTimeout(function() {
      process.exit(0)
    }, 250)
  }

})
