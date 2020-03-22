const webpack = require('webpack')
module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [

    require('tailwindcss'),
    require('autoprefixer'),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    }
}