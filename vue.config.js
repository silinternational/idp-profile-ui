module.exports = {
  devServer: {
    client: {
      webSocketURL: 'auto://profile.gtis.guru/ws',
    },
    host: '0.0.0.0',
    port: 8000,
    allowedHosts: [import.meta.env.VUE_ALLOWED_HOSTS],
  },
}
