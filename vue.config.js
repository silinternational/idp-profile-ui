module.exports = {
  devServer: {
    client: {
      webSocketURL: 'auto://profile.gtis.guru/ws',
    },
    host: '0.0.0.0',
    port: 8000,
    allowedHosts: ['.gtis.guru']
  }
};
