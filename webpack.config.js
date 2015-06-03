module.exports = {
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.ttf$|\.svg$|\.eot$|\.woff$/, loader: 'url-loader' },
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
}
