const path = require('path');

module.exports = {
  paths: {
    app: {
      client: path.resolve(__dirname, '../src/client'),
      api: path.resolve(__dirname, '../src/server/app'),
      server: path.resolve(__dirname, '../src/server/core')
    },
    dist: {
      server: path.resolve(__dirname, '../dist'),
      client: path.resolve(__dirname, '../dist/client')
    },
    static: path.resolve(__dirname, '../static')
  },
  grant: {
    server: {
      protocol: "http"
    },
    facebook: {
      key: "[App_ID]",
      secret: "[APP_Secret]",
      callback: "/callback_url",
      scope: [
        "permissions"
      ]
    }
  },
  nuxtBuild: false
};
