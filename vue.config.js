var ZipPlugin = require('zip-webpack-plugin');


module.exports = {
  css: {
      extract: {
          filename: 'css/[name].css',
          chunkFilename: 'css/[name].css'

      }
  },

  configureWebpack: {
      output: {
          filename: 'js/[name].js',
      },
      optimization: {
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              },
              vendors: {
                filename: 'js/chunk-vendors.js'
              },
              common: {
                filename: 'js/chunk-common.js'
              }
            }
          }
        },
        plugins: [
          new ZipPlugin({

              path: 'zip',

              filename: 'mu-bpm-frontend.zip',
      
              include: [/\.js$/, /\.css$/, /\.map$/, /\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
      
              exclude: [/\.png$/, /\.html$/],
      
              fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
                forceZip64Format: false
              },
      
              zipOptions: {
                forceZip64Format: false
              }
            }),
      ]

  },

  transpileDependencies: [
    'vuetify'
  ]
}