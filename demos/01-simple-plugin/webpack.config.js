module.exports = {
  entry: './src/main',

  mode: 'development',
  devtool: false,

  plugins: [
    new (require('./simple-plugin'))()
  ]
};
