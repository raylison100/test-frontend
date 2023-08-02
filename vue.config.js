const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: process.env.VUE_APP_PROXY_API_URL
  },
});