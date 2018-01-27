const compiler = require('vue-component-compiler')

function prepareScript (result) {
  let prepared = result['script'].replace('export default', '').trim()
  return prepared.substr(1, prepared.length - 2).trim()
}

module.exports = function (source) {
  let compilationResult = ''
  compiler.compileToObj(source, __filename, function (err, result) {
    if (!err) {
      const partsNumber = Object.keys(result).length
      let handledPartsCounter = 0
      if (result['script']) {
        compilationResult += prepareScript(result)
        if (++handledPartsCounter < partsNumber) {
          compilationResult += ','
        }
      }
      if (result['template']) {
        compilationResult += 'template: ' + result['template']
        if (++handledPartsCounter < partsNumber) {
          compilationResult += ','
        }
      }
      if (result['style']) {
        compilationResult += '_injectCss: ' + result['style']
        if (++handledPartsCounter < partsNumber) {
          compilationResult += ','
        }
      }
    }
  })
  return `(function(){ return {${compilationResult}}; })()`
}
