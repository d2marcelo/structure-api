function ObjectMap(obj, fun) {

  var newObj = {}

  Object.keys(obj).forEach( (k, i) => {

    var v = obj[k]

    console.error('inside k,v', k, v)

    if(typeof v == 'object' && !v.join) {

      newObj[k] = ObjectMap(v, fun)

      // Array
      /*if(o.join) {
        o.forEach( (item) => {

        })
      }

      // Object
      else {

      }*/

    }

    else {
      newObj[k] = fun(v, k, i)
      console.error('v', vs)
    }

  })

  return newObj

}

export default ObjectMap
