const path = require('path')
const MiniHtmlWebpackPlugin = require('react-styleguidist/node_modules/mini-html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'none',
  entry: path.join(__dirname, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'TDS Cartesian Components',
        head: {
          meta: [
            {
              name: 'description',
              content: 'mini-html-webpack-template',
            },
          ],
        },
        body: {
          raw: '<div id="app"></div>',
        },
        attrs: {
          js: {
            async: '',
            type: 'text/javascript',
          },
        },
      },
      template: require('@vxna/mini-html-webpack-template'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'webpack-import-glob-loader',
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(@compositor\/webfont|@mdx-js\/mdx|@mdx-js\/mdxast|gray-matter)\/).*/,
        loader: 'babel-loader',
        options: {
          sourceType: 'unambiguous',
        },
      },
      {
        test: /flexboxgrid/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: 'TDS_[name]__[local]___[hash:base64:5]',
              importLoaders: 2, // Number of loaders applied before CSS loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /flexboxgrid/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}