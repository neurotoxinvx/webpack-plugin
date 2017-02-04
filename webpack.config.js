var path = require('path');
var webpack = require('webpack');
var insert = require('./insert/index.js');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash:7].js'
  },
  plugins: [
    new insert({
    	insert: 'head',
      title: 'WebPack Plugin'
    })
  ]
}