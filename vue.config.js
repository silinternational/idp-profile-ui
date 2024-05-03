const webpack = require('webpack')
const version = require('./package.json').version

module.exports = {
  devServer: {
    client: {
      webSocketURL: 'auto://profile.gtis.guru/ws',
    },
    host: '0.0.0.0',
    port: 8000,
    allowedHosts: [process.env.VUE_ALLOWED_HOSTS],
  },

  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            VUE_APP_VERSION: `"` + version + `"`,
          },
        }),
      ],
    }
  },
}
