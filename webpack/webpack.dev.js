const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   open: true,
  //   host: '192.168.101.48',
  //   port: 8080,
  //   disableHostCheck: true,
  // }
}

module.exports = merge(common, dev)
