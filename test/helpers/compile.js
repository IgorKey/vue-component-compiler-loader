const path = require('path')
const webpack = require('webpack')

const loaderPath = require.resolve('../../src')
const valLoader = path.resolve(loaderPath, '../index.js')
const fixturePath = path.resolve(__dirname, '..', 'fixtures')
const outputPath = path.resolve(__dirname, '..', 'output')

// TODO move to separate npm module

const BlankTemplatePlugin = require('blank-template-plugin')

function buildWebpackConfig (entries, loaderOptions, pluginId) {
  return {
    entry: entries,
    output: {
      path: outputPath,
      filename: pluginId + '.[name].js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: valLoader,
            options: loaderOptions
          }
        }
      ]
    },
    plugins: [
      new BlankTemplatePlugin({})
    ]
  }
}

function resolveFixtures (fixture) {
  const entries = {}
  if (Array.isArray(fixture)) {
    for (let i = 0; i < fixture.length; ++i) {
      entries[fixture[i]] = path.resolve(fixturePath, `${fixture[i]}.vue`)
    }
  } else {
    entries[fixture] = path.resolve(fixturePath, `${fixture}.vue`)
  }
  return entries
}

function compile (fixture, pluginId, loaderOptions) {
  return new Promise((resolve, reject) => {
    webpack(buildWebpackConfig(resolveFixtures(fixture), loaderOptions, pluginId), (err, stats) => {
      const problem = err || stats.compilation.errors[0] || stats.compilation.warnings[0]

      if (problem) {
        const message = typeof problem === 'string' ? problem : 'Unexpected error'
        const error = new Error(problem.message || message)

        error.originalError = problem
        error.stats = stats

        reject(error)

        return
      }

      resolve({
        stats
      })
    })
  })
}

module.exports = compile
