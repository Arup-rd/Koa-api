module.exports = {
  server: {
    port: 8000,
    compress: false
  },
  db: {
		host: 'localhost',
		dbName: 'kibita',
		debug: false,
		options: {
			userName: false,
			passWord: false,
			port: 27017
		}
	},
	secret: [
    'yoursecretkey'
  ],
  "grant": {
    "server": {
      "host": "codends.net"
    }
  }
};
