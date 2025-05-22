const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  output: {
    path: path.join(__dirname,'/dist'),
    filename: "index.bundle.js",
    publicPath: '/'
  },
  devServer: {
    port:3010,
    static: path.resolve(__dirname, '/dist'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test:/\.(scss|css)$/,
        use:[
            "style-loader",
            "css-loader",
            "sass-loader",
        ]
      },
      {
        test:/\.(png|jpe?g|svg|jpg)$/,
        use:[
          {
            loader: "url-loader",
            options: {
              limit:5000
            }
          }
        ]
      }
    ]
  }

}