const compile = require('./helpers/compile')

test('should compile js single-file', () =>
  compile('js', 'plugin1')
    .then((result) => {
      expect(result).not.toBeNull
    })
)

test('should compile js-html single-file', () =>
  compile('js-html', 'plugin1')
    .then((result) => {
      expect(result).not.toBeNull
    })
)

test('should compile js-html-css single-file', () =>
  compile('js-html-css', 'plugin1')
    .then((result) => {
      expect(result).not.toBeNull
    })
)

// FIXME
// test('should compile two single-files', () =>
//   compile(['js-html-css', 'js-html'], 'plugin1')
//     .then((result) => {
//       expect(result).not.toBeNull
//     })
// )
