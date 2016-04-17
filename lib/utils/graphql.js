

function sanitizeObject(o) {

  var len = Object.keys(o).length

  return Object.keys(o).map( (key, index) => {

    var str = `${key}: ${value(o[key])}`

    if(index != len - 1) {
      str += ', '
    }

    return str

  })

}

function value(v) {
  return (typeof v == 'object') ? `{${sanitizeObject(v)}}` : `"${v}"`
}

function convertToText(obj, deep) {

  var string = []

  if(typeof(obj) == "object" && (obj.join == undefined)) {

    if(deep) string.push("{")
    var len = Object.keys(obj).length

    Object.keys(obj).forEach((prop, index) => {
      string.push(prop, ": ", convertToText(obj[prop], true))
      if(index != len - 1) string.push(', ')
    })

    if(deep) string.push("}")

  } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
    string.push("[")
    for(var prop in obj) {
      string.push(convertToText(obj[prop]), ",")
    }
    string.push("]")

  } else if (typeof(obj) == "function") {
    string.push(obj.toString())

  } else {
    string.push(JSON.stringify(obj))
  }

  string = string.join('')

  return string
}

export const objToStr = function objToStr(o) {
  var s = convertToText(o)
  //console.log('S', s)
  return s
}

function createGQLQuery(obj) {
  let result = Object.keys(obj).map((k) => {
    let query = `${k}`;
    let element = obj[k];
    if (element) {
      if (element.aliasFor) {
        query = `${k}:${element.aliasFor}`;
      }
      if (element.fragment) {
        query = `fragment ${k} on ${element.fragment}`;
      }
      if (element.args) {
        let args = Object.keys(element.args).map((argKey) => {
          let argVar = "", processed = false;
          if (element.processArgs) {
            if (element.processArgs[argKey]) {
              argVar = element.processArgs[argKey](element.args[argKey]);
              processed = true;
            }
          }
          if (!processed) {
            if (typeof element.args[argKey] === "object") {
              argVar = JSON.stringify(element.args[argKey]).replace(/\"([^(\")"]+)\":/g, "$1:");
            } else {
              argVar = `"${element.args[argKey]}"`;
            }
          }
          return `${argKey}:${argVar}`;
        }).join();
        query = `${query}(${args})`;
      }
      if (element.fields) {
        let fields = createGQLQuery(element.fields);
        query = `${query}${fields}`;
      }
    }
    return `${query}`;
  }).join();
  return `{${result}}`;
}
