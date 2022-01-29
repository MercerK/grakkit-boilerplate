/* global __dirname, require, module */
const http = require('http')
const webpack = require('webpack')
const path = require('path')

const getEnv = (env) => (env.dev ? 'development' : 'production')
const isDev = (env) => getEnv(env) === 'development'

const createConfig = (env) => ({
  mode: getEnv(env),
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  watch: isDev(env),
  output: {
    path: isDev(env) ? path.join(__dirname, 'server/plugins/grakkit') : path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'test',
    libraryTarget: 'commonjs',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /(\.js|\.ts)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  externals: {
    http: 'http',
    // '@grakkit/server': '@grakkit/server',
    '@grakkit/server-classes': '@grakkit/server-classes',
  },
  resolve: {
    extensions: ['.json', '.js', '.ts'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: getEnv(env),
    }),
  ],
})

module.exports = createConfig
