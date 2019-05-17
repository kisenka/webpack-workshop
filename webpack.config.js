module.exports = {
  entry: './src/main',

  mode: 'development',
  devtool: false,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash]'
            }
          }
        ]
      }
    ]
  }
};
