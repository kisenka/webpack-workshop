module.exports = {
  entry: './src/main',

  mode: 'development',
  devtool: false,

  plugins: [
    new (require('html-webpack-plugin'))(),
    new (require('./parser-plugin'))()
  ]
};
