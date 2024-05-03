process.env.VUE_APP_VERSION = process.env.npm_package_version

module.exports = {
  devServer: {
    client: {
      webSocketURL: 'auto://profile.gtis.guru/ws',
    },
    host: '0.0.0.0',
    port: 8000,
    allowedHosts: [process.env.VUE_ALLOWED_HOSTS],
  },
}
