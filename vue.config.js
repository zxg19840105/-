const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, '/src/styles/variables.less')]
    }
  },
  devServer: {
    host: 'localhost',
    open: true,
    hot: true,
    port: 3000
  }
})
