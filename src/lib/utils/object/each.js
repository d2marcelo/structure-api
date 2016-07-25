function ObjectEach(obj, fun) {

  Object.keys(obj).forEach( (k, i) => {
    var o = obj[k]

    if(o.hasOwnProperty(k)) {
      if(typeof o == 'object' && !o.join) {

        ObjectEach(o, fun)

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
        fun(o, k, i)
      }
    }

  })

}

export default ObjectEach
