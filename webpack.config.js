module.exports = {
  entry: './client/index.jsx',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loaders: "babel-loader",
        test: /\.jsx?$/
      }
    ]
  }
}