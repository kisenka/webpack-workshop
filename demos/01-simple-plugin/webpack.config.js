module.exports = {
  entry: './src/main',

  plugins: [
    new (require('./simple-plugin'))()
  ]
};
