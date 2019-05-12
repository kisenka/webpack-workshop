module.exports = {
  entry: './src/main',

  mode: 'development',
  devtool: false,

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new (require('html-webpack-plugin'))()
  ]
};
