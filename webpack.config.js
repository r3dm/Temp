module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" },
      { test: /\.ttf$/, loader: "url-loader" }
    ]
  }
}
