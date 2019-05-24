const ExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/main'
  },

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
  },

  plugins: [
    new (require('./plugin/OptimizeCssModulesPlugin'))()
  ]
};
